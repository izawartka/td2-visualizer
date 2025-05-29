import { useContext, useMemo } from 'react';
import MainContext from '../../contexts/MainContext';
import ZoomPanWrapper from './ZoomPanWrapper';
import './Map.css';
import SceneryRoot from './SceneryRoot';

export default function Map(props) {
    const {scenery} = useContext(MainContext);

    const sceneryRoot = useMemo(() => {
        if (!scenery) return null;
        const bounds = scenery.getBounds();
        const width = (bounds.maxX - bounds.minX);
        const height = (bounds.maxZ - bounds.minZ);

        return (
            <ZoomPanWrapper
                contentWidth={width}
                contentHeight={height}
            >
                <SceneryRoot />
            </ZoomPanWrapper>
        );
    }, [scenery]);

    return (
        <div className='map'>
            {sceneryRoot}
        </div>
    )
}