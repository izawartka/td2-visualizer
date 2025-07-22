import { useState } from 'react';
import Map from './map/Map';
import Toolbar from './toolbar/Toolbar';
import MainContext from '../contexts/MainContext';
import './App.css';
import SideMenu from './sidemenu/SideMenu';
import SettingsManager from './SettingsManager';
import LocList from './loclist/LocList';
import DialogManager from './dialog/DialogManager';
import DistanceMeterContext from '../contexts/DistanceMeterContext';
import {GradientsManager} from "./GradientsManager";

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [scenery, setScenery] = useState(null);
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const [distancePoints, setDistancePoints] = useState(null);

    return (
        <SettingsManager>
        <GradientsManager scenery={scenery}>
            <DistanceMeterContext.Provider value={{distancePoints, setDistancePoints}}>
            <MainContext.Provider value={{
                scenery, setScenery,
                isLoading, setIsLoading,
                sideMenuOpen, setSideMenuOpen,
            }}>
                <div className="App">
                    <Toolbar />
                    <div className='side-menu-split'>
                        <Map />
                        <SideMenu />
                    </div>
                    <LocList />
                    <DialogManager />
                </div>
            </MainContext.Provider>
            </DistanceMeterContext.Provider>
        </GradientsManager>
        </SettingsManager>
    );
}

export default App;
