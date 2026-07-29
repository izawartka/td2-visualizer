import { cloneElement } from 'react';
import Dialog from '../Dialog';
import EmbeddedDialog from '../EmbeddedDialog';

export const getDialogComponent = (dialog, onClose, ref, isEmbedded) => {
    if (dialog.customComponent) {
        return cloneElement(dialog.customComponent, { onClose, ref });
    }

    if (isEmbedded) {
        return <EmbeddedDialog message={dialog.message} />;
    }

    return <Dialog message={dialog.message} buttons={dialog.buttons} onClose={onClose} ref={ref} />;
}