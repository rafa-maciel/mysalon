import Model from "./Model";
import PaymentMethod from "./PaymentMethod";
import DateFormatHelper from "../helpers/DateFormatHelper";

export default class Payment extends Model {
    constructor(value, method, date, notes, id=null) {
        super();
        this._value = value;
        this._method = method ? new PaymentMethod(method) : new PaymentMethod('MONEY');
        this._date = date ? new Date(DateFormatHelper.toDate(date)) : null;
        this._notes = notes;
        this._id = id;
    }

    equals(other) {
        return this._id == other.id;
    }

    equalsFor(id) {
        return this._id == id;
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
