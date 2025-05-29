import React, { useState, useRef } from 'react';
import './ZoomPanWrapper.css';
import Constants from '../../helpers/constants';

export default function ZoomPanWrapper({
    contentWidth = 1000,
    contentHeight = 1000,
    children,
}) {
    const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: contentWidth, h: contentHeight });
    const svgRef = useRef(null);
    const isPanning = useRef(false);
    const panStart = useRef({ x: 0, y: 0 });
    const vbStart = useRef(viewBox);
    
    const onWheel = (e) => {
        const { x, y, w, h } = viewBox;
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
        
        setViewBox({ x: newX, y: newY, w: newW, h: newH });
    };
    
    const onMouseDown = (e) => {
        e.preventDefault();
        isPanning.current = true;
        panStart.current = { x: e.clientX, y: e.clientY };
        vbStart.current = viewBox;
    };

    const onMouseMove = (e) => {
        if (!isPanning.current) return;
        e.preventDefault();
        const dx = ((e.clientX - panStart.current.x) / svgRef.current.clientWidth) * vbStart.current.w;
        const dy = ((e.clientY - panStart.current.y) / svgRef.current.clientHeight) * vbStart.current.h;
        setViewBox({
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
        <div className="zoom-pan-wrapper">
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
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