// Warning: Hot-reloading this file may not work as expected

const ExtendedSignalsConstants = {
    STROKE_WIDTH: 0.2,
    NAME_TEXT_OFFSET: 1.0,
    HEAD_UNIT_RADIUS: 0.6,
    HEDA_UNIT_DIAGONAL: 0.4,
    HEAD_UNIT_DWARF_W24_SIZE: 0.3,
    HEAD_UNIT_UNUSED_SIZE_1: 0.2,
    HEAD_UNIT_UNUSED_SIZE_2: 0.5,
    MECH_SECOND_ARM_OFFSET: 3.5,
    MECH_ARM_X_OFF: 1.314,
    BAR_HALF_W: 0.6,
    BAR_HALF_H: 0.2,
    OVERHEAD_FRAME_HALF_W: 1.0,
    OVERHEAD_FRAME_HALF_H: 0.5,
    ELEM_SPACING: 0.2,
    SIGN_DEFAULT_FONT_SIZE: 0.15,
    SIGN_DEFAULT_HEIGHT: 1.0,
    HALF_BASE_WIDTH: 0.4536,
    HEAD_POS_OFFSET_X: 0.4536,
    ZIGZAG_OFFSET: 0.4,
    MECH_OFFSET: 5.2,
    POLE_HEIGHT_ADDITION: 0.8,
    POLE_HEIGHT_MINIMAL: 2.2,
    POLE_HEIGHT_MECH_MINIMAL: 6.0,
    // placeholders
    BAR_OFFSET: NaN,
    HALF_STROKE_WIDTH: NaN
};

ExtendedSignalsConstants.BAR_OFFSET = ExtendedSignalsConstants.ELEM_SPACING + ExtendedSignalsConstants.STROKE_WIDTH + ExtendedSignalsConstants.BAR_HALF_H * 2;
ExtendedSignalsConstants.HALF_STROKE_WIDTH = ExtendedSignalsConstants.STROKE_WIDTH / 2;
  
export default ExtendedSignalsConstants;