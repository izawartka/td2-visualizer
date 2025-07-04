import SignalElementsEnums from "../model/signal-elements/enums";
import DefinedSignalSigns from "../model/defs/defined-signal-signs";
import C from "./extendedSignalsConstants";

export default class ExtendedSignalsHelper {
    static getPointsData(object) {
        const halfBaseWidth = this._getHalfBaseWidth(object);
        const headOffsetX = this._getHeadOffsetX(object);
        const polePoints = this._getPolePoints(object, headOffsetX);
        const headOffsetY = this._getHeadOffsetY(object, polePoints);
    
        return {
            halfBaseWidth, headOffsetX, polePoints, headOffsetY
        };
    }
    
    static _getHeadOffsetY(object, polePoints) {
         if(object.signal_elements.isOverhead()) {
            return object.signal_elements.units.length * C.HEAD_UNIT_RADIUS * 2 + C.HALF_STROKE_WIDTH;
        }
    
        return -polePoints?.end || 0;
    }
    
    static _getHalfBaseWidth(object) {
        const isDwarf = object.signal_elements.type === SignalElementsEnums.Type.DWARF;
        const isDoubleDwarf = object.signal_elements.type === SignalElementsEnums.Type.DWARF_DOUBLE;
    
        if(object.signal_elements.isOverhead()) return 0;
        if(isDwarf) return C.HEAD_UNIT_RADIUS;
        if(isDoubleDwarf) return C.HEAD_UNIT_RADIUS * 2;
    
        return C.HALF_BASE_WIDTH;
    }

    static _getHeadOffsetX(object) {
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
                return -C.HEAD_POS_OFFSET_X;
            case SignalElementsEnums.HeadPosition.RIGHT:
                return C.HEAD_POS_OFFSET_X;    
        }
    }
    
    static _getPolePoints(object, headOffsetX) {
        const isDwarf = object.signal_elements.isDwarf();
        if(isDwarf) return null;
    
        const isOverhead = object.signal_elements.isOverhead();
        const isMechanical = object.signal_elements.isMechanical();
    
        const polePoints = {};
        polePoints.zigzag = headOffsetX !== 0 ? C.ZIGZAG_OFFSET : 0;
        if(isMechanical) polePoints.zigzag += C.MECH_OFFSET;
        polePoints.bars = polePoints.zigzag;
    
        switch(object.signal_elements.bar) {
            case SignalElementsEnums.BarType.YELLOW:
            case SignalElementsEnums.BarType.GREEN:
                polePoints.bars += C.BAR_OFFSET;
                break;
            case SignalElementsEnums.BarType.YELLOW_GREEN:
                polePoints.bars += C.BAR_OFFSET * 2;
                break;
            default:
                break;
        }
    
        const signsHeight = Object.keys(object.signal_elements.signs).map(key => (DefinedSignalSigns[key]?.height || C.SIGN_DEFAULT_HEIGHT) + C.ELEM_SPACING).reduce((a, b) => a + b, 0) || 0;
        polePoints.signs = polePoints.bars + signsHeight;
        polePoints.end = polePoints.signs;
        if(isMechanical) polePoints.end = Math.max(polePoints.end + C.POLE_HEIGHT_ADDITION, C.POLE_HEIGHT_MECH_MINIMAL);
        else if(!isOverhead) polePoints.end = Math.max(polePoints.signs + C.POLE_HEIGHT_ADDITION, C.POLE_HEIGHT_MINIMAL);
        else if(polePoints.end > C.HALF_STROKE_WIDTH) polePoints.end -= C.HALF_STROKE_WIDTH; 
    
        return polePoints;
    }
}