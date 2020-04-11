export default class Professional {
    constructor(name, residencialPhone, cellphone, departament) {
        this._name = name;
        this._residencialPhone = residencialPhone;
        this._cellphone = cellphone;
        this._departament = departament;
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
}