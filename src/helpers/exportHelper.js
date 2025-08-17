import Constants from "./constants";

const applyStyles = ['fill', 'stroke', 'stroke-width', 'font-size', 'font-family', 'text-anchor', 'dominant-baseline'];

function processExportNode(svgNode, currentGroupStyles = {}) {
    if (!svgNode) return;

    // apply export-force-visible attribute
    if(svgNode.hasAttribute('export-force-visible')) {
        svgNode.removeAttribute('export-force-visible');

        if (svgNode.style.display === 'none') {
            svgNode.style.display = '';
        }
    }

    // remove empty style attribute
    if (svgNode.hasAttribute('style')) {
        const style = svgNode.getAttribute('style');
        if (!style || style.trim() === '') {
            svgNode.removeAttribute('style');
        }
    }

    // apply styles
    const computedStyles = getComputedStyle(svgNode);
    const newGroupStyles = { ...currentGroupStyles };
    for (const style of applyStyles) {
        if (computedStyles[style] && currentGroupStyles[style] !== computedStyles[style]) {
            svgNode.setAttribute(style, computedStyles[style]);
            newGroupStyles[style] = computedStyles[style];
        }
    }

    svgNode.removeAttribute('pointer-events');

    if (svgNode.nodeType !== Node.ELEMENT_NODE) return;
    if (svgNode.children && svgNode.children.length > 0) {
        const nodesToRemove = [];

        // process children recursively
        for (const child of svgNode.children) {
            if (child.hasAttribute('no-export')) {
                nodesToRemove.push(child);
                continue;
            }

            processExportNode(child, newGroupStyles);
        }

        // remove nodes with no-export attribute
        for (const node of nodesToRemove) {
            svgNode.removeChild(node);
        }
    }
}

function checkNodeVisible(svgNode, trimClientRect) {
    if(!svgNode) return false;

    if (svgNode.children?.length > 0) {
        const visibleNodes = Array.from(svgNode.children).filter(child => {
            return checkNodeVisible(child, trimClientRect);
        });

        return visibleNodes.length > 0;
    }

    const clientRect = svgNode.getBoundingClientRect();
    if (clientRect.x + clientRect.width < trimClientRect.x) return false;
    if (clientRect.x > trimClientRect.x + trimClientRect.width) return false;
    if (clientRect.y + clientRect.height < trimClientRect.y) return false;
    if (clientRect.y > trimClientRect.y + trimClientRect.height) return false;
    if (clientRect.width === 0 || clientRect.height === 0) return false;

    return true;
}

function removeNonVisibleObjects(svg) {
    const sceneryRoot = svg.querySelector('g.scenery-root');
    if (!sceneryRoot) return;

    const trimClientRect = svg.getBoundingClientRect();

    for (const layer of sceneryRoot.children) {
        const objectsToDelete = Array.from(layer.children).filter(child => {
            return !checkNodeVisible(child, trimClientRect);
        });

        for (const node of objectsToDelete) {
            layer.removeChild(node);
        }
    }
}

function serializeAndDownload(svgNode, filename) {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgNode);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function addMetadata(svg) {
    const metadata = document.createElementNS('http://www.w3.org/2000/svg', 'metadata');
    const rdf = document.createElementNS('http://www.w3.org/1999/02/22-rdf-syntax-ns#', 'rdf:RDF');
    const description = document.createElementNS('http://purl.org/dc/elements/1.1/', 'dc:description');
    description.textContent = `Exported using TD2 Visualizer v${Constants.buildVersion}`;
    const source = document.createElementNS('http://purl.org/dc/elements/1.1/', 'dc:source');
    source.textContent = Constants.originalPublicBuildUrl;

    rdf.appendChild(description);
    rdf.appendChild(source);
    metadata.appendChild(rdf);
    svg.appendChild(metadata);

    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('version', '1.1');
}

function exportSvg(filename) {
    const mapElement = document.getElementsByClassName('map')[0];
    if (!mapElement) return false;

    const svgOrig = mapElement.querySelector('svg');
    if (!svgOrig) return false;

    const exportContainer = document.createElement('div');
    exportContainer.classList.add('export-container', 'light-mode');

    const svg = svgOrig.cloneNode(true);
    mapElement.appendChild(exportContainer);
    exportContainer.appendChild(svg);

    addMetadata(svg);
    processExportNode(svg);
    removeNonVisibleObjects(svg);

    serializeAndDownload(svg, filename);

    mapElement.removeChild(exportContainer);
    return true;
}

const ExportHelper = {
    exportSvg
};

export default ExportHelper;
