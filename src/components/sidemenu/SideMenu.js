import {useContext} from 'react';
import MainContext from '../../contexts/MainContext';
import './SideMenu.css';
import LayersMenu from './LayersMenu';
import SceneryInfoButton from './SceneryInfoButton';
import DistanceMeterButton from './DistanceMeterButton';
import InfoFooter from './InfoFooter';
import LayerOptionsMenu from './LayerOptionsMenu';

export default function SideMenu() {
    const { sideMenuOpen } = useContext(MainContext);

    const sideMenuClass = sideMenuOpen ? 'side-menu' : 'side-menu closed';

    return (
        <div className='side-menu-wrapper'>
            <div className={sideMenuClass}>
                <SceneryInfoButton />
                <DistanceMeterButton />
                <LayersMenu />
                <LayerOptionsMenu />
                <InfoFooter />
            </div>
        </div>
    );
}