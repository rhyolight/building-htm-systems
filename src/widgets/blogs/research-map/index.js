let utils = require('../../../lib/utils')
let html = require('./index.tmpl.html')

let researchMap = {"Thousand Brains Theory of Intelligence":{"desc":"<img src=\"images/classic-hierarchy-vs-proposed-model.png\" /> <p> The <strong>Thousand Brains Theory of Intelligence</strong> proposes that the brain is composed of thousands of copies of a common cortical circuit. Each copy of the circuit (or cortical column) builds many distributed models of each object or concept learned through movement and sensation.  Each model is built in a different way – with different inputs from different senses, or from different parts of the same sense.  Cortical columns use long range connections to vote and reach a consensus on what they are sensing.proposes that the brain is composed of thousands of copies of a common cortical circuit. Each copy of the circuit (or cortical column) builds many distributed models of each object or concept learned through movement and sensation.  Each model is built in a different way – with different inputs from different senses, or from different parts of the same sense.  Cortical columns use long range connections to vote and reach a consensus on what they are sensing. </p> <p> It’s as if your brain is really thousands of independent brains working together in parallel. </p> <p> The Thousand Brains Theory suggests we need to rethink how the cortex processes information.  Rather than extracting sensory features in a series of processing steps, where objects are only recognized at the top, the theory instead suggests a highly distributed sensory-motor system. </p>\n","resources":{"The Thousand Brains Theory of Intelligence (blog post)":"https://numenta.com/blog/2019/01/16/the-thousand-brains-theory-of-intelligence/","A Framework for Intelligence and Cortical Function Based on Grid Cells in the Neocortex (Research paper)":"https://numenta.com/neuroscience-research/research-publications/papers/a-framework-for-intelligence-and-cortical-function-based-on-grid-cells-in-the-neocortex/","Companion to A Framework for Intelligence and Cortical Function (for non-neuroscientists)":"https://numenta.com/neuroscience-research/research-publications/papers/thousand-brains-theory-of-intelligence-companion-paper/"},"children":{"Local Computations / Parallel Voting":{"desc":"<img src=\"images/parallel-voting.png\" /> <p> In the Thousand Brains Theory, each cortical column creates complete models of its world, based on what it can sense as its associated sensor moves. Columns combine sensory input with a grid cell-derived location, and then integrate those “sensory features at locations” over movements. Long-range connections in the cortex allow columns to vote and this parallel voting leads to a consensus of what they the columns are sensing. </p>\n","resources":{"A Framework for Intelligence and Cortical Function Based on Grid Cells in the Neocortex (Research paper)":"https://numenta.com/neuroscience-research/research-publications/papers/a-framework-for-intelligence-and-cortical-function-based-on-grid-cells-in-the-neocortex/","Locations in the Neocortex":"A Theory of Sensorimotor Object Recognition Using Cortical Grid Cells (Research paper): https://numenta.com/neuroscience-research/research-publications/papers/locations-in-the-neocortex-a-theory-of-sensorimotor-object-recognition-using-cortical-grid-cells/"}},"Common Cortical Circuit":{"desc":"<img src=\"images/cortical-circuit.png\" class=\"half\"/> <p> The neocortex is complex. It contains dozens of cell types, numerous layers, and intricate connectivity patterns. The connections between cells suggest a columnar flow of information across layers as well as a laminar flow within some layers. Fortunately, this complex circuitry is remarkably preserved in all regions. Vernon Mountcastle was the first to propose that a canonical circuit consisting of cortical columns underlies everything the neocortex does. The way we see, feel, hear, move, and even do high level planning runs on this same common cortical circuit. </p>\n<p> If we can understand how this <strong>common cortical circuit</strong> works, we will have a framework for understanding how the entire neocortex works. Understanding the function of cortical columns is a central goal of our research program. </p>\n","resources":{"Cortical Circuitry (HTM School)":"https://www.youtube.com/watch?v=mPFx9yuV1Os","Key Discoveries in Understanding How the Brain Works (video)":"https://www.youtube.com/watch?v=X50GY0mdHlw"},"children":{"Layers":{"desc":"<img src=\"images/layers.png\" class=\"third\"/> <p> While neuroscience textbooks generally list 6 <strong>layers</strong> in the neocortex, scientists now believe there are more, with dozens of different cell types.  Our work involves figuring out what each layer is doing and how it fits into the common cortical circuit. </p>\n","resources":{"Key Discoveries in Understanding How the Brain Works (video)":"https://www.youtube.com/watch?v=X50GY0mdHlw","Cortical Circuitry (HTM School)":"https://www.youtube.com/watch?v=mPFx9yuV1Os"}},"Connections Between Layers":{"desc":"<img src=\"images/connections-between-layers.png\" class=\"third\"/> <p> As part of the common cortical circuit, the layers relate to each other in specific ways. Through our research, we are mapping out these connections. </p>\n","resources":{"A Theory of How Columns in the Neocortex Enable Learning the Structure of the World (Research paper)":"https://numenta.com/neuroscience-research/research-publications/papers/a-theory-of-how-columns-in-the-neocortex-enable-learning-the-structure-of-the-world/","Screencast: Jeff Hawkins - Human Brain Project Summit (video and presentation)":"https://numenta.com/resources/videos/jeff-hawkins-human-brain-project-screencast/","A mechanism for sensorimotor object recognition using cortical grid cells (Research poster)":"https://numenta.com/neuroscience-research/research-publications/posters/sfn-2018-sensorimotor-object-recognition-using-grid-cells/","Cortical Circuitry (HTM School)":"https://www.youtube.com/watch?v=mPFx9yuV1Os"}},"HTM Neuron":{"desc":"<img src=\"images/htm-neuron.png\" /> <p> Much of our research focuses around one fundamental observation: that the neocortex is constantly predicting its inputs. The <strong>HTM neuron</strong> is based on the idea that every pyramidal cell is a prediction machine. A single pyramidal neuron with active dendrites can recognize hundreds of unique patterns and contexts in which it can predict its input. </p>\n"},"Minicolumns":{"desc":"<p> Minicolumns, also sometimes referred to as cortical columns, are the most basic unit of neural organization.  It is the building block of essential elements for cortical processing. </p>\n","resources":{"Why Neurons Have Thousands of Synapses, A Theory of Sequence Memory in Neocortex (Research paper)":"https://numenta.com/neuroscience-research/research-publications/papers/why-neurons-have-thousands-of-synapses-theory-of-sequence-memory-in-neocortex/","The predictive neuron, how active dendrites enable spatiotemporal computation in the neocortex (Research poster)":"https://numenta.com/neuroscience-research/research-publications/posters/sfn-2018-the-predictive-neuron/"}},"Sequence Memory":{"desc":"<img src=\"images/sequence-memory.png\" /> <p> A network incorporating such neurons can learn complex sequences in a surprisingly robust and flexible manner. The model learns in a completely unsupervised fashion and, as a continuously learning system, adapts rapidly to changes in its input. </p>\n","resources":{"Why Neurons Have Thousands of Synapses, A Theory of Sequence Memory in Neocortex (Research paper)":"https://numenta.com/neuroscience-research/research-publications/papers/why-neurons-have-thousands-of-synapses-theory-of-sequence-memory-in-neocortex/","HTM School: Temporal Memory Part 1 (video)":"https://www.youtube.com/watch?v=UBzemKcUoOk"}}}},"Complete Object Modeling":{"desc":"","children":{"Locations":{"desc":"<img src=\"images/locations.png\" /> <p> We propose that the neocortex learns the structure of objects in the same way that the entorhinal cortex and hippocampus learn the structure of environments.  Every sensation we perceive is processed relative to its <strong>location</strong> on an object, not relative to you.  Columns combine sensory input with that feature’s location, and integrate those “sensory features at locations” over movements. </p>\n","resources":{"A Framework for Intelligence and Cortical Function Based on Grid Cells in the Neocortex (Research paper)":"https://numenta.com/neuroscience-research/research-publications/papers/a-framework-for-intelligence-and-cortical-function-based-on-grid-cells-in-the-neocortex/","Locations in the Neocortex":"A Theory of Sensorimotor Object Recognition Using Cortical Grid Cells (Research paper): https://numenta.com/neuroscience-research/research-publications/papers/locations-in-the-neocortex-a-theory-of-sensorimotor-object-recognition-using-cortical-grid-cells/"}},"Grid Cells":{"desc":"<img src=\"images/grid-cells.png\" /> <p> A <strong>grid cell</strong> is a type of neuron that exists in the entorhinal cortex and is responsible for navigation and knowing where you are in the world. Recent experimental evidence suggests that grid cells also are present in the neocortex. We propose that the neocortex uses “<strong>cortical grid cells</strong>” to learn complete models of objects in the same way that the entorhinal cortex uses <strong>grid cells</strong> to learn the structure of environments. </p>\n","resources":{"A Framework for Intelligence and Cortical Function Based on Grid Cells in the Neocortex (Research paper)":"https://numenta.com/neuroscience-research/research-publications/papers/a-framework-for-intelligence-and-cortical-function-based-on-grid-cells-in-the-neocortex/","Locations in the Neocortex":"A Theory of Sensorimotor Object Recognition Using Cortical Grid Cells (Research paper): https://numenta.com/neuroscience-research/research-publications/papers/locations-in-the-neocortex-a-theory-of-sensorimotor-object-recognition-using-cortical-grid-cells/","Grid Cells (HTM School Episode)":"https://www.youtube.com/watch?v=mP7neeymcUY","SfN 2018: Grid Cells in the Neocortex, a Framework for Cortical Computation (Research poster)":"https://numenta.com/neuroscience-research/research-publications/posters/sfn-2018-grid-cells-in-the-neocortex-a-framework-for-cortical-computation/"}},"Displacement Cells":{"desc":"<img src=\"images/displacement-cells.png\" /> <p> We propose the existence of a new type of neuron that is an extension of grid cells, called <strong>displacement cells</strong>. Displacement cells enable us to learn how objects are composed of other objects, also known as object compositionality. </p>\n","resources":{"A Framework for Intelligence and Cortical Function Based on Grid Cells in the Neocortex (Research paper)":"https://numenta.com/neuroscience-research/research-publications/papers/a-framework-for-intelligence-and-cortical-function-based-on-grid-cells-in-the-neocortex/","Locations in the Neocortex":"A Theory of Sensorimotor Object Recognition Using Cortical Grid Cells (Research paper): https://numenta.com/neuroscience-research/research-publications/papers/locations-in-the-neocortex-a-theory-of-sensorimotor-object-recognition-using-cortical-grid-cells/","Unsupervised Learning of Relative Landmark Locations Using Grid Cells (Research poster)":"https://numenta.com/neuroscience-research/research-publications/posters/unsupervised-learning-relative-landmark-locations-using-grid-cells/"}},"Object Compositionality":{"desc":"<img src=\"images/object-compositionality.png\" /> <p> Almost everything we know is composed of other things we already have learned, which allows the brain to learn new things efficiently without constantly having to learn everything from scratch. We propose that every time you learn a new object, displacement cells enable your brain to represent that object as a collection of objects you’ve previously learned, arranged in a particular way. </p>\n","resources":{"A Framework for Intelligence and Cortical Function Based on Grid Cells in the Neocortex (Research paper)":"https://numenta.com/neuroscience-research/research-publications/papers/a-framework-for-intelligence-and-cortical-function-based-on-grid-cells-in-the-neocortex/","Locations in the Neocortex":"A Theory of Sensorimotor Object Recognition Using Cortical Grid Cells (Research paper): https://numenta.com/neuroscience-research/research-publications/papers/locations-in-the-neocortex-a-theory-of-sensorimotor-object-recognition-using-cortical-grid-cells/"}},"Object Behavior":{"desc":"<img src=\"images/object-behavior.png\" /> <p> We propose that learning an <strong>object’s behavior<strong> is learning a sequence of displacements, meaning a sequence of how the relative positions of two locations change over time. </p>\n","resources":{"A Framework for Intelligence and Cortical Function Based on Grid Cells in the Neocortex (Research paper)":"https://numenta.com/neuroscience-research/research-publications/papers/a-framework-for-intelligence-and-cortical-function-based-on-grid-cells-in-the-neocortex/","Locations in the Neocortex":"A Theory of Sensorimotor Object Recognition Using Cortical Grid Cells (Research paper): https://numenta.com/neuroscience-research/research-publications/papers/locations-in-the-neocortex-a-theory-of-sensorimotor-object-recognition-using-cortical-grid-cells/"}}}},"Abstract Objects and Concepts":{"desc":"\n<p> Mountcastle proposed that all regions of the neocortex have the same complex circuitry and therefore they must be doing the same thing. If the regions of the neocortex that process sensory input use grid cells and locations to learn objects, then the evidence strongly suggests that the regions of the neocortex that learn <strong>abstract objects and concepts</strong> like language or mathematics also use grid cells and locations to perform these functions. </p>\n<p> We don’t fully understand how high-level concepts and abstract objects are represented in the brain, and are exploring this area further. </p>\n","resources":{"A Framework for Intelligence and Cortical Function Based on Grid Cells in the Neocortex (Research paper)":"https://numenta.com/neuroscience-research/research-publications/papers/a-framework-for-intelligence-and-cortical-function-based-on-grid-cells-in-the-neocortex/","Locations in the Neocortex":"A Theory of Sensorimotor Object Recognition Using Cortical Grid Cells (Research paper): https://numenta.com/neuroscience-research/research-publications/papers/locations-in-the-neocortex-a-theory-of-sensorimotor-object-recognition-using-cortical-grid-cells/"}}}}}

