import AngleHelper from '../../../helpers/angleHelper';
import SignalElementsEnums from '../../../model/signal-elements/enums';

export default function SignalExtendedRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();

    const rot = AngleHelper.normalizeDegAngle(object.rot.y);
    const upsideDown = rot >= 180;
    const upsideDownRot = upsideDown ? 90 : -90;
    const anchor = upsideDown ? "start" : "end";

    return (
        <g className="extended-signal" transform={`translate(${x}, ${y}) rotate(${object.rot.y})`}>
            <g className="extended-signal-icon">
                <SignalIcon object={object} />
            </g>
            <g transform={`translate(0, 1.5) rotate(${upsideDownRot})`}>
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
    const headOff = getHeadOffset(object);
    const poleLength = getPoleLength(object, headOff);

    return (
        <g strokeWidth={0.2} strokeLinecap="round" strokeLinejoin="round">
            { getBase(halfBaseWidth) }
            { getPole(poleLength, headOff) }
            { getBars(object, poleLength, headOff) }
            { getHead(object, poleLength, headOff) }
        </g>
    );
}

function getHalfBaseWidth(object) {
    const isDwarf = object.signal_elements.type === SignalElementsEnums.Type.DWARF;
    const isDoubleDwarf = object.signal_elements.type === SignalElementsEnums.Type.DWARF_DOUBLE;
    const isOverhead = object.signal_elements.headPosition === SignalElementsEnums.HeadPosition.OVERHEAD;

    if(isOverhead) return 0;
    if(isDwarf) return 0.6;
    if(isDoubleDwarf) return 1.2;

    return 0.4536;
}

function getBase(halfBaseWidth) {
    if(halfBaseWidth === 0) return null;
    return <path d={`M ${-halfBaseWidth} 0 L ${halfBaseWidth} 0`} />;
}

function getHeadOffset(object) {
    const isTOP = object.signal_elements.type === SignalElementsEnums.Type.TOP;
    if(isTOP) return 0;

    const headPos = object.signal_elements.headPosition;

    switch (headPos) {
        case SignalElementsEnums.HeadPosition.STANDARD:
        case SignalElementsEnums.HeadPosition.NO_POLE:
        case SignalElementsEnums.HeadPosition.OVERHEAD:
        default:
            return 0;    
        case SignalElementsEnums.HeadPosition.LEFT:
            return -0.4536;
        case SignalElementsEnums.HeadPosition.RIGHT:
            return 0.4536;    
    }
}

function getPoleLength(object, headOff) {
    const headPos = object.signal_elements.headPosition;
    if(headPos === SignalElementsEnums.HeadPosition.NO_POLE) return 0;

    let length = 0.8;

    if(headOff !== 0) {
        length += 0.4;
    }

    switch(object.signal_elements.bar) {
        case SignalElementsEnums.BarType.YELLOW:
        case SignalElementsEnums.BarType.GREEN:
            length += 1.0;
            break;
        case SignalElementsEnums.BarType.YELLOW_GREEN:
            length += 1.8;
            break;
        default:
            break;
    }

    return Math.max(length, 2);
}

function getPole(poleLength, headOff) {
    if(!poleLength) return null;

    if(headOff) {
        return <path d={`M 0 0 L 0 -${poleLength - .4} L ${headOff} -${poleLength -.4} L ${headOff} -${poleLength}`} />;
    }

    return <path d={`M 0 0 L 0 -${poleLength}`} />;
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

function getHead(object, poleLength, headOff) {
    if(object.signal_elements.type === SignalElementsEnums.Type.TOP) {
        return getHeadTOP(object, poleLength);
    }

    // TODO: overhead signals
    const isDoubleDwarf = object.signal_elements.type === SignalElementsEnums.Type.DWARF_DOUBLE;
    const unitsCount = object.signal_elements.units.length;
    const units = [];
    const r = 0.6;

    for(let i = 0; i < unitsCount; i++) {
        const unitType = object.signal_elements.units[i];
        const cx = isDoubleDwarf ? (i > 2 ? r : -r) : headOff;
        const cy = -poleLength - r - i * r * 2 + (isDoubleDwarf && i > 2 ? 6 * r : 0);
        units.push(getUnit(i, unitType, cx, cy));
    }

    return units;
}

function getHeadTOP(object, poleLength) {
    const isLeft = object.signal_elements.headPosition === SignalElementsEnums.HeadPosition.LEFT;
    const r = 0.6;
    const whiteCX = isLeft ? r*2 : -r*2;

    return <>
        <path d={`M ${whiteCX} -${poleLength} L 0 -${poleLength}`} />
        { getUnit(0, SignalElementsEnums.UnitType.YELLOW_LOWER, 0, -poleLength-r) }
        { getUnit(1, SignalElementsEnums.UnitType.WHITE, 0, -poleLength-3*r) }
        { getUnit(2, SignalElementsEnums.UnitType.WHITE, 0, -poleLength-5*r) }
        { getUnit(3, SignalElementsEnums.UnitType.YELLOW_LOWER, whiteCX, -poleLength-r) }
    </>
}

function getBar(object, headOff, y, isYellow, key = 0) {
    const yellowOff = isYellow ? 0.2 : 0;

    return <g key={key}>
        <rect x={headOff-0.6} y={y-0.2} width={1.2} height={0.4} className='background' />;
        <line x1={headOff - yellowOff} y1={y-0.2} x2={headOff + yellowOff} y2={y+0.2} />;
    </g>
}

function getBars(object, poleLength, headOff) {
    const barType = object.signal_elements.bar;
    const headOffOffset = headOff !== 0 ? 0.4 : 0;
    const y = -poleLength + headOffOffset + 0.6;

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