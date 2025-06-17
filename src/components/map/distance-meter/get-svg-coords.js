import { getCurrentClientRect, getCurrentViewBox } from "../../../hooks/useZoomPubSub";

export function getSVGCoords(event) {
    const rect = getCurrentClientRect();
    const viewBox = getCurrentViewBox();
    if (!rect || !viewBox) return null;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const adjustedX = viewBox.x + (x / rect.width) * viewBox.w;
    const adjustedY = viewBox.y + (y / rect.height) * viewBox.h;

    return [adjustedX, adjustedY];
}