function isChildMap(node) {
    return !node.resources && !node.requires && !node.desc && !node.children
}

function toDomId(str) {
    return str.replace(/\s+/g, '_')
}

function htmlNodeLoader(node, $el, _name) {
    // Read through hierarchy and create the HTML we need
    // to support the nested accordions

    let $header = $('<h3>')
    let $content = $('<div>')

    let nodeName = (node.name || _name) || 'root'
    let id = toDomId(nodeName)

    if (isChildMap(node)) {
        let childNames = Object.keys(node)
        let $ul = $('<ul id="' + id + '" class="accordion">')
        childNames.forEach(name => {
            $ul.append(htmlNodeLoader(node[name], $('<li>'), name))
        })
        $content.append($ul)
    } else {

        $content.attr('id', id)
        if (node.desc) {
            $content.append(node.desc)
        }

        if (node.children) {
            htmlNodeLoader(node.children, $content, nodeName)
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
                $content.append('<h4>Other Resources')
                $content.append($res)
            }

            if (node.requires) {
                let $res = $('<ul>')
                node.requires.forEach(req => {
                    let $link = $('<a class="requires" href="#">')
                    $link.html(req)
                    let $li = $('<li>')
                    $li.append($link)
                    $res.append($li)
                })
                $content.append('<h4>Other Resources')
                $content.append($res)
            }
        }

        if (nodeName !== 'root') {
            $header.html(nodeName)
            $header.attr('id', toDomId(nodeName) + '_h3')
        }
    }

    $el.append([$header, $content])

    return $el
}

function loadAccordionHtml(elId) {
    return htmlNodeLoader(researchMap, $('#' + elId))
}

function render(elId) {
    let $el = loadAccordionHtml(elId)

    $el.find("ul.accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
    });

    // This opens the main accordion
    $el.find("#" + toDomId("root")).accordion({
        collapsible: false,
        active: true,
        heightStyle: "content"
    })

    // Inter-accordion clicks
    $el.find('.requires').click(evt => {
        let id = toDomId($(evt.target).html())
        evt.stopPropagation()
        evt.preventDefault()
        $('#' + id + '_h3').click()
    })
}

function processRequest(elId) {
    utils.loadHtml(html.default, 'research-map', () => {
        render(elId)
    })
}

window.BHTMS = {
    researchMap: processRequest
}
