import React, { useRef, useEffect, useCallback } from 'react';
import './ZoomPanWrapper.css';
import Constants from '../../helpers/constants';
import { useZoomPanSubscriber, viewBox$, clientRect$, camera$ } from '../../hooks/useZoomPubSub';
import {mapRotation$} from '../../services/mapRotationService';
import AngleHelper from "../../helpers/angleHelper";

function boundZoom(zoom) {
    return Math.max(Constants.map.zoomMin, Math.min(Constants.map.zoomMax, zoom));
}

export default function ZoomPanWrapper({children}) {
    const wrapperRef = useRef(null);
    const svgRef = useRef(null);
    const cameraWrapperRef = useRef(null);
    const viewBoxRef = useRef({ x: -50, y: -50, w: 100, h: 100 });
    const cameraRef = useRef({ x: 0, y: 0, zoom: 1, rotation: 0 });
    const clientRectRef = useRef(null);
    const rafScheduledRef = useRef(false);
    const isMouseDownRef = useRef(false);

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
            mapRotation$.next(cameraRef.current.rotation);
        });
    }, []);

    const handleResize = useCallback(() => {
        const rect = wrapperRef.current?.getBoundingClientRect();
        if (!rect) return;

        updateViewBox({ x: -rect.width/2, y: -rect.height/2, w: rect.width, h: rect.height });
        clientRect$.next(rect);
        clientRectRef.current = rect;
    }, [updateViewBox]);

    const handleRotation = (e) => {
        const deltaAngle = e.movementX * Constants.map.rotationSensitivity;
        if(deltaAngle === 0) return;

        cameraRef.current.rotation = cameraRef.current.rotation + deltaAngle

        scheduleCameraUpdate();
    };

    const handleMove = (e) => {
        const cx = e.movementX / cameraRef.current.zoom;
        const cy = e.movementY / cameraRef.current.zoom;
        const cos = Math.cos(cameraRef.current.rotation * Math.PI / 180);
        const sin = Math.sin(cameraRef.current.rotation * Math.PI / 180);

        cameraRef.current.x -= cx * cos + cy * sin;
        cameraRef.current.y -= cy * cos - cx * sin;

        scheduleCameraUpdate();
    };

    // update viewbox when the window resizes
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call to set the viewBox
        return () => {
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
        const cos = Math.cos(cameraRef.current.rotation * Math.PI / 180);
        const sin = Math.sin(cameraRef.current.rotation * Math.PI / 180);
        cameraRef.current.x += offX * cos + offY * sin;
        cameraRef.current.y += offY * cos - offX * sin;

        scheduleCameraUpdate();
    };

    const onMouseDown = (e) => {
        e.preventDefault();
        isMouseDownRef.current = true;
    };

    const onMouseMove = (e) => {
        if (!isMouseDownRef.current) return;
        e.preventDefault();

        if(e.altKey) {
            handleRotation(e);
        } else {
            handleMove(e);
        }
    };

    const onMouseUp = (e) => {
        e.preventDefault();
        isMouseDownRef.current = false;
    };

    return (
        <div className="zoom-pan-wrapper" ref={wrapperRef}>
            <svg
                ref={svgRef}
                viewBox={getViewBoxString()}
                onWheel={onWheel}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
            >
                <g ref={cameraWrapperRef} transform={getCameraTransformString()}>
                    {children}
                </g>
            </svg>
        </div>
    );
}
