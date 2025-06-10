import { forwardRef, useImperativeHandle } from 'react';
import '../dialog/Dialog.css';
import './SceneryInfoDialog.css'
import SceneryInfoView from './SceneryInfoView';

const SceneryInfoDialog = forwardRef((props, ref) => {
    const {onClose, scenery} = props;

    const onBgClick = () => {
        onClose();
    }

    useImperativeHandle(ref, () => ({
        onBgClick: onBgClick
    }));

    return (
        <div className='dialog wide'>
            <div className='dialog-content scenery-info-dialog-content'>
                <SceneryInfoView scenery={scenery} />
            </div>
            <div className='dialog-buttons'>
                <button onClick={() => onClose()} autoFocus={true}>
                    Ok
                </button>
            </div>
        </div>
    );
});

export default SceneryInfoDialog;
