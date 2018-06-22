let d3 = require('d3')
let moment = require('moment')
let utils = require('../../../lib/utils')
let html = require('./cyclicEncoders.tmpl.html')
let CyclicEncoderDisplay = require('CyclicEncoderDisplay')

module.exports = (elementId) => {

    utils.loadHtml(html.default, elementId, () => {
        let size = 135

        let params = [{
            // month of year
            categories: d3.range(0, 11),
            w: 3,
            color: '#DF0024',
        }, {
            // day of month
            categories: d3.range(0, 30),
            w: 9,
            color: '#00AC9F',
        }, {
            // day of week
            categories: d3.range(0, 6),
            w: 11,
            color: '#F3C300',
        }, {
            // hour of day
            categories: d3.range(0, 23),
            w: 9,
            color: '#2E6DB4',
        }]

        let names = [
            'month-of-year',
            'day-of-month',
            'day-of-week',
            'hour-of-day',
        ]

        let displays = names.map((name, i) => {
            let prms = params[i]
            let $svg = d3.select('#' + elementId + ' svg#' + name)
            prms.size = size
            let encoderDisplay = new CyclicEncoderDisplay($svg, prms)
            encoderDisplay.render()
            return encoderDisplay
        })

        // Animation properties for demo
        let frameSpeed = 100 // ms
        let start = moment()
        let increment = 30 // minutes
        let animationIndex = 0

        function process(time) {
            names.forEach((name, i) => {
                let display = displays[i]
                let value
                if (name === 'month-of-year') {
                    value = time.month()
                } else if (name === 'day-of-month') {
                    value = time.date()
                } else if (name === 'day-of-week') {
                    value = time.day()
                } else if (name === 'hour-of-day') {
                    value = time.hour()
                } else {
                    throw new Error('Unknown time period: ' + name)
                }
                display.value = value
            })
        }

        process(start)

        setInterval(() => {
            let date = start.add(increment * animationIndex++, 'minutes')
            process(date)
        }, frameSpeed)

    })

}
