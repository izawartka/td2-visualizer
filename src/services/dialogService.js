import { BehaviorSubject } from 'rxjs';

const dialogs$ = new BehaviorSubject([]);

export const dialogsObservable = dialogs$;

function addDialog(dialog) {
  const current = dialogs$.getValue();

  if(dialog.options?.atBack === true) dialogs$.next([dialog, ...current]);
  else dialogs$.next([...current, dialog]);
}

export function removeDialog() {
  const current = dialogs$.getValue();
  if (current.length > 0) {
    dialogs$.next(current.slice(0, -1));
  }
}

export function showDialog(message, buttons = null, options = null) {
  if (!message) return;
  if (!buttons) buttons = [{ text: 'Ok', onClick: () => {}, autoFocus: true, bgClick: true }];
  buttons = buttons.map(btn => ({
    onClick: btn.onClick || (() => {}),
    text: btn.text,
    autoFocus: btn.autoFocus,
    bgClick: btn.bgClick
  }));
  addDialog({ message, buttons, options });
}

export function showCustomDialog(component) {
  addDialog({ customComponent: component });
}
