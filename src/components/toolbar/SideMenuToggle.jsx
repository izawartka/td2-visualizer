import { useContext } from 'react';
import SideMenuContext from '../../contexts/SideMenuContext';
import { SideMenuIcon } from '../../icons';

export default function SideMenuToggle() {
    const { setSideMenuOpen } = useContext(SideMenuContext);

    const toggleSideMenu = () => {
        setSideMenuOpen((prev) => !prev);
    }

    return (
        <div className='side-menu-toggle'>
            <button onClick={toggleSideMenu} className='invis-button'>
                <SideMenuIcon />
            </button>
        </div>
    );
}