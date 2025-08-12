import { ReactSVG } from 'react-svg'
import AlwaysUpText from '../text/AlwaysUpText';

export default function SpawnPointRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();

    return (
        <g transform={`translate(${x}, ${y}) rotate(${object.rot.y})`}>
            <g className="map-icon" transform={`rotate(180) translate(-2.835, -2.835)`}>
                <ReactSVG
                    src={`${process.env.PUBLIC_URL}/assets/spawn.svg`}
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
                offsetY={3}
                reverseAnchor={true}
                text={object.getPrintableSpawnPointName()}
            />
        </g>
    );
}
