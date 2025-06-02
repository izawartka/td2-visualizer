import ZoomPanWrapper from './ZoomPanWrapper';
import './Map.css';
import SceneryRoot from './SceneryRoot';

export default function Map(props) {
    return (
        <div className='map'>
            <ZoomPanWrapper>
                <SceneryRoot />
            </ZoomPanWrapper>
        </div>
    )
}