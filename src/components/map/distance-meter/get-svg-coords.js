import { getCurrentCamera, getCurrentClientRect, getCurrentViewBox } from "../../../hooks/useZoomPubSub";

export function getSVGCoords(event) {
    const { left, top } = getCurrentClientRect();
    const { x, y, zoom } = getCurrentCamera();
    const { w, h } = getCurrentViewBox();
    
    // screen space cursor pos
    const cx = event.clientX - left;
    const cy = event.clientY - top;

    // svg space cursor pos
    const scx = x - (w / 2 - cx) / zoom;
    const scy = y - (h / 2 - cy) / zoom;

    return [scx, scy];
}
