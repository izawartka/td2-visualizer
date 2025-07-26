import { useContext } from 'react';
import { ReactSVG } from "react-svg";
import SideMenuContext from '../../contexts/SideMenuContext';

export default function SideMenuToggle() {
    const { setSideMenuOpen } = useContext(SideMenuContext);

    const toggleSideMenu = () => {
        setSideMenuOpen((prev) => !prev);
    }

    return (
        <div className='side-menu-toggle'>
            <button onClick={toggleSideMenu} className='invis-button'>
                <ReactSVG
                    src={`${process.env.PUBLIC_URL}/assets/side-menu.svg`}
                />
            </button>
        </div>
    );
}