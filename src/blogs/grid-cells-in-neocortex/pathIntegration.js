let utils = require('../../widgets/utils')
let html = require('./pathIntegration.tmpl.html')
let HexagonGridCellModule = require('HexagonGridCellModule')
let JSDS = require('JSDS')

let jsds = JSDS.create('pathIntegration')

let environments = 4
let featureCount = 6
let width = 420
let height = 300
let gridSpacing = 20
let featureMap = {}

let gridColor = '#888'
let gridStroke = .5


let $svgs
let gridCellModules
let gridRows = 4, gridCols = 4
let gcmCount = 20

function buildGridCellModules() {
    let out = []
    while (out.length < gcmCount) {
        let orientation = parseInt(utils.getRandomArbitrary(0, 60))
        let scale = parseInt(utils.getRandomArbitrary(10, 50))
        let module = new HexagonGridCellModule(
            0, gridRows, gridCols, orientation, scale
        )
        module.setColor(
            utils.getRandomArbitrary(100, 255),
            utils.getRandomArbitrary(100, 255),
            utils.getRandomArbitrary(100, 255)
        )
        module.activeCells = 1
        out.push(module)
    }
    return out
}

function getRandomFeatures(envIndex) {
    let types = ['A', 'B', 'C', 'D'],
        out = []
    d3.range(0, featureCount).forEach(i => {
        let randomType = types[utils.getRandomInt(types.length)]
        let randomX = Math.round(
            utils.getRandomArbitrary(0, width) / gridSpacing
        ) * gridSpacing
        let randomY = Math.round(
            utils.getRandomArbitrary(0, height) / gridSpacing
        ) * gridSpacing
        let gcm = gridCellModules[envIndex]

        let origin = {x: 0, y: 0}
        gcm.intersectWorld(
            randomX,
            randomY,
            gcm.createWorldPoints(origin, width, height)
        )
        out.push({
            type: randomType,
            x: randomX,
            y: randomY,
            location: gcm.getEncoding(),
            env: envIndex,
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

function sdrSubtract(value, from) {
    let out = []
    for (let i = 0; i < value.length; i++) {
        out.push(Math.max(0, from[i] - value[i]))
    }
    return out
}

function treatMoveLines(feature, moves) {
    moves.attr('class', 'move')
        .attr('x1', feature.x).attr('y1', feature.y)
        .attr('x2', d => feature.x + d.x)
        .attr('y2', d => feature.y + d.y)
        .attr('stroke', 'red')
        .attr('stroke-width', 1)
}

function createMovements($svgs, feature, movements) {
    let $moves = $svgs.selectAll('line.move').data(movements)
    treatMoveLines(feature, $moves)

    let $newMoves = $moves.enter().append('line')
    treatMoveLines(feature, $newMoves)

    $moves.exit().remove()
}

function createFeatures($svgs, features) {
    // Also create movements between all the features
    let movements = {}
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
        envFeatures.forEach((fromFeature, fromIndex) => {
            envFeatures.forEach((toFeature, toIndex) => {
                if (fromIndex === toIndex) return
                // console.log(
                //     'tracking movement from %s (at %s) to %s (at %s) in env %s', fromFeature.type, fromIndex,
                //     toFeature.type, toIndex,
                //     fromFeature.env
                // )
                if (! movements[fromFeature.type]) {
                    movements[fromFeature.type] = []
                }
                movements[fromFeature.type].push({
                    x: toFeature.x - fromFeature.x,
                    y: toFeature.y - fromFeature.y,
                    encoding: sdrSubtract(
                        fromFeature.location, toFeature.location
                    )
                })
            })
        })
    })
    jsds.set('movements', movements)
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
            let feature = features[0]
            createMovements(
                d3.select($svgs.nodes()[loc.environment]),
                feature,
                jsds.get('movements')[feature.type]
            )
        }
    } else {
        $svgs.selectAll('line.move').remove()
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
            $svg.on('mouseleave', () => {
                jsds.set('location', undefined)
            })
        })

        gridCellModules = buildGridCellModules()

        jsds.after('set', 'features', updateDisplay)
        jsds.after('set', 'location', updateDisplay)
        let features = envRange.map(i => getRandomFeatures(i))
        jsds.set('features', features)

    })

}
