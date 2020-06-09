import DefaultDashboardController from "./DefaultDashboardController";
import AppointmentService from "../services/AppointmentService";
import CalendarEvent from "../models/CalendarEvent";
import Calendar from "../components/Calendar";

export default class ScheduleController extends DefaultDashboardController {
    _init() {
        this._appointmentService = new AppointmentService();
        this._initScheduleComponent();
    }

    _initScheduleComponent() {
        this._getWeekAppointments()
            .then(events => {
                this._calendar = new Calendar('.calendar', events, this._showEvent)
            });
        
    }

    _getWeekAppointments() {
        return this._appointmentService.getPageableAppointments()
            .then(pageable => pageable.content)
            .then(appointments => appointments.map(appointment => new CalendarEvent(appointment)));
    }

    _showEvent(info) {
        console.log(info.event.extendedProps);
    }
}