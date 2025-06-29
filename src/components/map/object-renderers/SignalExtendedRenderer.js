import AngleHelper from '../../../helpers/angleHelper';
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
    const poleLength = getPoleLength(object, headOffsetX);
    const headOffsetY = getHeadOffsetY(object, poleLength);

    return (
        <g strokeWidth={0.2} strokeLinecap="round" strokeLinejoin="round">
            { getBase(halfBaseWidth) }
            { getOverheadFrame(object) }
            { getPole(poleLength, headOffsetY, headOffsetX) }
            { getBars(object, headOffsetY, headOffsetX) }
            { getHead(object, headOffsetY, headOffsetX) }
        </g>
    );
}

function getHeadOffsetY(object, poleLength) {
    if(object.signal_elements.isOverhead()) {
        return object.signal_elements.units.length * 1.2 + 0.1;
    }

    return -poleLength;
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

function getPoleLength(object, headOffsetX) {
    const isOverhead = object.signal_elements.isOverhead();

    let length = isOverhead ? 0 : 0.6;

    if(headOffsetX !== 0) {
        length += 0.4; // zigzag offset
    }

    switch(object.signal_elements.bar) {
        case SignalElementsEnums.BarType.YELLOW:
        case SignalElementsEnums.BarType.GREEN:
            length += 0.7;
            break;
        case SignalElementsEnums.BarType.YELLOW_GREEN:
            length += 1.5;
            break;
        default:
            break;
    }

    if(isOverhead) return length;
    return Math.max(length + 0.2, 2);
}

function getPole(poleLength, headOffsetY, headOffsetX) {
    if(!poleLength) return null;

    if(headOffsetX) {
        return <path d={`M 0 ${headOffsetY+poleLength} L 0 ${headOffsetY + .4} L ${headOffsetX} ${headOffsetY + .4} L ${headOffsetX} ${headOffsetY}`} />;
    }

    return <path d={`M 0 ${headOffsetY+poleLength} L 0 ${headOffsetY}`} />;
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
                <line x1={x - 0.2} y1={y - 0.5} x2={x + 0.5} y2={y + 0.2} />
                <line x1={x - 0.5} y1={y - 0.2} x2={x + 0.2} y2={y + 0.5} />
            </g>
    }
}

function getHead(object, headOffsetY, headOffsetX) {
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

function getBar(object, headOffsetX, y, isYellow, key = 0) {
    const yellowOff = isYellow ? 0.2 : 0;

    return <g key={key}>
        <rect x={headOffsetX-0.6} y={y-0.2} width={1.2} height={0.4} className='background' />;
        <line x1={headOffsetX - yellowOff} y1={y-0.2} x2={headOffsetX + yellowOff} y2={y+0.2} />;
    </g>
}

function getBars(object, headOffsetY, headOffsetX) {
    const barType = object.signal_elements.bar;
    const zigzagOffset = headOffsetX !== 0 ? 0.4 : 0;
    const y = headOffsetY + zigzagOffset + 0.6;

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
                { getBar(object, 0, y, false, 0) }
                { getBar(object, 0, y + 0.8, true, 1) }
            </>
    }
}
