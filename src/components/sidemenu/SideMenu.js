import {useContext} from 'react';
import MainContext from '../../contexts/MainContext';
import './SideMenu.css';
import LayersMenu from './LayersMenu';
import SelTrackColorMode from './SelTrackColorMode';
import SceneryInfoButton from './SceneryInfoButton';

export default function SideMenu() {
    const { sideMenuOpen } = useContext(MainContext);

    const sideMenuClass = sideMenuOpen ? 'side-menu' : 'side-menu closed';

    return (
        <div className='side-menu-wrapper'>
            <div className={sideMenuClass}>
                <SceneryInfoButton />
                <LayersMenu />
                <SelTrackColorMode />
            </div>
        </div>
    );
}