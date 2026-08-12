import { useContext } from "react";
import TrackColorModeSelect from "./TrackColorModeSelect";
import TrackColorModeLegend from "./TrackColorModeLegend";
import SettingsContext from "../../../contexts/SettingsContext";
import './TrackColorMode.css';

export default function TrackColorMode() {
    const { layers, trackColorMode, setTrackColorMode } = useContext(SettingsContext);

    let divClass = 'track-color-mode';
    if(!layers['tracks']) divClass += ' hidden';

    return (
        <div className={divClass}>
            <TrackColorModeSelect trackColorMode={trackColorMode} setTrackColorMode={setTrackColorMode} />
            <TrackColorModeLegend trackColorMode={trackColorMode} />
        </div>
    );
}
