import NavTabPanel from "../components/NavTabPanel";
import AppointmentForm from "./AppointmentForm";
import Appointment from "../models/Appointment";
import ServiceForm from "./ServiceForm";
import PaymentForm from "./PaymentForm";
import Service from "../models/Service";
import Payment from "../models/Payment";

export default class AppointmentTabPanelForm extends NavTabPanel {
    constructor(parentSelector) {
        super(parentSelector);

        this._appointmentTab = this.addTab('Atendimento', 'appointment', true);
        this._appointmentForm = new AppointmentForm(this._appointmentTab.contentId);

        this._serviceTab = this.addTab('Serviço', 'service');
        this._serviceForm = new ServiceForm(this._serviceTab.contentId);

        this._paymentTab = this.addTab('Pagamento', 'payment');
        this._paymentForm = new PaymentForm(this._paymentTab.contentId);

        this._updateMode = false;
    }

    get appointmentForm() {
        return this._appointmentForm;
    }

    getAppointmentDTO() {
        let appointmentDTO = this._appointmentForm.getAsDTO();
        if (this._updateMode) {
            let serviceData = this._serviceForm.getData();
            appointmentDTO.setService(serviceData['serviceNotes']);

            let paymentData = this._paymentForm.getData();
            appointmentDTO.setPayment(paymentData['paymentValue'], paymentData['paymentMethod'], paymentData['paymentDate'], paymentData['paymentNotes']);
        }

        return appointmentDTO;
    }

    newMode() {

        this._appointmentForm.appointment = new Appointment();
        this.setTabAs(this._serviceTab.tabId, true);
        this.setTabAs(this._paymentTab.tabId, true);
        this.setAsActive(this._appointmentTab.tabId, this._appointmentTab.contentId);

        this._updateMode = false;
    }

    updateMode(appointment) {
        this._appointmentForm.appointment = appointment;
        this._serviceForm.service = appointment.service ? appointment.service : new Service();
        this._paymentForm.payment = appointment.service && appointment.service.payment ? 
            appointment.service.payment : new Payment();

        this.setTabAs(this._serviceTab.tabId, false);
        this.setTabAs(this._paymentTab.tabId, false);
        this.setAsActive(this._appointmentTab.tabId, this._appointmentTab.contentId);
        this._updateMode = true;
    }

    isUpdateMode() {
        return this._updateMode;
    }


}