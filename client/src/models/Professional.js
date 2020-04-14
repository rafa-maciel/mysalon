export default class Professional {
    constructor(name, residencialPhone, cellphone, departament, id='') {
        this._name = name;
        this._residencialPhone = residencialPhone;
        this._cellphone = cellphone;
        this._departament = departament;
        this._id = id;
    }

    equals(other) {
        return this._id == other.id;
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

    get id() {
        return this._id;
    }
}