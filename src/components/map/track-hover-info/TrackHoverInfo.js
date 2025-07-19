import { useState, useEffect, useCallback, useRef, useContext } from "react";
import { hoveredTrack$ } from "../../../services/trackHoverInfoService";
import TrackHoverInfoPopup from "./TrackHoverInfoPopup";
import SettingsContext from "../../../contexts/SettingsContext";
import './TrackHoverInfo.css';

export default function TrackHoverInfo() {
    const { showTrackHoverInfo } = useContext(SettingsContext);

    if (!showTrackHoverInfo) return null;

    return (
        <InnerTrackHoverInfo />
    );
}

function InnerTrackHoverInfo() {
    const [ hoveredTrack, setHoveredTrack ] = useState(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const divRef = useRef(null);

    const handleMouseMove = useCallback((event) => {
        mousePos.current.x = event.clientX;
        mousePos.current.y = event.clientY;

        if (!divRef.current) return;
        divRef.current.style.left = `${mousePos.current.x}px`;
        divRef.current.style.top = `${mousePos.current.y}px`;
    }, [mousePos, divRef]);

    useEffect(() => {
        const subscription = hoveredTrack$.subscribe(date => {
            setHoveredTrack(date);
        });

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            subscription.unsubscribe();
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [handleMouseMove]);

    if (!hoveredTrack) return null;

    const divStyle = {
        left: `${mousePos.current.x}px`,
        top: `${mousePos.current.y}px`,
    };

    return (
        <div className="track-hover-info" ref={divRef} style={divStyle}>
            <TrackHoverInfoPopup track={hoveredTrack} />
        </div>
    );
}
