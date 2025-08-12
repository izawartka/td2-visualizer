import { ReactSVG } from 'react-svg'
import AlwaysUpText from '../text/AlwaysUpText';

export default function DerailerRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();

    let icon_transform = `translate(-2.835, -2.835)`;
    if (object.is_left) {
        icon_transform = 'scale(-1, 1) ' + icon_transform;
    }

    return (
        <g transform={`translate(${x}, ${y}) rotate(${object.rot.y})`}>
            <g className="map-icon" transform={icon_transform}>
                <ReactSVG
                    src={`${process.env.PUBLIC_URL}/assets/derailer.svg`}
                    wrapper='svg'

                    beforeInjection={(svg) => {
                        svg.setAttribute('width', '1.5mm');
                        svg.setAttribute('height', '1.5mm');
                    }}
                />
            </g>
            <AlwaysUpText
                baseRot={object.rot.y}
                additionalRot={-90}
                offsetY={-3}
                text={object.getPrintableDerailerName()}
                
            />
        </g>
    );
}
