import DOMParserUtil from "../helpers/DOMParserUtil";

export default class Component {
    constructor(parentSelector, info={}) {
        this._component = DOMParserUtil.parse(this._base(info));
        this._tag = `#${info.id}`;
        this._parentSelector = parentSelector;
        this._info = info;

        this._init();

        document.querySelector(this._parentSelector).appendChild(this._component);
    }

    _init() {
        this._initListeners(this._info.listeners);
    }

    _initListeners(listeners) {
        if (listeners) {
            listeners.forEach(listener => {
                this._component.addEventListener(listener.type, listener.action);
            });
        }
    }

    _base(info) {
        throw new Error('the method fieldsTempalte must be implemented');
    }
}