import HttpHelper from "../helpers/HttpHelper";
import Pageable from "../models/Pageable";
import Appointment from "../models/Appointment";
import Customer from "../models/Customer";
import Professional from "../models/Professional";

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

    _getAppointmentFromData(data) {
        let customer = this._getCustomerFromData(data['customer']);
        let professional = this._getProfessionalFromData(data['professional']);
        
        return new Appointment(customer, professional, data['date'], 
            data['time'], data['title'], data['notes'], data['done'], null, data['id']);
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
}

