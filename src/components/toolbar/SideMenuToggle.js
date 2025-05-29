import { useContext } from 'react';
import MainContext from '../../contexts/MainContext';

export default function SideMenuToggle() {
    const { sideMenuOpen, setSideMenuOpen } = useContext(MainContext);

    const toggleSideMenu = () => {
        setSideMenuOpen((prev) => !prev);
    }

    return (
        <div className='side-menu-toggle'>
            <button onClick={toggleSideMenu}>
                {sideMenuOpen ? 'Hide Menu' : 'Show Menu'}
            </button>
        </div>
    );
}