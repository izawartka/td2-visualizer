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

function exportSvg(filename) {
    const mapElement = document.getElementsByClassName('map')[0];
    if (!mapElement) return false;

    const svgOrig = mapElement.querySelector('svg');
    if (!svgOrig) return false;

    const svg = svgOrig.cloneNode(true);
    mapElement.appendChild(svg);

    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('version', '1.1');
    svg.classList.add('light-mode');
    processExportNode(svg);

    serializeAndDownload(svg, filename);

    mapElement.removeChild(svg);
    return true;
}

const ExportHelper = {
    exportSvg
};

export default ExportHelper;
