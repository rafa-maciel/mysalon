export default class AlertMessage {
    constructor() {
        this._title = '';
        this._message = '';
        this._type = 'primary';
    }

    update(message, title='', alertType='primary') {
        this._title = title;
        this._message = message;
        this._type = alertType;
    }

    get title() {
        return this._title;
    }

    get message() {
        return this._message;
    }

    get type() {
        return this._type;
    }
}