import { useState } from 'react';
import Map from './map/Map';
import Toolbar from './toolbar/Toolbar';
import './App.css';
import SideMenu from './sidemenu/SideMenu';
import SettingsManager from './SettingsManager';
import LocList from './loclist/LocList';
import DialogManager from './dialog/DialogManager';
import DistanceMeterContext from '../contexts/DistanceMeterContext';
import {GradientsManager} from "./GradientsManager";
import SideMenuContext from '../contexts/SideMenuContext';
import SceneryManager from './SceneryManager';

function App() {
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const [distancePoints, setDistancePoints] = useState(null);

    return (
        <SettingsManager>
            <SceneryManager>
                <GradientsManager>
                    <DistanceMeterContext.Provider value={{distancePoints, setDistancePoints}}>
                        <SideMenuContext.Provider value={{sideMenuOpen, setSideMenuOpen}}>
                            <AppContent />
                        </SideMenuContext.Provider>
                    </DistanceMeterContext.Provider>
                </GradientsManager>
            </SceneryManager>
        </SettingsManager>
    );
}

function AppContent() {
    return (
        <div className="App">
            <Toolbar />
            <div className='side-menu-split'>
                <Map />
                <SideMenu />
            </div>
            <LocList />
            <DialogManager />
        </div>
    );
}

export default App;
