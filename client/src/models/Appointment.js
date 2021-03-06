import Model from "./Model";
import DateFormatHelper from "../helpers/DateFormatHelper";

export default class Appointment extends Model{
    constructor(customer, professional, date, time, endTime, title, notes, done, service=null, id='') {
        super();
        this._customer = customer;
        this._professional = professional;
        this._date = date ? new Date(DateFormatHelper.toDate(date)) : null;
        this._time = time;
        this._endTime = endTime;
        this._title = title;
        this._notes = notes;
        this._done = done;
        this._service = service;   
        this._id = id; 
    }

    equals(other) {
        return this._id == other.id;
    }

    equalsFor(id) {
        return this._id == id;
    }

    set customer(customer) {
        this._customer = customer;
    }
    get customer() {
        return this._customer;
    }

    get professional() {
        return this._professional;
    }

    get date() {
        return this._date;
    }

    get time() {
        return this._time;
    }

    get endTime() {
        return this._endTime;
    }

    get title() {
        return this._title;
    }

    get notes() {
        return this._notes;
    }

    get done() {
        return this._done;
    }

    get service() {
        return this._service;
    }

    get id() {
        return this._id;
    }

}