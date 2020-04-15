import Model from './Model'
export default class Customer extends Model {
    /* 
    "id": 1,
    "fullname": "Carla Damares",
    "residencialPhone": "11 555655431",
    "cellphone": "111546455446",
    "indicatedBy": "Luiza Adriana",
    "professionalEngagedName": "Maria Antonieta"
    */
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