import { createContext, useState } from 'react';

const ThemeContext = createContext();
export default ThemeContext;

export const ThemeContextProvider = ({children}) => {
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
            { children }
        </ThemeContext.Provider>
    );
}
