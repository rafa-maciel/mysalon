import Professional from '../models/Professional'
import ProfessionalDTO from '../dtos/ProfessionalDTO';

export default class ProfessionalForm {
    constructor() {
        this._professional = new Professional();
        this._errors = [];
    }

    get professional() {
        return this._professional;
    }

    get errors() { 
        return this._errors;
    }

    include(professional) {
        this._professional = professional;
        this._errors = [];
    }

    convertToDTOModel() {
        let name = document.querySelector('input[name="name"]').value;
        let residencialPhone = document.querySelector('input[name="residencialPhone"]').value;
        let cellphone = document.querySelector('input[name="cellphone"]').value;
        let departament = document.querySelector('select[name="departament"]').value;
        let id = document.querySelector('input[name="id"]').value;
        
        return new ProfessionalDTO(name, residencialPhone, cellphone, departament, id);
    }

    addErrors(errors) {
        errors.forEach(error => this._errors.push(error));
    }

    clean() {
        this._professional = new Professional();
        this._errors = [];
    }
}