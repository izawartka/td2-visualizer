import { EmbeddedContextProvider, useEmbeddedContext } from '../contexts/EmbeddedContext';
import { ThemeContextProvider} from '../contexts/ThemeContext';
import { SettingsContextProvider } from '../contexts/SettingsContext';
import { SceneryContextProvider } from '../contexts/SceneryContext';
import { GradientsContextProvider } from '../contexts/GradientsContext';
import { DistanceMeterContextProvider } from '../contexts/DistanceMeterContext';
import { SideMenuContextProvider } from '../contexts/SideMenuContext';
import Map from './map/Map';
import Toolbar from './toolbar/Toolbar';
import SideMenu from './sidemenu/SideMenu';
import LocList from './loclist/LocList';
import DialogManager from './dialog/DialogManager';
import './Themes.css';
import './App.css';

function App() {
    return (
        <EmbeddedContextProvider>
            <ThemeContextProvider>
                <SettingsContextProvider>
                    <SceneryContextProvider>
                        <GradientsContextProvider>
                            <DistanceMeterContextProvider>
                                <SideMenuContextProvider>
                                    <AppContent />
                                </SideMenuContextProvider>
                            </DistanceMeterContextProvider>
                        </GradientsContextProvider>
                    </SceneryContextProvider>
                </SettingsContextProvider>
            </ThemeContextProvider>
        </EmbeddedContextProvider>
    );
}

function AppContent() {
    const { isEmbedded } = useEmbeddedContext();

    return (
        <div className="App">
            <Toolbar />
            <div className='side-menu-split'>
                <Map />
                <SideMenu />
            </div>
            { !isEmbedded && <LocList /> }
            <DialogManager />
        </div>
    );
}

export default App;
