import { useState, useCallback, useEffect } from 'react';
import SceneryContext from '../contexts/SceneryContext';
import { useZoomPanEmitter } from '../hooks/useZoomPubSub';
import SceneryParser from '../model/scenery-parser';
import SceneryParserLog from '../model/scenery-parser-log';
import { showCustomDialog, showDialog } from '../services/dialogService';
import { resetHoveredTracksStack } from '../services/trackHoverInfoService';
import SceneryLoadedDialog from './scenery-loaded-dialog/SceneryLoadedDialog';
import Constants from '../helpers/constants';

export default function SceneryManager(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [scenery, setScenery] = useState(null);
    const [sceneryListData, setSceneryListData] = useState(null);
    const { setCamera } = useZoomPanEmitter();

    const myFetch = useCallback(async (url, toJson) => {
        const response = await fetch(url);
            
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return toJson ? await response.json() : await response.blob();
    }, []);

    const updateSceneryList = useCallback(async () => {
        try {
            const url = Constants.sceneryFiles.fetchListUrl;
            const listData = await myFetch(url, true);
            setSceneryListData(listData || null);
        } catch(error) {
            console.error(`Failed to fetch scenery list`, error);
            setSceneryListData(null);
        }
    }, [myFetch]);

    const loadCustomScenery = useCallback((file) => {
        return new Promise((resolve, reject) => {
            setIsLoading(true);
            resetHoveredTracksStack();
            setScenery(null);
            SceneryParserLog.clear();
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                let scenery = null;
                let loadingError = null;
                try {
                    scenery = SceneryParser.fromText(e.target?.result);
                    const mainSignalBox = scenery.signalBoxes?.[0];
                    if(mainSignalBox) {
                        const sbPos = mainSignalBox.pos.toSVGCoords();
                        const sbRot = -mainSignalBox.getFinalRotation();
                        setCamera(...sbPos, sbRot, Constants.map.zoomDefault);
                    }
                    else setCamera(0, 0, 0, Constants.map.zoomDefault);
                } catch (error) {
                    scenery = null;
                    loadingError = error;
                    console.error(error);
                } 

                showCustomDialog(<SceneryLoadedDialog loadingError={loadingError} />);
                setScenery(scenery);
                setIsLoading(false);
                resolve(scenery);
            }
        });
    }, [setCamera]);

    const loadScenery = useCallback(async (sceneryName) => {
        let file;
        try {
            const url = `${Constants.sceneryFiles.fetchBaseUrl}/${sceneryName}`;
            file = await myFetch(url, false);
        } catch (error) {
            console.error(`Failed to load scenery file ${sceneryName}`, error);
            showDialog(<>
                Failed to download scenery file<br />
                {error.message}
            </>);
            return null;
        }

        return await loadCustomScenery(file);
    }, [myFetch, loadCustomScenery]);

    useEffect(() => {
        if(!Constants.sceneryFiles.fetchDisable) updateSceneryList();
    }, [updateSceneryList]);

    return (
        <SceneryContext.Provider value={{ isLoading, scenery, sceneryListData, loadScenery, loadCustomScenery }}>
            {props.children}
        </SceneryContext.Provider>
    );
}