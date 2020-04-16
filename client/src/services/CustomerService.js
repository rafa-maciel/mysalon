import HttpHelper from "../helpers/HttpHelper";
import Customer from "../models/Customer";

export default class CustomerService {
    constructor() {
        this._serverURL = `${SERVICE_URL}/customers`;
        this._http = new HttpHelper();
    }

    getCustomers() {
        let endpoint = this._serverURL;
        return this._http.get(endpoint)
            .then(dataArray => dataArray.map(data => this._getCustomerFromData(data)))
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possivel conectar ao servidor');
            });
    }

    getCustomerByID(id) {
        let endpoint = `${this._serverURL}/${id}`;
        return this._http.get(endpoint)
            .then(data => this._getCustomerFromData(data))
            .catch(error => {
                console.log(error);
                throw new Error('Ocorreu um error na comunição com o servidor e não foi possivel encontrar o cliente solicitado');
            });
    }

    createCustomer(customerDto) {
        let endpoint = this._serverURL;
        return this._http.saveModel(endpoint, 'POST', JSON.stringify(customerDto))
            .then(data => this._getCustomerFromData(data));
    }

    updateCustomer(customerDto) {
        let endpoint = `${this._serverURL}/${customerDto.id}`;
        return this._http.saveModel(endpoint, 'PUT', JSON.stringify(customerDto))
            .then(data => this._getCustomerFromData(data));
    }

    deleteCustomer(id) {
        let endpoint = `${this._serverURL}/${id}`
        return this._http.deleteModel(endpoint)
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possivel remover o cliente solicitado');
            });
    }

    _getCustomerFromData(data) {
        return new Customer(data['fullname'], data['residencialPhone'], data['cellphone'], data['indicatedBy'], data['professionalEngagedName'], data['id']);
    }

}