import React, { useRef, useEffect, useCallback } from 'react';
import './ZoomPanWrapper.css';
import Constants from '../../helpers/constants';
import { useZoomPanSubscriber, viewBox$, clientRect$, camera$ } from '../../hooks/useZoomPubSub';

export default function ZoomPanWrapper({children}) {
    const wrapperRef = useRef(null);
    const svgRef = useRef(null);
    const cameraWrapperRef = useRef(null);
    const viewBoxRef = useRef({ x: -50, y: -50, w: 100, h: 100 });
    const cameraRef = useRef({ x: 0, y: 0, zoom: 1 });
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
        const { x, y, zoom } = cameraRef.current;

        return `scale(${zoom}) translate(${-x},${-y})`;
    };

    const scheduleCameraUpdate = useCallback(() => {
        if (rafScheduledRef.current) return;

        rafScheduledRef.current = true;
        requestAnimationFrame(() => {
            rafScheduledRef.current = false;
            cameraWrapperRef.current.setAttribute('transform', getCameraTransformString());
            camera$.next(cameraRef.current);
        });
    }, []);
    
    const handleResize = useCallback(() => {
        const rect = wrapperRef.current?.getBoundingClientRect();
        if (!rect) return;

        updateViewBox({ x: -rect.width/2, y: -rect.height/2, w: rect.width, h: rect.height });
        clientRect$.next(rect);
        clientRectRef.current = rect;
    }, [updateViewBox]);
    
    // update viewbox when the window resizes
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call to set the viewBox
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);
    
    const centerOn = useCallback((cx, cy) => {
        cameraRef.current.x = cx;
        cameraRef.current.y = cy;

        scheduleCameraUpdate();
    }, [scheduleCameraUpdate]);
    
    // Subscribe to any external "center" calls
    useZoomPanSubscriber(centerOn);

    const onWheel = (e) => {
        const { left, top } = clientRectRef.current;
        const { x, y, zoom } = cameraRef.current;
        const { w, h } = viewBoxRef.current;

        const newZoom = cameraRef.current.zoom * (1.0 - (e.deltaY * Constants.map.zoomSensitivity));

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

        cameraRef.current.x += offX;
        cameraRef.current.y += offY;
        cameraRef.current.zoom = newZoom;

        scheduleCameraUpdate();
    };
    
    const onMouseDown = (e) => {
        e.preventDefault();
        isMouseDownRef.current = true;
    };

    const onMouseMove = (e) => {
        if (!isMouseDownRef.current) return;
        e.preventDefault();

        cameraRef.current.x -= e.movementX / cameraRef.current.zoom;
        cameraRef.current.y -= e.movementY / cameraRef.current.zoom;

        scheduleCameraUpdate();
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
