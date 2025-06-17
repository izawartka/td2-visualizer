import { useContext, useEffect } from "react";
import MainContext from "../../contexts/MainContext";
import DistanceMeterContext from "../../contexts/DistanceMeterContext";

export default function DistanceMeterButton(props) {
    const { distancePoints, setDistancePoints } = useContext(DistanceMeterContext);
    const { scenery } = useContext(MainContext);

    const onButtonClick = (event) => {
        setDistancePoints(oldDistancePoints => {
            if(oldDistancePoints !== null) {
                // Reset distance points
                return null; 
            } else if(scenery) {
                // Start measuring distance
                return [];
            }
        });
    };

    useEffect(() => {
        // Reset distance points when scenery changes
        setDistancePoints(null);
    }, [scenery, setDistancePoints]);

    const isPressed = distancePoints !== null;
    const isDisabled = !scenery && !isPressed;

    return (
        <div className="distance-meter-button">
            <button 
                onClick={onButtonClick}
                className={isPressed ? "pressed" : ""}
                disabled={isDisabled}
            >
                {isPressed ? "Stop measuring" : "Measure distance"}
            </button>
        </div>
    );
}
