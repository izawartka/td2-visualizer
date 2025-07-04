import { ReactSVG } from 'react-svg';
import AngleHelper from '../../../helpers/angleHelper';
import DefinedSignalSigns from '../../../model/defs/defined-signal-signs';
import SignalElementsEnums from '../../../model/signal-elements/enums';
import ExtendedSignalsHelper from '../../../helpers/extendedSignalsHelper';
import C from '../../../helpers/extendedSignalsConstants';

export default function SignalExtendedRenderer(props) {
    const { object } = props;
    const [x, y] = object.pos.toSVGCoords();

    const baseRot = object.rot.y;
    const rot = AngleHelper.normalizeDegAngle(baseRot);

    const pointsData = ExtendedSignalsHelper.getPointsData(object);

    return (
        <g className="extended-signal" transform={`translate(${x}, ${y}) rotate(${rot})`}>
            <SignalIcon object={object} pointsData={pointsData} />
            <SignalNameText object={object} rot={rot} pointsData={pointsData} />
        </g>
    );
}

function SignalNameText(props) {
    const {object, rot, pointsData} = props;
    
    const upsideDown = rot >= 180;
    const upsideDownRot = upsideDown ? 90 : -90;
    const anchor = upsideDown ? "start" : "end";

    const isOverhead = object.signal_elements.isOverhead();
    const baseY = isOverhead ? pointsData.headOffsetY + pointsData.polePoints.end : 0;

    return (
        <g transform={`translate(0, ${baseY + C.NAME_TEXT_OFFSET}) rotate(${upsideDownRot})`}>
            <text x="0" y="0" textAnchor={anchor} dominantBaseline="middle">
                {object.getPrintableSignalName()}
            </text>
        </g>
    );
}

function SignalIcon(props) {
    const { object, pointsData } = props;

    return (
        <g className="extended-signal-icon" strokeWidth={C.STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round">
            { SignalBase(pointsData) }
            { SignalOverheadFrame(object) }
            { SignalPole(pointsData) }
            { SignalBars(object, pointsData) }
            { SignalSigns(object, pointsData) }
            { SignalHead(object, pointsData) }
        </g>
    );
}

function SignalBase({halfBaseWidth}) {
    if(halfBaseWidth === 0) return null;
    return <path d={`M ${-halfBaseWidth} 0 L ${halfBaseWidth} 0`} />;
}

function SignalOverheadFrame(object) {
    if(!object.signal_elements.isOverhead()) return null;

    const hw = C.OVERHEAD_FRAME_HALF_W;
    const hh = C.OVERHEAD_FRAME_HALF_H;
    return <path d={`M -${hw} 0 L ${hw} 0 M -${hw} -${hh} L -${hw} ${hh} M ${hw} -${hh} L ${hw} ${hh}`} />;
}

function SignalPole({polePoints, headOffsetY, headOffsetX}) {
    if(!polePoints) return null;

    if(headOffsetX) {
        return <path d={`M 0 ${headOffsetY+polePoints.end} L 0 ${headOffsetY+polePoints.zigzag} L ${headOffsetX} ${headOffsetY+polePoints.zigzag} L ${headOffsetX} ${headOffsetY}`} />;
    }

    return <path d={`M 0 ${headOffsetY+polePoints.end} L 0 ${headOffsetY}`} />;
}

function SignalHeadUnit(key, unitType, x, y) {
    const r = C.HEAD_UNIT_RADIUS;
    const c = C.HEDA_UNIT_DIAGONAL;

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
            const w24 = C.HEAD_UNIT_DWARF_W24_SIZE;
            return <g key={key}>
                {baseCircle}
                <line x1={x - w24} y1={y - w24} x2={x + w24} y2={y + w24} />
            </g>
        default:
            const u1 = C.HEAD_UNIT_UNUSED_SIZE_1;
            const u2 = C.HEAD_UNIT_UNUSED_SIZE_2;
            return <g key={key}>
                {baseCircle}
                <line x1={x - u1} y1={y + u2} x2={x + u2} y2={y - u1} />
                <line x1={x - u2} y1={y + u1} x2={x + u1} y2={y - u2} />
            </g>
    }
}

function SignalHead(object, {headOffsetY, headOffsetX}) {
    if(object.signal_elements.isMechanical()) {
        return SignalMechHead(object, {headOffsetY});
    }

    if(object.signal_elements.type === SignalElementsEnums.Type.TOP) {
        return SignalHeadTOP(object, {headOffsetY});
    }

    const r = C.HEAD_UNIT_RADIUS;
    const isDoubleDwarf = object.signal_elements.type === SignalElementsEnums.Type.DWARF_DOUBLE;
    const unitsCount = object.signal_elements.units.length;
    const units = [];

    for(let i = 0; i < unitsCount; i++) {
        const unitType = object.signal_elements.units[i];
        const cx = isDoubleDwarf ? (i > 2 ? r : -r) : headOffsetX;
        const cy = headOffsetY - r - i * r * 2 + (isDoubleDwarf && i > 2 ? 6 * r : 0);
        units.push(SignalHeadUnit(i, unitType, cx, cy));
    }

    return units;
}

