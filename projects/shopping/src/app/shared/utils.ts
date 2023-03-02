export function setSpinnerTimer(inProgress: boolean, spinner: {visible:boolean, timer: any}) {

    if (inProgress && ! spinner.timer) {
        spinner.timer = setTimeout(() => spinner.visible = true, 150);
    }
    else if (!inProgress && spinner.timer) {
        spinner.visible = false;
        clearTimeout(spinner.timer);
        spinner.timer = null;
    }
}

export function confirmAction(text: string, callback: Function) {
    const confirm = window.confirm(text);
    if (confirm)
        callback();
}