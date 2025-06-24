import Constants from "../../../helpers/constants";

export default function TrackColorModeSelect(props) {
    const { trackColorMode, setTrackColorMode } = props;

    const handleColorModeChange = (event) => {
        setTrackColorMode(event.target.value);
    };

    return (
        <div className="track-color-mode-select  side-menu-select">
            <label htmlFor="track-color-mode">Track Color Mode:</label>
            <select
                id="track-color-mode"
                value={trackColorMode}
                onChange={handleColorModeChange}
            >
                { Object.entries(Constants.trackColorModes).map(([id, modeDef]) => (
                    <option key={id} value={id}>
                        {modeDef.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
