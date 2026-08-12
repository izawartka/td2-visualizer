import { useState, useCallback, useEffect, useRef } from 'react';
import SceneryContext from '../contexts/SceneryContext';
import { useZoomPanEmitter } from '../hooks/useZoomPubSub';
import SceneryParser from '../model/parsing/scenery-parser';
import SceneryParserLog from '../model/parsing/scenery-parser-log';
import { showCustomDialog, showDialog } from '../services/dialogService';
import { resetHoveredTracksStack } from '../services/trackHoverInfoService';
import SceneryLoadedDialog from './scenery-loaded-dialog/SceneryLoadedDialog';
import Constants from '../helpers/constants';
import MiscHelper from '../helpers/miscHelper';
import ElectrificationResolver from '../model/parsing/electrification-resolver';
import { useEmbeddedContext } from '../contexts/EmbeddedContext';

export default function SceneryManager(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [scenery, setScenery] = useState(null);
    const [sceneryListData, setSceneryListData] = useState(null);
    const urlParamsLoaded = useRef(false);
    const { setCamera } = useZoomPanEmitter();
    const { isEmbedded } = useEmbeddedContext();

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

    const updateViewAfterSceneryLoaded = useCallback((scenery) => {
        const targetZoom = isEmbedded ? Constants.map.zoomDefaultEmbedded : Constants.map.zoomDefault;
        const mainSignalBox = scenery.getMainSignalBox();
        if(mainSignalBox) {
            const sbPos = mainSignalBox.pos.toSVGCoords();
            const sbRot = -mainSignalBox.getFinalRotation();
            setCamera(...sbPos, sbRot, targetZoom);
        }
        else setCamera(0, 0, 0, targetZoom);
    }, [setCamera, isEmbedded]);

    const loadCustomScenery = useCallback((file) => {
        return new Promise((resolve, reject) => {
            let alreadyLoading;
            setIsLoading(oldIsLoading => {
                alreadyLoading = oldIsLoading;
                return true;
            });
            if (alreadyLoading) {
                console.warn("Already loading a scenery, ignoring new load request.");
                return resolve(null);
            }
            
            resetHoveredTracksStack();
            setScenery(null);
            SceneryParserLog.clear();

            if (!isEmbedded) {
                const urlParams = new URLSearchParams(window.location.search);
                urlParams.delete('scenery');
                urlParams.delete('pos');
                window.history.replaceState({}, '', urlParams.size  ? `${window.location.pathname}?${urlParams.toString()}` : window.location.pathname);
            }

            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                let scenery = null;
                let loadingError = null;
                try {
                    scenery = SceneryParser.fromText(e.target?.result);
                    updateViewAfterSceneryLoaded(scenery);
                } catch (error) {
                    scenery = null;
                    loadingError = error;
                    console.error(error);
                } 

                if (isEmbedded && loadingError) {
                    showDialog('Failed to load scenery');
                } else if (!isEmbedded) {
                    showCustomDialog(<SceneryLoadedDialog loadingError={loadingError} />);
                }
                setScenery(scenery);
                setIsLoading(false);
                resolve(scenery);
            }
        });
    }, [updateViewAfterSceneryLoaded, isEmbedded]);

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

    const findSceneryInList = useCallback((query) => {
        if (!sceneryListData?.list || !Array.isArray(sceneryListData.list)) return null;

        const liteCandidates = sceneryListData.list.filter(name => name === `${query}.lite.sc`);
        if (liteCandidates.length > 0) return liteCandidates[0];

        const scCandidates = sceneryListData.list.filter(name => name === `${query}.sc`);
        if (scCandidates.length > 0) return scCandidates[0];

        const candidates = sceneryListData.list.filter(name => name === query);
        if(candidates.length > 0) return candidates[0];

        return null;
    }, [sceneryListData]);

    const checkLoadUrlScenery = useCallback(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const sceneryQuery = urlParams.get('scenery');
        if (!sceneryQuery) return;
        const sceneryName = findSceneryInList(sceneryQuery);
        if (!sceneryName) {
            console.warn(`Scenery "${sceneryQuery}" not found in the list.`);
            showDialog(`Scenery "${sceneryQuery}" not found in the list.`);
            return;
        }

        await loadScenery(sceneryName);

        const posQuery = urlParams.get('pos');
        const pos = MiscHelper.parsePosQuery(posQuery);
        if(!posQuery) return;
        if (!pos) {
            console.warn(`Invalid position query "${posQuery}"`);
            showDialog("Invalid position query in URL.");
            return;
        }

        setCamera(pos.x, -pos.z, 0, 0);
    }, [findSceneryInList, loadScenery, setCamera]);

    const electrificationStepModeStep = useCallback(() => {
        ElectrificationResolver.stepModeStep();
        setScenery((oldScenery) => {
            if (!oldScenery) return null;
            return { ...oldScenery };
        });
    }, [setScenery]);

    useEffect(() => {
        if(!Constants.sceneryFiles.enableBuiltIn) return;
        updateSceneryList();
    }, [updateSceneryList]);

    useEffect(() => {
        if (!urlParamsLoaded.current) {
            if (!sceneryListData) return;
            urlParamsLoaded.current = true;
            checkLoadUrlScenery();
        }
    }, [checkLoadUrlScenery, sceneryListData, urlParamsLoaded]);

    return (
        <SceneryContext.Provider value={{ isLoading, scenery, sceneryListData, loadScenery, loadCustomScenery, electrificationStepModeStep }}>
            {props.children}
        </SceneryContext.Provider>
    );
}