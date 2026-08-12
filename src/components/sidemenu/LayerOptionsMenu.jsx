import ExtendedSignalsCheckbox from "./ExtendedSignalsCheckbox";
import OriginalSignalNamesCheckbox from "./OriginalSignalNamesCheckbox";
import ShowTrackHoverInfoCheckbox from "./ShowTrackHoverInfoCheckbox";
import TrackColorMode from "./track-color-mode/TrackColorMode";

export default function LayerOptionsMenu() {
    return (
        <div className="layer-options-menu">
            <h3>Layer options</h3>
            <div className="layer-options-menu-checkboxes">
                <ShowTrackHoverInfoCheckbox />
                <ExtendedSignalsCheckbox />
                <OriginalSignalNamesCheckbox />
            </div>
            <TrackColorMode />
        </div>
    );
}
