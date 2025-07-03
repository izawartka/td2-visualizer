import { ReactSVG } from 'react-svg';
import AngleHelper from '../../../helpers/angleHelper';
import DefinedSignalSigns from '../../../model/defs/defined-signal-signs';
import SignalElementsEnums from '../../../model/signal-elements/enums';

export default function SignalExtendedRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();

    const overheadRot = object.signal_elements.isOverhead() ? 180 : 0;
    const baseRot = object.rot.y;
    const rot = AngleHelper.normalizeDegAngle(overheadRot + baseRot);
    const upsideDown = rot >= 180;
    const upsideDownRot = upsideDown ? 90 : -90;
    const anchor = upsideDown ? "start" : "end";

    return (
        <g className="extended-signal" transform={`translate(${x}, ${y}) rotate(${rot})`}>
            <g className="extended-signal-icon" transform={`rotate(${-overheadRot})`}>
                <SignalIcon object={object} />
            </g>
            <g transform={`translate(0, 1) rotate(${upsideDownRot})`}>
                <text x="0" y="0" textAnchor={anchor} dominantBaseline="middle">
                    {object.getPrintableSignalName()}
                </text>
            </g>
        </g>
    );
}

function SignalIcon(props) {
    const { object } = props;

    const halfBaseWidth = getHalfBaseWidth(object);
    const headOffsetX = getHeadOffsetX(object);
    const polePoints = getPolePoints(object, headOffsetX);
    const headOffsetY = getHeadOffsetY(object, polePoints);

    return (
        <g strokeWidth={0.2} strokeLinecap="round" strokeLinejoin="round">
            { getBase(halfBaseWidth) }
            { getOverheadFrame(object) }
            { getPole(polePoints, headOffsetY, headOffsetX) }
            { getBars(object, polePoints, headOffsetY) }
            { getSigns(object, polePoints, headOffsetY) }
            { getHead(object, headOffsetY, headOffsetX) }
        </g>
    );
}

function getHeadOffsetY(object, polePoints) {
    if(object.signal_elements.isOverhead()) {
        return object.signal_elements.units.length * 1.2 + 0.1;
    }

    return -polePoints?.end || 0;
}

function getHalfBaseWidth(object) {
    const isDwarf = object.signal_elements.type === SignalElementsEnums.Type.DWARF;
    const isDoubleDwarf = object.signal_elements.type === SignalElementsEnums.Type.DWARF_DOUBLE;

    if(object.signal_elements.isOverhead()) return 0;
    if(isDwarf) return 0.6;
    if(isDoubleDwarf) return 1.2;

    return 0.4536;
}

function getBase(halfBaseWidth) {
    if(halfBaseWidth === 0) return null;
    return <path d={`M ${-halfBaseWidth} 0 L ${halfBaseWidth} 0`} />;
}

function getOverheadFrame(object) {
    if(!object.signal_elements.isOverhead()) return null;

    return <path d={`M -1 0 L 1 0 M -1 -.5 L -1 .5 M 1 -.5 L 1 .5`} />;
}

function getHeadOffsetX(object) {
    const isTOP = object.signal_elements.type === SignalElementsEnums.Type.TOP;
    if(isTOP) return 0;

    const headPos = object.signal_elements.headPosition;

    switch (headPos) {
        case SignalElementsEnums.HeadPosition.STANDARD:
        case SignalElementsEnums.HeadPosition.UNKNOWN:
        case SignalElementsEnums.HeadPosition.DWARF:
        default:
            return 0;    
        case SignalElementsEnums.HeadPosition.LEFT:
            return -0.4536;
        case SignalElementsEnums.HeadPosition.RIGHT:
            return 0.4536;    
    }
}

function getPolePoints(object, headOffsetX) {
    const isDwarf = object.signal_elements.isDwarf();
    if(isDwarf) return null;

    const isOverhead = object.signal_elements.isOverhead();
    const isMechanical = object.signal_elements.isMechanical();

    const polePoints = {};
    polePoints.zigzag = headOffsetX !== 0 ? 0.4 : 0;
    if(isMechanical) polePoints.zigzag += 3.5;
    polePoints.bars = polePoints.zigzag;

    switch(object.signal_elements.bar) {
        case SignalElementsEnums.BarType.YELLOW:
        case SignalElementsEnums.BarType.GREEN:
            polePoints.bars += 0.8;
            break;
        case SignalElementsEnums.BarType.YELLOW_GREEN:
            polePoints.bars += 1.6;
            break;
        default:
            break;
    }

    const signsHeight = Object.keys(object.signal_elements.signs).map(key => (DefinedSignalSigns[key]?.height || 1.0) + 0.2).reduce((a, b) => a + b, 0) || 0;
    polePoints.signs = polePoints.bars + signsHeight;
    polePoints.end = polePoints.signs;
    if(isMechanical) polePoints.end = Math.max(polePoints.end + 0.8, 6.0);
    else if(!isOverhead) polePoints.end = Math.max(polePoints.signs + 0.8, 2.2);

    return polePoints;
}

