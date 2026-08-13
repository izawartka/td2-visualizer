import { createContext, useState } from 'react';

const SideMenuContext = createContext();
export default SideMenuContext;

export const SideMenuContextProvider = ({children}) => {
    const [sideMenuOpen, setSideMenuOpen] = useState(false);

    return (
        <SideMenuContext.Provider value={{
            sideMenuOpen, setSideMenuOpen
        }}>
            { children }
        </SideMenuContext.Provider>
    );
}
