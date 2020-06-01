import HttpHelper from "../helpers/HttpHelper";
import Pageable from "../models/Pageable";
import Appointment from "../models/Appointment";
import Customer from "../models/Customer";
import Professional from "../models/Professional";
import Service from "../models/Service";
import Payment from "../models/Payment";

export default class AppointmentService {
    constructor() {
        this._serverUrl = `${SERVICE_URL}/appointments`;
        this._http = new HttpHelper();
    }

    getPageableAppointments(parameters) {
        let endpoint = this._serverUrl + '/search';
        if (parameters)
            endpoint = endpoint + '?' + parameters;
        
        return this._http.get(endpoint)
            .then(dataArray =>
                Pageable.buildFrom(dataArray, 
                    dataArray['content'].map(data => this._getAppointmentFromData(data)))
            );
    }

    getDetailed(id) {
        let endpoint = this._serverUrl + "/" + id;
        return this._http.get(endpoint)
            .then(data => this._getAppointmentFromData(data));
    }

    createAppointment(appointmentDTO) {
        let endpoint = this._serverUrl;
        return this._http.post(endpoint, JSON.stringify(appointmentDTO))
            .then(data => this._getAppointmentFromData(data));
    }

    updateAppointment(appointmentDTO) {
        let endpoint = this._serverUrl + "/" + appointmentDTO.id;
        return this._http.put(endpoint, JSON.stringify(appointmentDTO))
            .then(data => this._getAppointmentFromData(data));
    }

    deleteAppointment(id) {
        let endpoint = this._serverUrl + "/" + id;
        return this._http.delete(endpoint);
    }

    _getAppointmentFromData(data) {
        let customer = this._getCustomerFromData(data['customer']);
        let professional = this._getProfessionalFromData(data['professional']);
        let service = data['service'] ? this._getServiceFromData(data['service']) : null;
        
        return new Appointment(customer, professional, data['date'], 
            data['time'], data['title'], data['notes'], data['done'], service, data['id']);
    }

    _getCustomerFromData(data) {
        return new Customer(data['fullname'], data['residencialPhone'], 
            data['cellphone'], data['indicatedBy'], data['professionalEngagedName'],
            data['id']);
    }

    _getProfessionalFromData(data) {
        return new Professional(data['name'], data['residencialPhone'], 
            data['cellphone'], data['department'], data['email'], data['id']);
    }

    _getServiceFromData(data) {
        let payment = this._getPaymentFromData(data['payment']);
        return new Service(data['notes'], payment, data['id']);
    }

    _getPaymentFromData(data) {
        return new Payment(data['value'], data['method'], data['date'], data['notes'], data['id']);
    }
}

