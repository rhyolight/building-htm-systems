/*
 * Most of this code was taken from Mirko Klukas's repository at
 * https://github.com/mirkoklukas/grid-cell-visualization.
 *
 * I ported it from Canvas to SVG using D3JS. I added some more
 * visual stuff, but removed the beeping (sorry Mirko).
 */

let utils = require('../../widgets/utils')
let html = require('./firingFields.tmpl.html')
let JSDS = require('JSDS')
let FiringPatch = require('./firingPatch')

let w = 558
let h = 400

let maxQueue = 200
let dotSize = 1
let fuzzSize = 60
let walks = true

let frameRef

let walkDistance = 10000
let walkSpeed = 15.0

let $svg

let newColors = ['red', 'blue', 'green']

let jsds = JSDS.create('grid-cell-firing-fields')

/************** UTILS **********************/
let mod = function (a, b) {
    return ((a % b) + b) % b;
}

let create_firing_field = function(B, v, num_fields, r) {
    let [w,h] = num_fields
    let firing_field = []

    w = parseInt(w/2)
    h = parseInt(h/2)
    for (let x=-w; x<w; x++) {
        for (let y=-h; y<h; y++) {
            cx = x*B[0][0] + y*B[0][1] + v[0]
            cy = x*B[1][0] + y*B[1][1] + v[1]
            patch = new FiringPatch({
                "id"    : [ x, y],
                "center": [cx,cy],
                "radius": r})
            firing_field.push(patch)
        }
    }
    return firing_field
};

// Standard Normal variate using Box-Muller transform.
let randn_bm = function() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

let random_torus_walk = function(d, w, h, speed) {
    let X = []
    let V = []

    let x = [0.5*w, 0.5*h]

    X.push(x.slice())
    let v = [0.0,0.0]
    let theta = 0.0

    for (let t=0; t<d; t++) {
        theta += randn_bm()/4
        v[0] = speed*Math.cos(theta)
        v[1] = speed*Math.sin(theta)
        x[0] += v[0]
        x[1] += v[1]
        x[0] = mod(x[0],w)
        x[1] = mod(x[1],h)
        X.push(x.slice())
        V.push(v.slice())
    }


    return [X,V]
}

/***** graphic treatments *******/

function treatStops(points, key) {
    points
        .attr('offset', d => d[0] + '%')
        .attr('stop-color', newColors[key])
        .attr('stop-opacity', d => d[1] / 2)
}

function treatGradients(points, key, numPoints) {
    points.attr('id', (d, i) => {
            return 'gradient-' + key + '-' + i
        })
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', (d, i) => {
            return i / numPoints
        })

    // Update stops
    let $stops = points.selectAll('stop')
        .data([[0, 1], [50, 0]])
    treatStops($stops, key)

    // Enter stops
    let $newStops = $stops.enter().append('stop')
    treatStops($newStops, key)

    // Exit stops
    $stops.exit().remove()
}

function treatCircles(points, key, radius, useGradient=false) {
    points.attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', radius)
    if (useGradient) {
        points.attr('fill', (d, i) => {
            return 'url("#gradient-' + key + '-' + i + '")'
        })
    } else {
        points.attr('fill', newColors[key])
    }
}


function redraw($el, data, currentLocation) {

    let keys = Object.keys(data)

    for (let key of keys) {
        let $dotGroup = $el.select('g#group-' + key + ' g.dots')
        let $fuzzGroup = $el.select('g#group-' + key + ' g.fuzz')

        // First let's deal with the gradients
        let numPoints = data[key].length

        // Update
        let $gradients = $fuzzGroup.select('defs').selectAll('radialGradient')
            .data(data[key])
        treatGradients($gradients, key, numPoints)

        // Enter
        let $newGradients = $gradients.enter().append('radialGradient')
        treatGradients($newGradients, key, numPoints)

        // Exit
        $gradients.exit().remove()

        // Now deal with circles, using radial gradients for fuzzy circles

        // Update
        let $dots = $dotGroup.selectAll('circle')
            .data(data[key])
        treatCircles($dots, key, dotSize)
        let $fuzz = $fuzzGroup.selectAll('circle')
            .data(data[key])
        treatCircles($fuzz, key, fuzzSize, true)

        // Enter
        let $newDots = $dots.enter().append('circle')
        treatCircles($newDots, key, 1)
        let $newFuzz = $fuzz.enter().append('circle')
        treatCircles($newFuzz, key, 10)
        // Exit
        $dots.exit().remove()
        $fuzz.exit().remove()
    }

    $el.select('#current-location')
        .attr('cx', currentLocation.x)
        .attr('cy', currentLocation.y)
        .attr('r', 6)
        .attr('stroke', 'black')
        .attr('stroke-width', '3px')
        .attr('fill', 'none')

}

