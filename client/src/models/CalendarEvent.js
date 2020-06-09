import DateFormatHelper from "../helpers/DateFormatHelper";

export default class CalendarEvent {
    constructor(appointment) {
        this.id = appointment.id;
        this.title = appointment.title;
        this.start = new Date(DateFormatHelper.toStringFullCalendarFormatted(appointment.date, appointment.time));
        this.end = new Date(DateFormatHelper.toStringFullCalendarFormatted(appointment.date, "18:00:00"));       
        this.appointment = appointment;
    }
}