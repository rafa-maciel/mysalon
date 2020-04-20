import Model from './Model'

export default class Vendor extends Model{
    constructor(name, phone, secondaryPhone, notes, id='') {
        super();
        this._name = name;
        this._phone = phone;
        this._secondaryPhone = secondaryPhone;
        this._notes = notes;
        this._id = id;
    }

    equals(other) {
        return this._id == other.id;
    }

    equalsFor(id) {
        return this._id == id;
    }

    get name() {
        return this._name;
    }

    get phone() {
        return this._phone;
    }

    get secondaryPhone() {
        return this._secondaryPhone;
    }

    get notes() {
        return this._notes;
    }

    get id() {
        return this._id;
    }
}
