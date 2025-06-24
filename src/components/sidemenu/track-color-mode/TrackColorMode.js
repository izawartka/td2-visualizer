import { useContext } from "react";
import TrackColorModeSelect from "./TrackColorModeSelect";
import TrackColorModeLegend from "./TrackColorModeLegend";
import SettingsContext from "../../../contexts/SettingsContext";
import './TrackColorMode.css';

export default function TrackColorMode() {
    const { trackColorMode, setTrackColorMode } = useContext(SettingsContext);

    return (
        <div className="track-color-mode">
            <TrackColorModeSelect trackColorMode={trackColorMode} setTrackColorMode={setTrackColorMode} />
            <TrackColorModeLegend trackColorMode={trackColorMode} />
        </div>
    );
}
