import { forwardRef, useImperativeHandle } from 'react';
import SceneryParserLog from '../../model/parsing/scenery-parser-log';
import SceneryParserLogView from '../scenery-loaded-dialog/SceneryParserLogView';
import '../dialog/Dialog.css';
import './SceneryLoadedDialog.css'
import Constants from '../../helpers/constants';

const SceneryLoadedDialog = forwardRef((props, ref) => {
    const {onClose, loadingError} = props;

    const onBgClick = () => {
        onClose();
    }

    useImperativeHandle(ref, () => ({
        onBgClick: onBgClick
    }));

    const warningsOrError = SceneryParserLog.hasWarnings || !!loadingError;
    const showLog = Constants.parser.alwaysShowLogDialog || warningsOrError;

    const message = loadingError ? "An error occurred while loading the scenery"
        :( SceneryParserLog.hasWarnings ? "Scenery loaded with warnings" 
        : "Scenery loaded successfully" );

    const additionalErr = (loadingError && !SceneryParserLog.hasErrors) ? 
        loadingError.message : undefined;

    return (
        <div className='dialog wide'>
            <div className='dialog-content scenery-loaded-dialog-content'>
                <div className='main-message'>
                    {message}
                </div>
                {showLog && <SceneryParserLogView log={SceneryParserLog.getLog()} additionalErr={additionalErr} />}
            </div>
            <div className='dialog-buttons'>
                <button onClick={() => onClose()} autoFocus={true}>
                    Ok
                </button>
            </div>
        </div>
    );
});

export default SceneryLoadedDialog;
