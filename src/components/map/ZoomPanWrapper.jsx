import React, { useRef, useEffect, useCallback } from 'react';
import './ZoomPanWrapper.css';
import Constants from '../../helpers/constants';
import { useZoomPanSubscriber, viewBox$, clientRect$, camera$ } from '../../hooks/useZoomPubSub';
import {setMapRotation} from '../../services/mapRotationService';
import AngleHelper from "../../helpers/angleHelper";
import { setMapZoom } from '../../services/mapZoomService';

function boundZoom(zoom) {
    return Math.max(Constants.map.zoomMin, Math.min(Constants.map.zoomMax, zoom));
}

const getDistance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const getAngle = (a, b) => Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
const getMidpoint = (a, b) => ({
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2
});

export default function ZoomPanWrapper({children}) {
    const wrapperRef = useRef(null);
    const svgRef = useRef(null);
    const cameraWrapperRef = useRef(null);
    const viewBoxRef = useRef({ x: -50, y: -50, w: 100, h: 100 });
    const cameraRef = useRef({ x: 0, y: 0, zoom: 1, rotation: 0 });
    const clientRectRef = useRef(null);
    const rafScheduledRef = useRef(false);
    const pointersRef = useRef(new Map());
    const lastPointerRef = useRef(null);
    const twoFingerStartRef = useRef(null);

    const getViewBoxString = () => {
        const { x, y, w, h } = viewBoxRef.current;
        return `${x} ${y} ${w} ${h}`;
    };

    const updateViewBox = useCallback((viewBox) => {
        viewBoxRef.current = viewBox;
        svgRef.current.setAttribute('viewBox', getViewBoxString());
        viewBox$.next(viewBoxRef.current);
    }, []);

    const getCameraTransformString = () => {
        const { x, y, zoom, rotation } = cameraRef.current;

        return `scale(${zoom}) rotate(${rotation}) translate(${-x},${-y})`;
    };

    const scheduleCameraUpdate = useCallback(() => {
        if (rafScheduledRef.current) return;

        rafScheduledRef.current = true;
        requestAnimationFrame(() => {
            rafScheduledRef.current = false;
            cameraWrapperRef.current.setAttribute('transform', getCameraTransformString());
            camera$.next(cameraRef.current);
            setMapRotation(cameraRef.current.rotation);
            setMapZoom(cameraRef.current.zoom);
        });
    }, []);

    const handleResize = useCallback(() => {
        const rect = wrapperRef.current?.getBoundingClientRect();
        if (!rect) return;

        updateViewBox({ x: -rect.width/2, y: -rect.height/2, w: rect.width, h: rect.height });
        clientRect$.next(rect);
        clientRectRef.current = rect;
    }, [updateViewBox]);

    const applyScreenPan = useCallback((dxScreen, dyScreen) => {
        const { zoom, rotation } = cameraRef.current;
        const dx = dxScreen / zoom;
        const dy = dyScreen / zoom;
        const rad = AngleHelper.degToRad(rotation);
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

        cameraRef.current.x -= dx * cos + dy * sin;
        cameraRef.current.y -= dy * cos - dx * sin;

        scheduleCameraUpdate();
    }, [scheduleCameraUpdate]);

    const getScreenPoint = (clientX, clientY) => {
        const rect = clientRectRef.current;
        return {
            x: clientX - rect.left - rect.width / 2,
            y: clientY - rect.top - rect.height / 2
        };
    };

    const screenPointToWorld = (point, camera) => {
        const rad = AngleHelper.degToRad(camera.rotation);
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const sx = point.x / camera.zoom;
        const sy = point.y / camera.zoom;

        return {
            x: camera.x + sx * cos + sy * sin,
            y: camera.y - sx * sin + sy * cos
        };
    };

    const startTwoFingerGesture = (pointers) => {
        const [first, second] = pointers;
        const distance = getDistance(first, second);
        const angle = getAngle(first, second);
        const midpoint = getMidpoint(first, second);
        const screenPoint = getScreenPoint(midpoint.x, midpoint.y);
        const worldPoint = screenPointToWorld(screenPoint, cameraRef.current);

        twoFingerStartRef.current = {
            distance,
            angle,
            zoom: cameraRef.current.zoom,
            rotation: cameraRef.current.rotation,
            worldPoint
        };
    };

    const updateTwoFingerGesture = (pointers) => {
        const start = twoFingerStartRef.current;
        if (!start) return;

        const [first, second] = pointers;
        const distance = getDistance(first, second);
        const angle = getAngle(first, second);
        const midpoint = getMidpoint(first, second);

        const newZoom = boundZoom(start.zoom * (distance / start.distance));
        const deltaAngle = AngleHelper.normalizeAngleDelta(angle - start.angle);
        const newRotation = AngleHelper.normalizeDegAngle(start.rotation + deltaAngle);

        const screenPoint = getScreenPoint(midpoint.x, midpoint.y);
        const rad = AngleHelper.degToRad(newRotation);
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const sx = screenPoint.x / newZoom;
        const sy = screenPoint.y / newZoom;

        cameraRef.current.zoom = newZoom;
        cameraRef.current.rotation = newRotation;
        cameraRef.current.x = start.worldPoint.x - (sx * cos + sy * sin);
        cameraRef.current.y = start.worldPoint.y - (-sx * sin + sy * cos);

        scheduleCameraUpdate();
    };

    const onPointerDown = (e) => {
        pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (pointersRef.current.size === 1) {
            lastPointerRef.current = { x: e.clientX, y: e.clientY };
            twoFingerStartRef.current = null;
        } else if (pointersRef.current.size === 2) {
            startTwoFingerGesture(Array.from(pointersRef.current.values()));
            lastPointerRef.current = null;
        }
    };

    const onPointerMove = (e) => {
        if (!pointersRef.current.has(e.pointerId)) return;

        pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (pointersRef.current.size === 1) {
            const last = lastPointerRef.current;
            if (!last) return;

            const dx = e.clientX - last.x;
            const dy = e.clientY - last.y;
            lastPointerRef.current = { x: e.clientX, y: e.clientY };

            if (e.pointerType === 'mouse' && e.altKey) {
                const deltaAngle = dx * Constants.map.rotationSensitivity;
                if (deltaAngle !== 0) {
                    cameraRef.current.rotation += deltaAngle;
                    scheduleCameraUpdate();
                }
            } else {
                applyScreenPan(dx, dy);
            }
            return;
        }

        if (pointersRef.current.size >= 2) {
            const firstTwo = Array.from(pointersRef.current.values()).slice(0, 2);
            if (!twoFingerStartRef.current) {
                startTwoFingerGesture(firstTwo);
            } else {
                updateTwoFingerGesture(firstTwo);
            }
        }
    };

    const onPointerUp = (e) => {
        pointersRef.current.delete(e.pointerId);

        if (pointersRef.current.size === 0) {
            lastPointerRef.current = null;
            twoFingerStartRef.current = null;
            return;
        }

        if (pointersRef.current.size === 1) {
            const remaining = Array.from(pointersRef.current.values())[0];
            lastPointerRef.current = { x: remaining.x, y: remaining.y };
            twoFingerStartRef.current = null;
            return;
        }

        if (pointersRef.current.size >= 2) {
            startTwoFingerGesture(Array.from(pointersRef.current.values()).slice(0, 2));
            lastPointerRef.current = null;
        }
    };

    const onPointerCancel = onPointerUp;

    useEffect(() => {
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerCancel);
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call to set the viewBox
        return () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerCancel);
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    const setCamera = useCallback((cx, cy, rot, zoom) => {
        cameraRef.current.x = cx;
        cameraRef.current.y = cy;
        if (rot || rot === 0) cameraRef.current.rotation = AngleHelper.normalizeDegAngle(rot);
        if (zoom) cameraRef.current.zoom = boundZoom(zoom);

        scheduleCameraUpdate();
    }, [scheduleCameraUpdate]);

    const alignView = (angleDeg) => {
        // Find such relative rotation in the range [-45, 45] degrees that aligns the track
        // with y rotation angleDeg to the X or Y screen axis.
        const angleDifference = -angleDeg - cameraRef.current.rotation;
        let deltaAngle = AngleHelper.normalizeDegAngle(angleDifference, 90);
        if (deltaAngle > 45) deltaAngle -= 90;

        cameraRef.current.rotation += deltaAngle;
        scheduleCameraUpdate();
    };

    // Subscribe to any external `setCamera` and `alignView` calls
    useZoomPanSubscriber(setCamera, alignView);

    const onWheel = (e) => {
        if (!clientRectRef.current) return;

        const { left, top } = clientRectRef.current;
        const { x, y, zoom } = cameraRef.current;
        const { w, h } = viewBoxRef.current;

        const newZoomCalc = cameraRef.current.zoom * (1.0 - (e.deltaY * Constants.map.zoomSensitivity));
        const newZoom = boundZoom(newZoomCalc);
        cameraRef.current.zoom = newZoom;

        // screen space cursor pos
        const cx = e.clientX - left;
        const cy = e.clientY - top;

        // svg space cursor pos
        const scx = x - (w / 2 - cx) / zoom;
        const scy = y - (h / 2 - cy) / zoom;

        // "new" screen space cursor pos
        const ncx = w/2 - (x - scx) * newZoom;
        const ncy = h/2 - (y - scy) * newZoom;

        // difference in screen space cursor pos
        const offX = (ncx - cx) / newZoom;
        const offY = (ncy - cy) / newZoom;

        // update camera position so the cursor stays in the same place
        const cos = Math.cos(AngleHelper.degToRad(cameraRef.current.rotation));
        const sin = Math.sin(AngleHelper.degToRad(cameraRef.current.rotation));
        cameraRef.current.x += offX * cos + offY * sin;
        cameraRef.current.y += offY * cos - offX * sin;

        scheduleCameraUpdate();
    };

    return (
        <div className="zoom-pan-wrapper" ref={wrapperRef}>
            <svg
                ref={svgRef}
                viewBox={getViewBoxString()}
                onWheel={onWheel}
                onPointerDown={onPointerDown}
            >
                <g ref={cameraWrapperRef} transform={getCameraTransformString()}>
                    {children}
                </g>
            </svg>
        </div>
    );
}