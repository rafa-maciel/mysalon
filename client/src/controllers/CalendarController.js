import DefaultDashboardController from "./DefaultDashboardController";
import AppointmentService from "../services/AppointmentService";
import AppointmentCalendar from "../views/AppointmentCalendar";
import ProfessionalService from "../services/ProfessionalService";
import ProfessionalSelectOption from "../components/ProfessionalSelectOption";

export default class CalendarController extends DefaultDashboardController {
    _init() {
        this._appointmentService = new AppointmentService();
        this._professionalService = new ProfessionalService();
        this._contentEl = document.querySelector(".main-content");
        this._buttonsMenuEl = document.querySelector(".buttons-menu-bar");
        this._professional = undefined;

        this._initCalendarFilterForm();
    }

    _initTopNavButtons() {
        let selectProfessionalElement = new ProfessionalSelectOption(null, this._professional, 
            (professional) => {
                this._calendar.extraParameters = professional;
            });

        this._buttonsMenuEl.appendChild(selectProfessionalElement.el);
    }

    _initCalendarFilterForm() {
        this._professionalService.getProfessionalByEmail(this._getProfessionalLoggedEmail())
            .then(professional => {
                this._professional = professional;
                this._initTopNavButtons();
                this._initCalendarComponent();
            });
    }

    _initCalendarComponent() {
        this._calendar = new AppointmentCalendar(this._contentEl, this._showEvent, this._getInitialParameter());
    }

    _getInitialParameter() {
        return "professionalId="+this._professional.id;
    }

    _showEvent(info) {
        console.log('to do');
    }
}