import { useZoomPanEmitter } from '../../hooks/useZoomPubSub';

export default function ClickableLocation(props) {
    const { name, pos, rot } = props;
    const { setCamera } = useZoomPanEmitter();

    const handleClick = () => {
        setCamera(pos[0], pos[1], rot);
    };

    return (
        <button className="clickable-location non-transparent" onClick={handleClick}>
            <span className="location-name">{name}</span>
        </button>
    );
}