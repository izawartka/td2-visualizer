import { useContext } from "react";
import SettingsContext from "../../contexts/SettingsContext";

export default function OriginalSignalNamesCheckbox(props) {
    const { originalSignalNames, setOriginalSignalNames, layers } = useContext(SettingsContext);

    const handleChange = (event) => {
        setOriginalSignalNames(event.target.checked);
    };

    let divClass = 'original-signal-names-checkbox';
    if (!layers['signals']) divClass += ' hidden';

    return (
        <div className={divClass}>
            <label>
                <input
                    type="checkbox"
                    checked={originalSignalNames}
                    onChange={handleChange}
                />
                Original signal names
            </label>
        </div>
    );
}
