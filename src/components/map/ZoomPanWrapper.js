import React, { useState, useRef, useEffect, useCallback } from 'react';
import './ZoomPanWrapper.css';
import Constants from '../../helpers/constants';
import { useZoomPanSubscriber, viewBox$, clientRect$ } from '../../hooks/useZoomPubSub';

export default function ZoomPanWrapper({children}) {
    const [viewBox, setViewBox] = useState({x: 0, y: 0, w: 100, h: 100}); // Initial viewBox
    const wrapperRef = useRef(null);
    const svgRef = useRef(null);
    const isPanning = useRef(false);
    const panStart = useRef({ x: 0, y: 0 });
    const vbStart = useRef(viewBox);
    const clientRect = useRef(null);
    const pendingViewBoxRef = useRef(viewBox);
    const rafScheduledRef = useRef(false);
    
    const scheduleViewBoxUpdate = useCallback((newVB) => {
        pendingViewBoxRef.current = newVB;
        if (!rafScheduledRef.current) {
            rafScheduledRef.current = true;
            requestAnimationFrame(() => {
                setViewBox(pendingViewBoxRef.current);
                rafScheduledRef.current = false;
            });
        }
    }, []);
    
    const handleResize = useCallback(() => {
        const rect = wrapperRef.current?.getBoundingClientRect();
        if (!rect) return;

        clientRect$.next(rect); // Update clientRect BehaviorSubject
        
        if (!clientRect.current) {
            // First-time: initialize viewBox so SVG fits wrapper
            const initialVB = {
                x: -rect.width / 2,
                y: -rect.height / 2,
                w: rect.width,
                h: rect.height
            };

            clientRect.current = rect;
            scheduleViewBoxUpdate(initialVB);
            return;
        }
        
        const prev = pendingViewBoxRef.current;
        const scaleX = rect.width / clientRect.current.width;
        const scaleY = rect.height / clientRect.current.height;
        const newX = prev.x + (prev.w / 2) * (1 - scaleX);
        const newY = prev.y + (prev.h / 2) * (1 - scaleY);
        clientRect.current = rect;
        scheduleViewBoxUpdate({
            x: newX,
            y: newY,
            w: prev.w * scaleX,
            h: prev.h * scaleY,
        });
    }, [scheduleViewBoxUpdate]);
    
    // change viewbox when the window resizes
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call to set the viewBox
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);
    
    // Whenever viewBox state changes, publish to viewBox$
    useEffect(() => {
        // Push new value to BehaviorSubject
        viewBox$.next(viewBox);
    }, [viewBox]);
    
    const centerOn = useCallback((cx, cy) => {
        const { w, h } = pendingViewBoxRef.current;
        const newX = cx - w / 2;
        const newY = cy - h / 2;
        scheduleViewBoxUpdate({ x: newX, y: newY, w, h });
    }, [scheduleViewBoxUpdate]);
    
    // Subscribe to any external "center" calls
    useZoomPanSubscriber(centerOn);

    const onWheel = (e) => {
        const { x, y, w, h } = pendingViewBoxRef.current;
        const svgRect = svgRef.current.getBoundingClientRect();
        const offsetX = e.clientX - svgRect.left;
        const offsetY = e.clientY - svgRect.top;
        
        // mouse position in svg coordinates
        const mx = (offsetX / svgRect.width) * w + x;
        const my = (offsetY / svgRect.height) * h + y;
        
        // zoom factor
        const scale = 1.0 + e.deltaY * Constants.map.zoomSensitivity;
        const newW = w * scale;
        const newH = h * scale;
        
        // adjust x,y so zoom centers at mouse
        const newX = mx - (offsetX / svgRect.width) * newW;
        const newY = my - (offsetY / svgRect.height) * newH;
        scheduleViewBoxUpdate({ x: newX, y: newY, w: newW, h: newH });
    };
    
    const onMouseDown = (e) => {
        e.preventDefault();
        isPanning.current = true;
        panStart.current = { x: e.clientX, y: e.clientY };
        vbStart.current = pendingViewBoxRef.current;
    };

    const onMouseMove = (e) => {
        if (!isPanning.current) return;
        e.preventDefault();
        const dx = ((e.clientX - panStart.current.x) / svgRef.current.clientWidth) * vbStart.current.w;
        const dy = ((e.clientY - panStart.current.y) / svgRef.current.clientHeight) * vbStart.current.h;

        scheduleViewBoxUpdate({
            x: vbStart.current.x - dx,
            y: vbStart.current.y - dy,
            w: vbStart.current.w,
            h: vbStart.current.h,
        });
    };

    const onMouseUp = () => {
        isPanning.current = false;
    };
    
    return (
        <div className="zoom-pan-wrapper" ref={wrapperRef}>
            <svg
                ref={svgRef}
                viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
                onWheel={onWheel}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
            >
                {children}
            </svg>
        </div>
    );
}
