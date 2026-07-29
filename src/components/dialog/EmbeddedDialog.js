import './EmbeddedDialog.css';

const EmbeddedDialog = (props) => {
    const {message} = props;

    return (
        <div className='embedded-dialog'>
            <div className='embedded-dialog-message'>
                {message}
            </div>
        </div>
    );
};

export default EmbeddedDialog;