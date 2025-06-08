import { useCallback, useContext, useMemo } from "react";
import SettingsContext from "../../contexts/SettingsContext";
import Constants from "../../helpers/constants";

export default function LayersMenu(props) {
    const { layers, setLayers } = useContext(SettingsContext);

    const toggleLayer = useCallback((layer) => {
        setLayers((prevLayers) => ({
            ...prevLayers,
            [layer]: !prevLayers[layer]
        }));
    }, [setLayers]);

    const LayersList = useMemo(() => {
        return Constants.layers.map((layer) => (
            <LayersMenuItem
                key={layer.id}
                layer={layer}
                isChecked={layers[layer.id] ?? layer.default}
                onToggle={toggleLayer}
            />
        ));
    }, [layers, toggleLayer]);

    return (
        <div className="layers-menu">
            <h3>Layers</h3>
            <ul>
                { LayersList }
            </ul>
        </div>
    );
}

function LayersMenuItem(props) {
    const { layer, isChecked, onToggle } = props;

    return (
        <li>
            <label>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggle(layer.id)}
                />
                {layer.name}
            </label>
        </li>
    );
}