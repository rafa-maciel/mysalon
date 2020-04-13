export default class FieldError {
    constructor(name, message) {
        this._name = name;
        this._message = message;
    }

    get name() {
        return this._name;
    }

    get message() {
        return this._message;
    }
}