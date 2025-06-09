import { useState, useEffect } from 'react';
import { dialogsObservable } from '../services/dialogService';

export function useDialogs() {
  const [dialogs, setDialogs] = useState(dialogsObservable.getValue());

  useEffect(() => {
    const sub = dialogsObservable.subscribe(setDialogs);
    return () => sub.unsubscribe();
  }, []);

  return dialogs;
}
