import Model from "./Model";
import PaymentMethod from "./PaymentMethod";
import DateFormatHelper from "../helpers/DateFormatHelper";

export default class Purchase extends Model {
    constructor(value, date, notes, paymentMethod, vendor, id='') {
        super();
        this._value = value;
        this._date = date != null ? new Date(DateFormatHelper.toDate(date)) : null;
        this._notes = notes;
        this._paymentMethod = new PaymentMethod(paymentMethod);
        this._vendor = vendor;
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

    get date() {
        return this._date;
    }

    get notes() {
        return this._notes;
    }

    get paymentMethod() {
        return this._paymentMethod;
    }

    get vendor() {
        return this._vendor;
    }

    get id() {
        return this._id;
    }
}