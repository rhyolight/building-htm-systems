let utils = require('../../widgets/utils')
let html = require('./pathIntegration.tmpl.html')
let JSDS = require('JSDS')

let jsds = JSDS.create('pathIntegration')

let environments = 2
let featureCount = 4
let width = 420
let height = 300
let gridSpacing = 20
let featureMap = {}

let gridColor = '#888'
let gridStroke = .5


let $svgs

function getRandomFeatures(envIndex) {
    let types = ['A', 'B', 'C', 'D'],
        out = []
    d3.range(0, featureCount).forEach(i => {
        let randomType = types[utils.getRandomInt(types.length)]
        let randomX = Math.round(utils.getRandomArbitrary(0, width) / gridSpacing) * gridSpacing
        let randomY = Math.round(utils.getRandomArbitrary(0, height) / gridSpacing) * gridSpacing
        out.push({
            type: randomType, x: randomX, y: randomY, env: envIndex,
        })
    })
    return out
}

function createGrid($svg) {
    let $grid = $svg.append('g')
        .attr('class', 'grid')
    let vertData = []
    let horzData = []
    d3.range(0, width).forEach(x => {
        if (x % gridSpacing === 0) {
            if (x <= width) vertData.push(x)
            if (x <= height) horzData.push(x)
        }
    })
    $grid.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('stroke', gridColor)
        .attr('stroke-width', gridStroke)
        .attr('fill', 'none')
    $grid.selectAll('line.vertical').data(vertData)
        .enter().append('line')
        .attr('class', 'vertical')
        .attr('stroke', gridColor)
        .attr('stroke-width', gridStroke)
        .attr('x1', d => d).attr('y1', 0)
        .attr('x2', d => d).attr('y2', height)
    $grid.selectAll('line.horizontal').data(horzData)
        .enter().append('line')
        .attr('class', 'horizontal')
        .attr('stroke', gridColor)
        .attr('stroke-width', gridStroke)
        .attr('x1', 0).attr('y1', d => d)
        .attr('x2', width).attr('y2', d => d)
    return $grid
}

function createFeatures($svgs, features) {
    features.forEach((f, envIndex) => {
        let $svg = d3.select($svgs.nodes()[envIndex])
        let envFeatures = features[envIndex]
        $svg.selectAll('circle').data(envFeatures)
            .enter().append('circle')
            .attr('cx', d => d.x).attr('cy', d => d.y)
            .attr('r', 3)
            .attr('fill', 'black')
        $svg.selectAll('text').data(envFeatures)
            .enter().append('text')
            .attr('x', d => d.x).attr('y', d => d.y)
            .attr('class', d => d.type)
            .attr('font-weight', 'bold')
            .attr('font-family', 'Menlo')
            .attr('font-size', '16pt')
            .attr('stroke', 'none')
            .text(d => d.type)
        // Also create movements between all the features
        let movements = {}
        envFeatures.forEach((fromFeature, fromIndex) => {
            envFeatures.forEach((toFeature, toIndex) => {
                if (fromIndex === toIndex) return
                if (! movements[fromFeature.type]) {
                    movements[fromFeature.type] = []
                }
                movements[fromFeature.type].push({
                    fromFeature: fromFeature, fromIndex: fromIndex,
                    toFeature: toFeature, toIndex: toIndex,
                })
            })
        })
        jsds.set('movements', movements)
    })
}

function selectFeature(feature) {
    if (feature) {
        let $texts = $svgs.selectAll('text.' + feature.type)
        $texts.attr('fill', 'red')
    } else {
        let $texts = $svgs.selectAll('text')
        $texts.attr('fill', 'black')
    }
}

function getFeaturesAtLocation(env, x, y) {
    let out = []
    let featureByEnv = jsds.get('features') || []
    featureByEnv.forEach((features) => {
        features.forEach(f => {
            if (f.env === env && f.x === x && f.y === y) out.push(f)
        })
    })
    return out
}

function updateDisplay() {
    createFeatures($svgs, jsds.get('features'))
    let loc = jsds.get('location')
    if (loc) {
        let features = getFeaturesAtLocation(loc.environment, loc.x, loc.y)
        if (features.length) {
            let movements = jsds.get('movements')
            console.log(movements[features[0].type])
            // features.forEach(f => {
            //     let locations = featureMap[f.type]
            //     // let entry = [f.x, f.y].join(',')
            //     if (! locations) locations = new Set([f])
            //     if (! locations.has(f)) {
            //         locations.add(f)
            //     }
            //     featureMap[f.type] = locations
            // })
            // selectFeature(features[0])
        }
    }
}

module.exports = (elId) => {

    utils.loadHtml(html.default, elId, () => {
        let envRange = d3.range(0, environments)

        $el = $('#' + elId)
        $svgs = d3.selectAll('#' + elId + ' svg.environment').data(envRange)
            .enter().append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'environment')

        createGrid($svgs)

        // On user mouse move over world.
        $svgs.each((i, _, arr) => {
            let $svg = d3.select(arr[i])
            $svg.on('mousemove', () => {
                d3.event.preventDefault()
                let mouse = d3.mouse(arr[i])
                mouse[0] = Math.round(mouse[0] / gridSpacing) * gridSpacing
                mouse[1] = Math.round(mouse[1] / gridSpacing) * gridSpacing
                jsds.set('location', {
                    environment: i,
                    x: mouse[0], y: mouse[1]
                })
            })
        })

        jsds.after('set', 'features', updateDisplay)
        jsds.after('set', 'location', updateDisplay)
        let features = envRange.map(i => getRandomFeatures(i))
        jsds.set('features', features)

    })

}
