import Model from "./Model";

export default class Payment extends Model {
    constructor(service, value, method, date, notes, id=null) {
        this._service = service;
        this._value = value;
        this._method = method;
        this._date = date;
        this._notes = notes;
        this._id = id;
    }

    equals(other) {
        return this._id == other.id;
    }

    equalsFor(id) {
        return this._id == id;
    }

    get service() {
        return this._service;
    }

    get value() {
        return this._value;
    }

    get method() {
        return this._method;
    }

    get date() {
        return this._date;
    }

    get notes() {
        return this._notes;
    }

    get id() {
        return this._id;
    }
}
