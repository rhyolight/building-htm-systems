let utils = require('../../../lib/utils')
let html = require('./prototype_3.tmpl.html')
let YAML = require('yamljs')
let rawMap = YAML.load('./research-map-2.yaml')
let root
let $el

function loadData() {
    root = d3.hierarchy(rawMap.root)
}

function render(elId) {
    $el = $('#' + elId)
    $el.accordion();

    // Hover states on the static widgets
    $( "#dialog-link, #icons li" ).hover(
        function() {
            $( this ).addClass( "ui-state-hover" );
        },
        function() {
            $( this ).removeClass( "ui-state-hover" );
        }
    );

}


function researchMap(elId) {
    utils.loadHtml(html.default, 'research-map', () => {
        render(elId)
    })
}

window.BHTMS = {
    researchMap: researchMap
}
