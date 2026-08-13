import { createContext, useState } from 'react';

const DistanceMeterContext = createContext();
export default DistanceMeterContext;

export const DistanceMeterContextProvider = ({children}) => {
    const [distancePoints, setDistancePoints] = useState([]);

    return (
        <DistanceMeterContext.Provider value={{
            distancePoints, setDistancePoints
        }}>
            { children }
        </DistanceMeterContext.Provider>
    );
}
