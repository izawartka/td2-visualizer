import React, { useContext } from 'react';
import SignalStandardRenderer from './SignalStandardRenderer';
import SignalExtendedRenderer from './SignalExtendedRenderer';
import SettingsContext from '../../../contexts/SettingsContext';

export default function SignalRenderer(props) {
    const { object } = props;
    const { extendedSignals, originalSignalNames: showOriginalName } = useContext(SettingsContext);

    if (extendedSignals && object.signal_elements) {
        return <MemoizedSignalExtendedRenderer object={object} showOriginalName={showOriginalName} />;
    } else {
        return <MemoizedSignalStandardRenderer object={object} showOriginalName={showOriginalName} />;
    }
}

const MemoizedSignalStandardRenderer = React.memo(SignalStandardRenderer);
const MemoizedSignalExtendedRenderer = React.memo(SignalExtendedRenderer); 
