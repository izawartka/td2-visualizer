import { useContext } from 'react';
import { LightModeIcon, DarkModeIcon } from '../../icons';
import ThemeContext from '../../contexts/ThemeContext';

export default function ThemeToggle() {
    const { setLightMode, lightMode } = useContext(ThemeContext);

    const toggleLightMode = () => {
        setLightMode((prev) => !prev);
    }

    return (
        <div className='theme-toggle'>
            <button onClick={toggleLightMode} className='invis-button'>
                {lightMode ? <LightModeIcon /> : <DarkModeIcon />}
            </button>
        </div>
    );
}