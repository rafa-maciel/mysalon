import SidebarNav from "../components/SidebarNav";
import ListenerAction from "../components/ListenerAction";
import DashboardPageLayout from "../components/DashboardPageLayout";

export default class AppController {

    constructor() {
        this._layout = new DashboardPageLayout();
        this._initSidebar();
    }

    _initSidebar() {
        this._sidebar = new SidebarNav(this._layout.sidebarNavSelector);

        this._sidebar.addItemListenerAction('professionals', 
            new ListenerAction('click', () => {this._startProfessionalController()}));


        this._sidebar.addItemListenerAction('customers', 
            new ListenerAction('click', () => {this._startCustomerController()}));

        this._sidebar.addItemListenerAction('appointments', 
            new ListenerAction('click', () => {this._startAppointmentsController()}));

        this._sidebar.addItemListenerAction('purchases', 
            new ListenerAction('click', () => {this._startPurchasesController()}));

        this._sidebar.addItemListenerAction('calendar', 
            new ListenerAction('click', () => {this._startCalendarController()}));
        
            this._sidebar.addItemListenerAction('profile', 
            new ListenerAction('click', () => {this._startProfileController()}));
    }

    get layout() {
        return this._layout;
    }

    _startProfessionalController() {
        this._cleanOlderContent();
        import('./ProfessionalController')
            .then((ProfessionalController) => {new ProfessionalController.default()});
    }

    _startCustomerController() {
        this._cleanOlderContent();
        import('./CustomerController')
            .then((CustomerController) => {new CustomerController.default()});
    }

    _startAppointmentsController() {
        this._cleanOlderContent();
        import('./AppointmentController')
            .then((AppointmentController) => {new AppointmentController.default()});
    }

    _startPurchasesController() {
        this._cleanOlderContent();
        import('./PurchaseController')
            .then((PurchaseController) => {new PurchaseController.default()});
    }

    _startCalendarController() {
        this._cleanOlderContent();
        import('./CalendarController')
            .then((CalendarController) => {new CalendarController.default()});
    }

    _startProfileController() {
        this._cleanOlderContent();
        import('./ProfileController')
            .then((ProfileController) => {new ProfileController.default()});
    }

    _cleanOlderContent() {
        document.querySelector(".buttons-menu-bar").innerHTML = "";
        document.querySelector(".main-content").innerHTML = "";
    }
}