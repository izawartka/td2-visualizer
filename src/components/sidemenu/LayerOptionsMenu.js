import ShowTrackHoverInfoCheckbox from "./ShowTrackHoverInfoCheckbox";
import TrackColorMode from "./track-color-mode/TrackColorMode";

export default function LayerOptionsMenu() {
    return (
        <div className="layer-options-menu">
            <h3>Layer options</h3>
            <ShowTrackHoverInfoCheckbox />
            <TrackColorMode />
        </div>
    );
}
