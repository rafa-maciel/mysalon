import DefaultDashboardController from "./DefaultDashboardController";
import AppointmentService from "../services/AppointmentService";
import AppointmentCalendar from "../views/AppointmentCalendar";
import CalendarFilterForm from "../views/CalendarFilterForm";
import ProfessionalService from "../services/ProfessionalService";
import ListenerAction from "../components/ListenerAction";

export default class CalendarController extends DefaultDashboardController {
    _init() {
        this._appointmentService = new AppointmentService();
        this._professionalService = new ProfessionalService();
        
        this._initCalendarFilterForm();
    }

    _initCalendarFilterForm() {
        this._filter = new CalendarFilterForm('.professional-form', new ListenerAction('submit', (event) => {
            event.preventDefault();
            this._calendar.extraParameters = this._getFilterParameters();
        }));

        this._professionalService.getProfessionalByEmail(this._getProfessionalLoggedEmail())
            .then(professional => {
                this._filter.professional = professional
                this._initCalendarComponent();
            });
    }

    _initCalendarComponent() {
        this._calendar = new AppointmentCalendar('.calendar', this._showEvent, this._getFilterParameters());
    }

    _getFilterParameters() {
        return this._filter.getDataAsParams();
    }

    _showEvent(info) {
        console.log('to do');
    }
}