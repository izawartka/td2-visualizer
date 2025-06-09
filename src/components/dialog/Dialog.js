import { forwardRef, useImperativeHandle } from 'react';
import './Dialog.css';

const Dialog = forwardRef((props, ref) => {
    const {message, buttons} = props;

    const onButtonClick = (button) => {
        button.onClick();
        props.onClose();
    }

    const onBgClick = () => {
        const buttonIndex = buttons.findIndex(button => button.bgClick);
        if(buttonIndex !== -1) onButtonClick(buttons[buttonIndex]);
    }

    useImperativeHandle(ref, () => ({
        onBgClick: onBgClick
    }));

    return (
        <div className='dialog'>
            <div className='dialog-message'>
                {message}
            </div>
            <div className='dialog-buttons'>
            {buttons.map((button, index) => {
                return (
                    <button key={index} onClick={() => onButtonClick(button)} autoFocus={button.autoFocus}>
                        {button.text}
                    </button>
                );
            })}
            </div>
        </div>
    );
});

export default Dialog;