import { useContext, useMemo } from 'react';
import './LocList.css';
import MainContext from '../../contexts/MainContext';
import ClickableLocation from './ClickableLocation';

export default function LocList(props) {
    const { scenery } = useContext(MainContext);

    const signalBoxes = useMemo(() => {
        if (!scenery?.signalBoxes) return null;
        return scenery.signalBoxes.map(signalBox => {
            const pos = signalBox.pos.toSVGCoords();
            const rot = -signalBox.getFinalRotation();
            const name = signalBox.getPrintableSignalBoxName();
            return (
                <ClickableLocation name={name} pos={pos} rot={rot} key={signalBox.id} />
            );
        });
    }, [scenery?.signalBoxes]);

    const spawnPoints = useMemo(() => {
        if (!scenery?.spawnPoints) return null;
        return scenery.spawnPoints.map(trackObject => {
            const pos = trackObject.pos.toSVGCoords();
            const isSignal = trackObject.type === 'Signal';
            const name = trackObject.spawn_info.name || (isSignal ? trackObject.getPrintableSignalName() : trackObject.getPrintableSpawnPointName());
            return (
                <ClickableLocation name={name} pos={pos} key={trackObject.id} />
            )
        });
    }, [scenery?.spawnPoints]);

    return (
        <div className="loclist">
            <div className="loclist-section">
                { signalBoxes }
            </div>
            <div className="loclist-section">
                { spawnPoints }
            </div>
        </div>
    );
}