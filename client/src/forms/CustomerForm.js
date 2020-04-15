import Customer from "../models/Customer";
import CustomerDTO from "../dtos/CustomerDTO";

export default class CustomerForm {
    constructor() {
        this._customer = new Customer();
        this._errors = [];
        this._professionalsList = [];
    }

    get customer() {
        return this._customer;
    }

    get professionalList() {
        return this._professionalsList;
    }

    get errors() { 
        return this._errors;
    }

    updateProfessionalsList(professionalsList) {
        this._professionalsList = professionalsList;
    }

    include(customer) {
        this._customer = customer;
        this._errors = [];
    }

    convertToDTOModel() {
        let fullname = document.querySelector('input[name="fullname"]').value;
        let residencialPhone = document.querySelector('input[name="residencialPhone"]').value;
        let cellphone = document.querySelector('input[name="cellphone"]').value;
        let indicatedBy = document.querySelector('input[name="indicatedBy"]').value;
        let professionalEngagedId = document.querySelector('select[name="professionalEngaged"]').value;
        let id = document.querySelector('input[name="id"]').value;
        
        return new CustomerDTO(fullname, residencialPhone, cellphone, indicatedBy, professionalEngagedId, id);
    }

    addErrors(errors) {
        errors.forEach(error => this._errors.push(error));
    }

    clean() {
        this._customer = new Customer();
        this._errors = [];
    }

}