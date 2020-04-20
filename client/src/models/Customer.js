import Model from './Model'
export default class Customer extends Model {
    constructor(fullname, residencialPhone, cellphone, indicatedBy, professionalEngaged, id='') {
        super();
        this._fullname = fullname;
        this._residencialPhone = residencialPhone;
        this._cellphone = cellphone;
        this._indicatedBy = indicatedBy;
        this._professionalEngaged = professionalEngaged;
        this._id = id;
    }

    equals(other) {
        return this._id == other.id;
    }

    equalsFor(id) {
        return this._id == id;
    }

    get fullname() {
        return this._fullname;
    }
    get residencialPhone() {
        return this._residencialPhone;
    }
    get cellphone() {
        return this._cellphone;
    }
    get indicatedBy() {
        return this._indicatedBy;
    }
    get professionalEngaged() {
        return this._professionalEngaged;
    }

    get id() {
        return this._id;
    }
}