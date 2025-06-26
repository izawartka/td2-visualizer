import React, { useContext } from 'react';
import SignalStandardRenderer from './SignalStandardRenderer';
import SignalExtendedRenderer from './SignalExtendedRenderer';
import SettingsContext from '../../../contexts/SettingsContext';

export default function SignalRenderer(props) {
    const { object } = props;
    const { extendedSignals } = useContext(SettingsContext);
    
    if (extendedSignals && object.signal_elements) {
        return <MemoizedSignalExtendedRenderer object={object} />;
    } else {
        return <MemoizedSignalStandardRenderer object={object} />;
    }
}

const MemoizedSignalStandardRenderer = React.memo(SignalStandardRenderer);
const MemoizedSignalExtendedRenderer = React.memo(SignalExtendedRenderer); 
