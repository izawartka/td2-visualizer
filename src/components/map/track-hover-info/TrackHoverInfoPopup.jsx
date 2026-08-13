import { TrackShape } from "../../../model/tracks/track";
import TrackHoverInfoPopupTable from "./TrackHoverInfoTable";

export default function TrackHoverInfoPopup({track}) {
    const showAlignHint = track.shape === TrackShape.STRAIGHT;

    return (
        <div className="track-hover-info-popup">
            <TrackHoverInfoPopupTable track={track} />
            {showAlignHint && (
                <div className="track-hover-info-popup__align">
                    Double click to align the view
                </div>
            )}
        </div>
    );
}
