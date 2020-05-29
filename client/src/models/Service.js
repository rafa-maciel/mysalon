import Model from "./Model";

export default class Service extends Model {
    constructor(notes, payment, id=null) {
        super();
        this._notes = notes;
        this._payment = payment;
        this._id = id;
    }

    equals(other) {
        return this._id == other.id;
    }

    equalsFor(id) {
        return this._id == other.id;
    }

    get notes() {
        return this._notes;
    }

    get payment() {
        return this._payment;
    }

    get id() {
        return this._id;
    }
}