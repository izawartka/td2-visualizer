import { useContext } from "react";
import SettingsContext from "../../contexts/SettingsContext";
import Constants from "../../helpers/constants";

export default function SelTrackColorMode(props) {
    const { trackColorMode, setTrackColorMode } = useContext(SettingsContext);

    const handleColorModeChange = (event) => {
        setTrackColorMode(event.target.value);
    };

    return (
        <div className="track-color-mode-select">
            <label htmlFor="track-color-mode">Track Color Mode:</label>
            <select
                id="track-color-mode"
                value={trackColorMode}
                onChange={handleColorModeChange}
            >
                {Constants.trackColorModes.map((mode) => (
                    <option key={mode.id} value={mode.id}>
                        {mode.name}
                    </option>
                ))}
            </select>
        </div>
    );
}