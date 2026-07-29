import React, { useRef } from 'react';
import './Dialog.css';
import { useDialogs } from '../../hooks/useDialogs';
import { removeDialog } from '../../services/dialogService';
import { getDialogComponent } from './utils/getDialogComponent';
import { useEmbeddedContext } from '../../contexts/EmbeddedContext';

function DialogManager() {
  const dialogs = useDialogs();
  const currentDialogRef = useRef(null);
  const currentDialog = dialogs[dialogs.length - 1];
  const { isEmbedded } = useEmbeddedContext();

  const onClose = () => {
    removeDialog();
  };

  const onBgClick = (e) => {
    if (e.target !== e.currentTarget) return;
    currentDialogRef.current?.onBgClick?.();
  };

  if (!currentDialog) return null;

  const DialogComponent = getDialogComponent(currentDialog, onClose, currentDialogRef, isEmbedded);

  return (
    <div className="dialog-background" onClick={onBgClick}>
      {DialogComponent}
    </div>
  );
}

export default DialogManager;