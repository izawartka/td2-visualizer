import { useContext } from "react";
import SettingsContext from "../../contexts/SettingsContext";

export default function ShowTrackHoverInfoCheckbox(props) {
    const { showTrackHoverInfo, setShowTrackHoverInfo } = useContext(SettingsContext);

    const handleChange = (event) => {
        setShowTrackHoverInfo(event.target.checked);
    };

    return (
        <div className="show-track-hover-info-checkbox">
            <label>
                <input
                    type="checkbox"
                    checked={showTrackHoverInfo}
                    onChange={handleChange}
                />
                Show track info on hover
            </label>
        </div>
    );
}
