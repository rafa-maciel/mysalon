import DateFormatHelper from "../helpers/DateFormatHelper";

export default class CalendarEvent {
    constructor(appointment) {
        this.id = appointment.id;
        this.title = appointment.title;
        this.start = DateFormatHelper.toDateFullCalendarFormatted(appointment.date, appointment.time);
        this.end = DateFormatHelper.toDateFullCalendarFormatted(appointment.date, appointment.endTime);
        this.appointment = appointment;
        this.backgroundColor = appointment.professional.identifiedColor;
    }
}