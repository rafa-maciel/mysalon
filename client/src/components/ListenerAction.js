export default class ListenerAction {
    constructor(type, action) {
        this._type = type;
        this._action = action;
    }

    get type() {
        return this._type;
    }

    get action() {
        return this._action;
    }
}