function SignalHeadTOP(object, {headOffsetY}) {
    const isLeft = object.signal_elements.headPosition === SignalElementsEnums.HeadPosition.LEFT;
    const r = C.HEAD_UNIT_RADIUS;
    const whiteCX = isLeft ? r*2 : -r*2;

    return <>
        <path d={`M ${whiteCX} ${headOffsetY} L 0 ${headOffsetY}`} />
        { SignalHeadUnit(0, SignalElementsEnums.UnitType.YELLOW_LOWER, 0, headOffsetY-r) }
        { SignalHeadUnit(1, SignalElementsEnums.UnitType.WHITE, 0, headOffsetY-3*r) }
        { SignalHeadUnit(2, SignalElementsEnums.UnitType.WHITE, 0, headOffsetY-5*r) }
        { SignalHeadUnit(3, SignalElementsEnums.UnitType.YELLOW_LOWER, whiteCX, headOffsetY-r) }
    </>
}

function SignalHomeMechArm(y, rot) {
    return <g transform={`translate(0 ${y}) rotate(${rot}) translate(${C.MECH_ARM_X_OFF - 1.89}, -1.89)`}>
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

function SignalCustomMechHead(y, fileName) {
    return <g transform={`translate(-1.89, ${y - 1.89})`}>
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

function SignalMechHead(object, {headOffsetY}) {
    const mechType = object.signal_elements.mechType;

    switch(mechType) {
        case SignalElementsEnums.MechType.HOME_SINGLE:
            return <g className="signal-head-mech">
                { SignalHomeMechArm(headOffsetY, 0) }
            </g>
        case SignalElementsEnums.MechType.HOME_DOUBLE:
            return <g className="signal-head-mech">
                { SignalHomeMechArm(headOffsetY, 0) }
                { SignalHomeMechArm(headOffsetY + C.MECH_SECOND_ARM_OFFSET, -90) }
            </g>
        case SignalElementsEnums.MechType.SHUNTING:
            return <g className="signal-head-mech">
                { SignalCustomMechHead(headOffsetY, 'shunting_head.svg') }
            </g>
        case SignalElementsEnums.MechType.DISTANT_SINGLE:
            return <g className="signal-head-mech">
                { SignalCustomMechHead(headOffsetY, 'distant_head.svg') }
            </g>
        case SignalElementsEnums.MechType.DISTANT_DOUBLE:
            return <g className="signal-head-mech">
                { SignalCustomMechHead(headOffsetY, 'distant_head.svg') }
                { SignalCustomMechHead(headOffsetY + C.MECH_SECOND_ARM_OFFSET, 'distant_arm.svg') }
            </g>
        case SignalElementsEnums.MechType.STOP:
            return <g className="signal-head-mech">
                { SignalCustomMechHead(headOffsetY, 'stop_head.svg') }
            </g>
        default:
            return null;
    }
}

function SignalBar(y, isYellow, key = 0) {
    const yellowOff = isYellow ? C.BAR_HALF_H : 0;

    return <g key={key}>
        <rect x={-C.BAR_HALF_W} y={y-C.BAR_HALF_H} width={C.BAR_HALF_W*2} height={C.BAR_HALF_H*2} className='background' />;
        <line x1={-yellowOff} y1={y-C.BAR_HALF_H} x2={yellowOff} y2={y+C.BAR_HALF_H} />;
    </g>
}

function SignalBars(object, {polePoints, headOffsetY}) {
    if(!polePoints) return null;

    const barType = object.signal_elements.bar;
    const y = headOffsetY + polePoints.bars - C.BAR_HALF_H;

    if(barType === SignalElementsEnums.BarType.NONE) return null;

    switch(barType) {
        case SignalElementsEnums.BarType.NONE:
        default:
            return null;
        case SignalElementsEnums.BarType.YELLOW:
            return SignalBar(y, true);
        case SignalElementsEnums.BarType.GREEN:
            return SignalBar(y, false);
        case SignalElementsEnums.BarType.YELLOW_GREEN:
            return <>
                { SignalBar(y, true, 0) }
                { SignalBar(y - C.BAR_OFFSET, false, 1) }
            </>
    }
}

function SignalSignText(id, text, y) {
    if(!text) return null;
    const def = DefinedSignalSigns[id];
    if(!def) return null;

    return <text
        key={`${id}-text`}
        className="signal-sign-text"
        transform={`translate(${def.textOffsetX || 0}, ${y + (def.textOffsetY || 0)})`}
        style={{ fontSize: `${def.textSize || C.SIGN_DEFAULT_FONT_SIZE}mm` }}
        textAnchor="middle"
        dominantBaseline="central"
    >{text}</text>;
}

function SignalSign(id, y) {
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
        />
    </g>
}

function SignalSigns(object, {polePoints, headOffsetY}) {
    if(!polePoints) return null;
    const signs = [];
    let y = headOffsetY + polePoints.signs;

    for(const [id, def] of Object.entries(DefinedSignalSigns)) {
        if(!object.signal_elements.signs.hasOwnProperty(id) || !DefinedSignalSigns[id]) continue;
        const height = (def.height || C.SIGN_DEFAULT_HEIGHT);
        const text = object.signal_elements.signs[id]?.text || null;
        const signY = y - height / 2;

        signs.push(SignalSign(id, signY, text));

        const textComponent = SignalSignText(id, text, signY);
        if(textComponent) signs.push(textComponent);

        y -= height + C.ELEM_SPACING;
    }

    return signs;
}