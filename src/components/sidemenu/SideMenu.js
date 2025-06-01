import {useContext} from 'react';
import MainContext from '../../contexts/MainContext';
import './SideMenu.css';
import LayersMenu from './LayersMenu';
import SelTrackColorMode from './SelTrackColorMode';

export default function SideMenu() {
    const { sideMenuOpen } = useContext(MainContext);

    if (!sideMenuOpen) {
        return null;
    }

    return (
        <div className='side-menu-wrapper'>
            <div className='side-menu'>
                <LayersMenu />
                <SelTrackColorMode />
            </div>
        </div>
    );
}