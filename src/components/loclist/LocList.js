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
            const name = signalBox.getPrintableSignalBoxName();
            return (
                <ClickableLocation name={name} pos={pos} key={signalBox.id} />
            );
        });
    }, [scenery?.signalBoxes]);

    const spawnSignals = useMemo(() => {
        if (!scenery?.spawnSignals) return null;
        return scenery.spawnSignals.map(signal => {
            const pos = signal.pos.toSVGCoords();
            const name = signal.spawn_info.name || signal.getPrintableSignalName();
            return (
                <ClickableLocation name={name} pos={pos} key={signal.id} />
            )
        });
    }, [scenery?.spawnSignals]);

    return (
        <div className="loclist">
            <div className="loclist-section">
                { signalBoxes }
            </div>
            <div className="loclist-section">
                { spawnSignals }
            </div>
        </div>
    );
}