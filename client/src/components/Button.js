export default class Button {
    constructor(label, css, type='submit', ...listeners) {
        let btn = document.createElement("button");
        btn.classList = css;
        btn.setAttribute('type', type);
        btn.innerHTML = label;

        if (listeners) listeners.forEach(listener => btn.addEventListener(listener.type, listener.action));

        return btn;
    }
}