import { useState } from 'react';
import Map from './map/Map';
import Toolbar from './toolbar/Toolbar';
import MainContext from '../contexts/MainContext';
import './App.css';
import SideMenu from './sidemenu/SideMenu';
import SettingsManager from './SettingsManager';
import LocList from './loclist/LocList';
import DialogManager from './dialog/DialogManager';

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [scenery, setScenery] = useState(null);
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    
    return (
        <SettingsManager>
            <MainContext.Provider value={{ 
                scenery, setScenery,
                isLoading, setIsLoading,
                sideMenuOpen, setSideMenuOpen
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
        </SettingsManager>
        );
    }
    
    export default App;
    