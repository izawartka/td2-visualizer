import { getCurrentCamera, getCurrentClientRect, getCurrentViewBox } from "../../../hooks/useZoomPubSub";
import AngleHelper from "../../../helpers/angleHelper";

export function getSVGCoords(event) {
    const { left, top } = getCurrentClientRect();
    const { x, y, zoom, rotation } = getCurrentCamera();
    const { w, h } = getCurrentViewBox();

    // screen space cursor pos
    const cx = event.clientX - left;
    const cy = event.clientY - top;

    // svg space cursor offset from camera position
    const dx = -(w / 2 - cx) / zoom;
    const dy = -(h / 2 - cy) / zoom;

    // apply camera rotation
    const cos = Math.cos(AngleHelper.degToRad(rotation));
    const sin = Math.sin(AngleHelper.degToRad(rotation));
    const rdx = dx * cos + dy * sin;
    const rdy = dy * cos - dx * sin;

    // svg space cursor pos
    const scx = x + rdx;
    const scy = y + rdy;

    return [scx, scy];
}
