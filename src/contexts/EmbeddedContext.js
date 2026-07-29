import { createContext, useContext } from 'react';

const EmbeddedContext = createContext();

export const EmbeddedContextProvider = ({ children }) => {
    const urlParams = new URLSearchParams(window.location.search);
    const isEmbedded = urlParams.get('embedded') === 'true';

    return (
        <EmbeddedContext.Provider value={{ isEmbedded }}>
            {children}
        </EmbeddedContext.Provider>
    );
}

export const useEmbeddedContext = () => {
    const context = useContext(EmbeddedContext);
    if (context === undefined) {
        throw new Error('useEmbeddedContext must be used within an EmbeddedContextProvider');
    }

    return context;
}
