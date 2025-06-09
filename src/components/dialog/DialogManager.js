import React, { useRef } from 'react';
import './Dialog.css';
import Dialog from './Dialog';
import { useDialogs } from '../../hooks/useDialogs';
import { removeDialog } from '../../services/dialogService';

function DialogManager() {
  const dialogs = useDialogs();
  const currentDialogRef = useRef(null);
  const currentDialog = dialogs[dialogs.length - 1];

  const onClose = () => {
    removeDialog();
  };

  const onBgClick = (e) => {
    if (e.target !== e.currentTarget) return;
    currentDialogRef.current?.onBgClick?.();
  };

  if (!currentDialog) return null;

  const { customComponent, message, buttons } = currentDialog;
  const DialogContent = customComponent ?
    React.cloneElement(customComponent, { onClose, ref: currentDialogRef }) :
    <Dialog message={message} buttons={buttons} onClose={onClose} ref={currentDialogRef} />;

  return (
    <div className="dialog-background" onClick={onBgClick}>
      {DialogContent}
    </div>
  );
}

export default DialogManager;