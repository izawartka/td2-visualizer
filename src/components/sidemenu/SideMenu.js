import {useContext} from 'react';
import './SideMenu.css';
import LayersMenu from './LayersMenu';
import SceneryInfoButton from './SceneryInfoButton';
import DistanceMeterButton from './DistanceMeterButton';
import InfoFooter from './InfoFooter';
import LayerOptionsMenu from './LayerOptionsMenu';
import SideMenuContext from '../../contexts/SideMenuContext';

export default function SideMenu() {
    const { sideMenuOpen } = useContext(SideMenuContext);

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