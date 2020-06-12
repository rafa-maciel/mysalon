import Model from "./Model";

export default class Professional extends Model{
    constructor(name, residencialPhone, cellphone, departament, email, identifiedColor, id='') {
        super();
        this._name = name;
        this._residencialPhone = residencialPhone;
        this._cellphone = cellphone;
        this._departament = departament;
        this._id = id;
        this._email = email;
        this._identifiedColor = identifiedColor;
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

    get residencialPhone() {
        return this._residencialPhone;
    }

    get cellphone() {
        return this._cellphone;
    }

    get departament() {
        return this._departament;
    }

    get email() {
        return this._email;
    }

    get id() {
        return this._id;
    }

    get identifiedColor() {
        return this._identifiedColor;
    }
}