function prepSvg($svg, keys) {
    $svg.attr('width', w)
        .attr('height', h)

    let $gcGroups = $svg.selectAll('g.grid-cell')
        .data(keys)
        .enter()
        .append('g')
        .attr('id', key => 'group-' + key)
        .attr('class', 'grid-cell')

    $gcGroups.append('g').attr('class', 'dots')
    $gcGroups.append('g').attr('class', 'fuzz').append('defs')
    // Add the current location circle over top of everything else
    $svg.append('circle').attr('id', 'current-location')
}

function goSvg(elId) {
    $svg = d3.select('#' + elId + ' svg')

    prepSvg($svg, ["0", "1", "2"])

    jsds.after('set', 'spikes', () => {
        redraw($svg, jsds.get('spikes'), jsds.get('currentLocation'))
    })
}

function setVisible(gcId, visible) {
    let visibility = 'hidden'
    if (visible) visibility = 'visible'
    d3.select('#group-' + gcId).attr('visibility', visibility)
}

module.exports = (elId) => {

    utils.loadHtml(html.default, elId, () => {

        let t=0;
        let grid_cells = []

        let [X,V] = random_torus_walk(walkDistance, w, h, walkSpeed)

        let mx = X[t][0];
        let my = X[t][1];


        let theta = 1.43
        let c = 180
        grid_cells.push(create_firing_field(
            [
                [c*Math.cos(theta), c*Math.cos(theta + Math.PI/3.0)],
                [c*Math.sin(theta), c*Math.sin(theta + Math.PI/3.0)]
            ],
            [0, 0],
            [20, 20],
            400
        ))

        theta = 1.1
        c = 190
        grid_cells.push(create_firing_field(
            [
                [c*Math.cos(theta), c*Math.cos(theta + Math.PI/3.0)],
                [c*Math.sin(theta), c*Math.sin(theta + Math.PI/3.0)]
            ],
            [10, 0],
            [20, 20],
            400
        ))

        theta = 2.0
        c = 200
        grid_cells.push(create_firing_field(
            [
                [c*Math.cos(theta), c*Math.cos(theta + Math.PI/3.0)],
                [c*Math.sin(theta), c*Math.sin(theta + Math.PI/3.0)]
            ],
            [10, 0],
            [20, 20],
            400
        ))

        jsds.set('gridCells', grid_cells)

        function updateLocation(x, y) {
            let loc = {x: x, y: y}
            jsds.set('currentLocation', loc)

            for (var gcId =0; gcId < grid_cells.length; gcId++) {
                let gc_id = gcId.toString()
                let gcStore = jsds.get('spikes.' + gc_id) || []
                for (let f of grid_cells[gcId]) {
                    if(f.spike([x,y])) {
                        gcStore.push(loc)
                        if (gcStore.length > maxQueue) gcStore.shift()
                    }
                }
                if (gcStore.length) {
                    let key = 'spikes.' + gc_id.toString()
                    jsds.set(key, gcStore)
                }
            }

            t+= 1
        }

        function start() {
            frameRef = window.requestAnimationFrame(step)
        }

        function stop() {
            window.cancelAnimationFrame(frameRef)
        }

        function step() {
            mx = X[t%walkDistance][0];
            my = X[t%walkDistance][1];
            updateLocation(mx, my)
            if (walks) {
                start()
            }
        }

        goSvg(elId)

        $('.cell-selection input').change((evt) => {
            let elid = evt.target.id
            let gcid = elid.split('-').pop()
            let isOn = document.getElementById(elid).checked
            setVisible(gcid, isOn)
        })

        $('input#walks').change((evt) => {
            walks = document.getElementById(evt.target.id).checked
            if (walks) {
                start()
            } else {
                stop()
            }
        })

        $svg.on('mouseenter', () => {
            if (walks) stop()
        })
        $svg.on('mousemove', () => {
            let mouse = d3.mouse($svg.node())
            updateLocation(mouse[0], mouse[1])
            //start()
        })
        $svg.on('mouseleave', () => {
            if (walks) start()
        })

        start()
    })

}