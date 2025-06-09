import { useContext } from 'react';
import MainContext from '../../contexts/MainContext';
import { ReactSVG } from "react-svg";

export default function SideMenuToggle() {
    const { setSideMenuOpen } = useContext(MainContext);

    const toggleSideMenu = () => {
        setSideMenuOpen((prev) => !prev);
    }

    return (
        <div className='side-menu-toggle'>
            <button onClick={toggleSideMenu} className='invis-button'>
                <ReactSVG
                    src="/assets/side-menu.svg"
                />
            </button>
        </div>
    );
}