import HttpHelper from "../helpers/HttpHelper";
import Customer from "../models/Customer";
import Pageable from "../models/Pageable";

export default class CustomerService {
    constructor() {
        this._serverURL = `${SERVICE_URL}/customers`;
        this._http = new HttpHelper();
    }

    getCustomers(dataFilter) {
        let endpoint = this._serverURL;
        return this._http.getFiltered(endpoint, this._getFilterData(dataFilter))
            .then(pageableContent => {
                return {
                    'pageable': this._getPageableCustomersFromData(pageableContent),
                    'customers': pageableContent['content'].map(data => this._getCustomerFromData(data))
                }
            })
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

    _getPageableCustomersFromData(data) {
        let pgdetails = data['pageable']
        return new Pageable(pgdetails['pageNumber'], pgdetails['pageSize'], data['totalElements'], 
            data['totalPages'], data['numberOfElements'], data['first'], data['last'], data['number'], 
            data['size'], data['empty']);
    }

    _getCustomerFromData(data) {
        return new Customer(data['fullname'], data['residencialPhone'], data['cellphone'], data['indicatedBy'], data['professionalEngagedName'], data['id']);
    }

    _getFilterData(data) {
        if (data.hasOwnProperty('name') || data.hasOwnProperty('professionalEngagedName')) {
            let name = data['name'] ? data['name'] : '';
            let professionalEngaged = data['professionalEngagedName'] ? data['professionalEngagedName'] : '';
            return `name=${name}&professionalEngagedName=${professionalEngaged}`;
        }
        return '';
    }

}