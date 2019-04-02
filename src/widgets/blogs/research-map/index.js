let utils = require('../../../lib/utils')
let html = require('./index.tmpl.html')
let researchMap = require('./research-map.json')
// list of ids for open topics at any time, used to close topics during nav.
let open = []

let $overlay
let selectedTopicId

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

function isChildMap(node) {
    return !node.resources && !node.dependencies && !node.desc && !node.children
}

function toDomId(str) {
    return str.replace(/\s+/g, '_')
        .replace(/\//g, '_')
}

function htmlAccordionNodeLoader(node, $el, _name) {
    // Read through hierarchy and create the HTML we need
    // to support the nested accordions

    let nodeName = node.name || _name || 'root'
    let $header = $('<h3>')
    let $content = $('<div>')
    let id = toDomId(nodeName)

    if (isChildMap(node)) {
        let childNames = Object.keys(node)
        let $ul = $('<ul id="' + id + '" class="accordion">')
        childNames.forEach(name => {
            $ul.append(htmlAccordionNodeLoader(node[name], $('<li>'), name))
        })
        $content.append($ul)
    } else {

        $content.attr('id', id)
        if (node.desc) {
            $content.append(node.desc)
        }

        if (node.children) {
            htmlAccordionNodeLoader(node.children, $content, nodeName)
        }

        if (nodeName && node.desc) {

            if (node.resources) {
                let $res = $('<ul>')
                Object.keys(node.resources).forEach(resource => {
                    let url = node.resources[resource]
                    let $link = $('<a href="' + url + '" target="_blank">')
                    $link.html(resource)
                    let $li = $('<li>')
                    $li.append($link)
                    $res.append($li)
                })
                $content.append('<h4>External Resources')
                $content.append($res)
            }

        }

        $header.html(nodeName)
        $header.data('nodeName', nodeName)
    }

    $el.append([$header, $content])

    return $el
}

function getMapAncestors(m, target, _crumbs, _name) {
    let out = []
    let crumbs = _crumbs || []
    if (target === _name) {
        out = out.concat(crumbs)
        out.push(_name)
    } else {
        if (m.children) {
            crumbs.push(_name)
            out = out.concat(
                getMapAncestors(
                    m.children,
                    target,
                    crumbs
                )
            )
        } else if (m.desc) {
            // ignore leaf node
        } else {
            // root map of children
            let ancestors = Object.keys(m).map(childName => {
                return getMapAncestors(
                    m[childName], target, crumbs, childName
                )
            })
            ancestors = [].concat.apply([], ancestors);
            out = out.concat(ancestors)
        }
    }
    return out
}

function render($topEl) {
    let $accordion = htmlAccordionNodeLoader(
        researchMap, $topEl.find('.accordion-map')
    )

    $accordion.find("ul.accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content",
    });

    // This opens the main accordion
    $accordion.find("#" + toDomId("root")).accordion({
        collapsible: false,
        active: true,
        heightStyle: "content",
    })

    $topEl.click(evt => {
        let $target = $(evt.target)
        if ($target.hasClass('ui-accordion-header')) {
            let nodeName = $target.data('nodeName')
            if (! $target.hasClass('ui-state-active')) {
                // this was just de-selected, so we'll select the parent
                let ancestors = getMapAncestors(researchMap, nodeName)
                selectedTopicId = toDomId(ancestors[ancestors.length - 2])
            } else {
                selectedTopicId = toDomId(nodeName)
            }
            console.log(`selectedTopic: ${selectedTopicId}`)
        }
    })
}

function renderResearchMap(elId) {
    utils.loadHtml(html.default, elId, () => {
        render($('#' + elId))
    })
}

window.BHTMS = {
    researchMap: renderResearchMap
}
