import { useContext } from "react";
import SettingsContext from "../../contexts/SettingsContext";

export default function ShowTrackHoverInfoCheckbox(props) {
    const { showTrackHoverInfo, setShowTrackHoverInfo, layers } = useContext(SettingsContext);

    const handleChange = (event) => {
        setShowTrackHoverInfo(event.target.checked);
    };

    let divClass = 'show-track-hover-info-checkbox';
    if(!layers['tracks']) divClass += ' hidden';

    return (
        <div className={divClass}>
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
