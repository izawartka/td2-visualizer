import { useZoomPanEmitter } from '../../hooks/useZoomPubSub';

export default function ClickableLocation(props) {
    const { name, pos } = props;
    const { center } = useZoomPanEmitter();

    const handleClick = () => {
        center(pos[0], pos[1]);
    };

    return (
        <button className="clickable-location" onClick={handleClick}>
            <span className="location-name">{name}</span>
        </button>
    );
}