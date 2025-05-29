import { useContext } from "react";
import SettingsContext from "../../contexts/SettingsContext";
import Constants from "../../helpers/constants";

export default function LayersMenu(props) {
    const { layers, setLayers } = useContext(SettingsContext);

    const toggleLayer = (layer) => {
        setLayers((prevLayers) => ({
            ...prevLayers,
            [layer]: !prevLayers[layer]
        }));
    };

    return (
        <div className="layers-menu">
            <h3>Layers</h3>
            <ul>
                { Constants.layers.map((layer) => (
                    <li key={layer.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={layers[layer.id] || false}
                                onChange={() => toggleLayer(layer.id)}
                            />
                            {layer.name}
                        </label>
                    </li>
                )) }
            </ul>
        </div>
    );
}