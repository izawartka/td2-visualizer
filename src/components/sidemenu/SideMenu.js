import {useContext} from 'react';
import MainContext from '../../contexts/MainContext';
import './SideMenu.css';
import LayersMenu from './LayersMenu';
import ShowTrackHoverInfoCheckbox from './ShowTrackHoverInfoCheckbox';
import TrackColorMode from './track-color-mode/TrackColorMode';
import SceneryInfoButton from './SceneryInfoButton';
import DistanceMeterButton from './DistanceMeterButton';
import InfoFooter from './InfoFooter';

export default function SideMenu() {
    const { sideMenuOpen } = useContext(MainContext);

    const sideMenuClass = sideMenuOpen ? 'side-menu' : 'side-menu closed';

    return (
        <div className='side-menu-wrapper'>
            <div className={sideMenuClass}>
                <SceneryInfoButton />
                <DistanceMeterButton />
                <LayersMenu />
                <ShowTrackHoverInfoCheckbox />
                <TrackColorMode />
                <InfoFooter />
            </div>
        </div>
    );
}