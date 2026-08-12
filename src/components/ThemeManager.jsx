import { useState } from "react";
import ThemeContext from "../contexts/ThemeContext";

export default function ThemeManager(props) {
    const [ lightMode, setLightMode ] = useState(false);

    if(lightMode === true) {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }

    return (
        <ThemeContext.Provider value={{
            lightMode, setLightMode
        }}>
            { props.children }
        </ThemeContext.Provider>
    );
}
