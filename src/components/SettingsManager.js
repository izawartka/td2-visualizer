import { useCallback, useEffect, useState } from "react";
import SettingsContext from "../contexts/SettingsContext";
import Constants from "../helpers/constants";

export default function SettingsManager(props) {
    const [ layers, setLayers ] = useState([]);
    const [ settingsLoaded, setSettingsLoaded ] = useState(false);

    const loadLayersSettings = useCallback(() => {
        setLayers(Constants.layers.filter(layer => layer.default === true).map(layer => layer.id).reduce((acc, layerId) => {
            acc[layerId] = true;
            return acc;
        }, {}));
    }, [setLayers]);

    useEffect(() => {
        loadLayersSettings();
        setSettingsLoaded(true);
    }, [loadLayersSettings]);

    if (!settingsLoaded) return null;

    return (
        <SettingsContext.Provider value={{
            layers, setLayers
        }}>
            { props.children }
        </SettingsContext.Provider>
    );
}