import { useState, useEffect, useCallback, useRef, useContext, useMemo } from "react";
import { hoveredTrack$, touchClickedTrack$ } from "../../../services/trackHoverInfoService";
import TrackHoverInfoPopup from "./TrackHoverInfoPopup";
import SettingsContext from "../../../contexts/SettingsContext";
import { showDialog } from "../../../services/dialogService";
import './TrackHoverInfo.css';
import TrackHoverInfoPopupTable from "./TrackHoverInfoTable";

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
    const isMobile = useMemo(() => window.matchMedia('(pointer: coarse)').matches, []);

    const handleMouseMove = useCallback((event) => {
        mousePos.current.x = event.clientX;
        mousePos.current.y = event.clientY;

        if (!divRef.current) return;
        divRef.current.style.left = `${mousePos.current.x}px`;
        divRef.current.style.top = `${mousePos.current.y}px`;
    }, []);

    useEffect(() => {
        const hoveredTrackSub = hoveredTrack$.subscribe(track => {
            if (isMobile) return;
            setHoveredTrack(track);
        });

        const touchClickedTrackSub = touchClickedTrack$.subscribe(track => {
            if (!isMobile || !track) return;

            showDialog(
                <TrackHoverInfoPopupTable track={track} />,
                [{ text: 'Close', onClick: () => {}, autoFocus: true, bgClick: true }]
            );
        });

        if (!isMobile) {
            document.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            hoveredTrackSub.unsubscribe();
            touchClickedTrackSub.unsubscribe();
            if (!isMobile) {
                document.removeEventListener('mousemove', handleMouseMove);
            }
        };
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
