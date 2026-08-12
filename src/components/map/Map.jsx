import ZoomPanWrapper from './ZoomPanWrapper';
import './Map.css';
import SceneryRoot from './SceneryRoot';
import DistanceMeter from './distance-meter/DistanceMeter';
import TrackHoverInfo from './track-hover-info/TrackHoverInfo';

export default function Map(props) {
    return (
        <div className='map'>
            <ZoomPanWrapper>
                <SceneryRoot />
                <DistanceMeter />
            </ZoomPanWrapper>
            <TrackHoverInfo />
        </div>
    )
}