function getPole(polePoints, headOffsetY, headOffsetX) {
    if(!polePoints) return null;

    if(headOffsetX) {
        return <path d={`M 0 ${headOffsetY+polePoints.end} L 0 ${headOffsetY+polePoints.zigzag} L ${headOffsetX} ${headOffsetY+polePoints.zigzag} L ${headOffsetX} ${headOffsetY}`} />;
    }

    return <path d={`M 0 ${headOffsetY+polePoints.end} L 0 ${headOffsetY}`} />;
}

function getUnit(key, unitType, x, y) {
    const r = 0.6;
    const c = 0.4;

    const baseCircle = <circle cx={x} cy={y} r={r} className='background' />;

    switch(unitType) {
        case SignalElementsEnums.UnitType.RED:
            return <g key={key}>
                {baseCircle}
                <line x1={x - r} y1={y} x2={x + r} y2={y} />
            </g>
        case SignalElementsEnums.UnitType.YELLOW_LOWER:
        case SignalElementsEnums.UnitType.YELLOW_UPPER:
        case SignalElementsEnums.UnitType.DWARF_YELLOW_S13:
            return <g key={key}>
                {baseCircle}
                <line x1={x - c} y1={y - c} x2={x + c} y2={y + c} />
            </g>
        case SignalElementsEnums.UnitType.GREEN:
        case SignalElementsEnums.UnitType.OLD_GREEN:
            return <g key={key}>
                {baseCircle}
                <line x1={x} y1={y + r} x2={x} y2={y - r} />
            </g>
        case SignalElementsEnums.UnitType.BLUE:
            return <g key={key}>
                {baseCircle}
                <line x1={x - c} y1={y - c} x2={x + c} y2={y + c} />
                <line x1={x + c} y1={y - c} x2={x - c} y2={y + c} />
            </g>
        case SignalElementsEnums.UnitType.WHITE:
            return <g key={key}>
                {baseCircle}
            </g>
        case SignalElementsEnums.UnitType.DWARF_W24:
            return <g key={key}>
                {baseCircle}
                <line x1={x - 0.3} y1={y - 0.3} x2={x + 0.3} y2={y + 0.3} />
            </g>
        default:
            return <g key={key}>
                {baseCircle}
                <line x1={x - 0.2} y1={y + 0.5} x2={x + 0.5} y2={y - 0.2} />
                <line x1={x - 0.5} y1={y + 0.2} x2={x + 0.2} y2={y - 0.5} />
            </g>
    }
}

function getHead(object, headOffsetY, headOffsetX) {
    if(object.signal_elements.isMechanical()) {
        return getHeadMech(object, headOffsetY);
    }

    if(object.signal_elements.type === SignalElementsEnums.Type.TOP) {
        return getHeadTOP(object, headOffsetY);
    }

    const isDoubleDwarf = object.signal_elements.type === SignalElementsEnums.Type.DWARF_DOUBLE;
    const unitsCount = object.signal_elements.units.length;
    const units = [];
    const r = 0.6;

    for(let i = 0; i < unitsCount; i++) {
        const unitType = object.signal_elements.units[i];
        const cx = isDoubleDwarf ? (i > 2 ? r : -r) : headOffsetX;
        const cy = headOffsetY - r - i * r * 2 + (isDoubleDwarf && i > 2 ? 6 * r : 0);
        units.push(getUnit(i, unitType, cx, cy));
    }

    return units;
}

function getHeadTOP(object, headOffsetY) {
    const isLeft = object.signal_elements.headPosition === SignalElementsEnums.HeadPosition.LEFT;
    const r = 0.6;
    const whiteCX = isLeft ? r*2 : -r*2;

    return <>
        <path d={`M ${whiteCX} ${headOffsetY} L 0 ${headOffsetY}`} />
        { getUnit(0, SignalElementsEnums.UnitType.YELLOW_LOWER, 0, headOffsetY-r) }
        { getUnit(1, SignalElementsEnums.UnitType.WHITE, 0, headOffsetY-3*r) }
        { getUnit(2, SignalElementsEnums.UnitType.WHITE, 0, headOffsetY-5*r) }
        { getUnit(3, SignalElementsEnums.UnitType.YELLOW_LOWER, whiteCX, headOffsetY-r) }
    </>
}

function getHomeMechSignalArm(y, rot) {
    return <g transform={`translate(0 ${y}) rotate(${rot}) translate(-0.576, -1.89)`}>
        <ReactSVG
            src={`${process.env.PUBLIC_URL}/assets/mech_signals/arm.svg`}
            wrapper='svg'
            beforeInjection={(svg) => {
                svg.setAttribute('width', '1mm');
                svg.setAttribute('height', '1mm');
            }}
        />;
    </g>;
}

