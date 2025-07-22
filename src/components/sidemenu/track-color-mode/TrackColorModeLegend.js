import Constants from "../../../helpers/constants";
import {useContext} from "react";
import GradientsContext from "../../../contexts/GradientsContext";
import MiscHelper from "../../../helpers/miscHelper";

export default function TrackColorModeLegend(props) {
    const { trackColorMode } = props;
    const colorModeDef = Constants.trackColorModes[trackColorMode] || null;

    return (
        <div className="track-color-mode-legend">
            <LegendGradient trackColorMode={trackColorMode} />
            <LegendOptions colorModeDef={colorModeDef} />
        </div>
    );
}

function LegendOptions(props) {
    const { colorModeDef } = props;
    if (!colorModeDef?.options) return null;

    return (
        <div className="options">
            <ul>
                { Object.entries(colorModeDef.options).map(([key, optionDef]) => (
                    <LegendOptionsItem key={key} optionDef={optionDef} />
                ))}
            </ul>
        </div>
    );
}

function LegendOptionsItem(props) {
    const { optionDef } = props;
    return (
        <li>
            <span className="color-box" style={{ backgroundColor: optionDef[0] }}></span>
            <span className="option-label">{optionDef[1]}</span>
        </li>
    );
}

function LegendGradient(props) {
    const { gradientDefs } = useContext(GradientsContext);
    const { trackColorMode } = props;
    const gradientDef = gradientDefs[trackColorMode];
    if (!gradientDef) return null;

    const from = MiscHelper.getTrackGradientColor(gradientDef, gradientDef.legendMin);
    const to = MiscHelper.getTrackGradientColor(gradientDef, gradientDef.legendMax);
    const gradientStyle = `linear-gradient(to right, ${from}, ${to})`;

    const midVal = (gradientDef.legendMin + gradientDef.legendMax) / 2;

    return (
        <div className="gradient">
            <div className="gradient-bar" style={{ background: gradientStyle}}></div>
            <div className="gradient-labels">
                <span className="gradient-label">{gradientDef.legendMin} {gradientDef.unit}</span>
                <span className="gradient-label">{midVal} {gradientDef.unit}</span>
                <span className="gradient-label">{gradientDef.legendMax} {gradientDef.unit}</span>
            </div>
        </div>
    );
}
