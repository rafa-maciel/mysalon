import DateFormatHelper from "../helpers/DateFormatHelper";

export default class AppointmentDTO {
    constructor(customerId, professionalId, date, time, title, notes, done=false, id=null,
            serviceNotes=null, paymentValue=null, paymentMethod=null, paymentDate=null, paymentNotes=null) {
        this.customerId = customerId;
        this.professionalId = professionalId;
        this.date = date ? new Date(DateFormatHelper.toDate(date)) : null;
        this.time = time;
        this.title = title;
        this.notes = notes;
        this.done = done;
        this.id = id;
        this.serviceNotes = serviceNotes;
        this.paymentValue = paymentValue;
        this.paymentMethod = paymentMethod;
        this.paymentDate = paymentDate;
        this.paymentNotes = paymentNotes;

    }

    setService(notes) {
        this.serviceNotes = notes;
    }

    setPayment(value, method, date, notes) {
        this.paymentValue = value;
        this.paymentMethod = method;
        this.paymentDate =  date ? new Date(DateFormatHelper.toDate(date)) : null;
        this.paymentNotes = notes;
    }
}