function getCustomMechHead(y, fileName) {
    return <g transform={`translate(-1.89, ${y -1.89})`}>
        <ReactSVG
            src={`${process.env.PUBLIC_URL}/assets/mech_signals/${fileName}`}
            wrapper='svg'
            beforeInjection={(svg) => {
                svg.setAttribute('width', '1mm');
                svg.setAttribute('height', '1mm');
            }}
        />;
    </g>;
}

function getHeadMech(object, headOffsetY) {
    const mechType = object.signal_elements.mechType;

    switch(mechType) {
        case SignalElementsEnums.MechType.HOME_SINGLE:
            return <g className="signal-head-mech">
                { getHomeMechSignalArm(headOffsetY, 0) }
            </g>
        case SignalElementsEnums.MechType.HOME_DOUBLE:
            return <g className="signal-head-mech">
                { getHomeMechSignalArm(headOffsetY, 0) }
                { getHomeMechSignalArm(headOffsetY + 3.5, -90) }
            </g>
        case SignalElementsEnums.MechType.SHUNTING:
            return <g className="signal-head-mech">
                { getCustomMechHead(headOffsetY, 'shunting_head.svg') }
            </g>
        case SignalElementsEnums.MechType.DISTANT_SINGLE:
            return <g className="signal-head-mech">
                { getCustomMechHead(headOffsetY, 'distant_head.svg') }
            </g>
        case SignalElementsEnums.MechType.DISTANT_DOUBLE:
            return <g className="signal-head-mech">
                { getCustomMechHead(headOffsetY, 'distant_head.svg') }
                { getCustomMechHead(headOffsetY + 3.5, 'distant_arm.svg') }
            </g>
        case SignalElementsEnums.MechType.STOP:
            return <g className="signal-head-mech">
                { getCustomMechHead(headOffsetY, 'stop_head.svg') }
            </g>
        default:
            return null;
    }
}

function getBar(object, headOffsetX, y, isYellow, key = 0) {
    const yellowOff = isYellow ? 0.2 : 0;

    return <g key={key}>
        <rect x={headOffsetX-0.6} y={y-0.2} width={1.2} height={0.4} className='background' />;
        <line x1={headOffsetX - yellowOff} y1={y-0.2} x2={headOffsetX + yellowOff} y2={y+0.2} />;
    </g>
}

function getBars(object, polePoints, headOffsetY) {
    if(!polePoints) return null;

    const barType = object.signal_elements.bar;
    const y = headOffsetY + polePoints.bars - 0.2;

    if(barType === SignalElementsEnums.BarType.NONE) return null;

    switch(barType) {
        case SignalElementsEnums.BarType.NONE:
        default:
            return null;
        case SignalElementsEnums.BarType.YELLOW:
            return getBar(object, 0, y, true);
        case SignalElementsEnums.BarType.GREEN:
            return getBar(object, 0, y, false);
        case SignalElementsEnums.BarType.YELLOW_GREEN:
            return <>
                { getBar(object, 0, y, true, 0) }
                { getBar(object, 0, y - 0.8, false, 1) }
            </>
    }
}

function getSignText(id, text, y) {
    if(!text) return null;
    const def = DefinedSignalSigns[id];
    if(!def) return null;

    return <text
        key={`${id}-text`}
        className="signal-sign-text"
        transform={`translate(${def.textOffsetX || 0}, ${y + (def.textOffsetY || 0)})`}
        style={{ fontSize: `${def.textSize || 0.15}mm` }}
        textAnchor="middle"
        dominantBaseline="central"
    >{text}</text>;
}

function getSign(id, y) {
    const def = DefinedSignalSigns[id];
    if(!def) return null;

    return <g key={id} className="signal-sign" transform={`translate(-1.89, ${y - 1.89})`}>
        <ReactSVG
            src={`${process.env.PUBLIC_URL}/assets/signal_signs/${def.icon}`}
            wrapper='svg'
            beforeInjection={(svg) => {
                svg.setAttribute('width', '1mm');
                svg.setAttribute('height', '1mm');
            }}
        />;
    </g>
}

function getSigns(object, polePoints, headOffsetY) {
    if(!polePoints) return null;
    const signs = [];
    let y = headOffsetY + polePoints.signs;

    for(const [id, def] of Object.entries(DefinedSignalSigns)) {
        if(!object.signal_elements.signs.hasOwnProperty(id) || !DefinedSignalSigns[id]) continue;
        const height = (def.height || 1.0);
        const text = object.signal_elements.signs[id]?.text || null;
        const signY = y - height / 2 + 0.1;

        signs.push(getSign(id, signY, text));

        const textComponent = getSignText(id, text, signY);
        if(textComponent) signs.push(textComponent);

        signs.push(getSign(key, y - height / 2 + 0.1));
        y -= height + 0.2;
    }

    return signs;
}