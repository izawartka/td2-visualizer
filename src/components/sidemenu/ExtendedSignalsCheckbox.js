import { useContext } from "react";
import SettingsContext from "../../contexts/SettingsContext";

export default function ExtendedSignalsCheckbox(props) {
    const { extendedSignals, setExtendedSignals, layers } = useContext(SettingsContext);

    const handleChange = (event) => {
        setExtendedSignals(event.target.checked);
    };

    let divClass = 'extended-signals-checkbox';
    if(!layers['signals']) divClass += ' hidden';

    return (
        <div className={divClass}>
            <label>
                <input
                    type="checkbox"
                    checked={extendedSignals}
                    onChange={handleChange}
                />
                Extended signal rendering
            </label>
        </div>
    );
}
