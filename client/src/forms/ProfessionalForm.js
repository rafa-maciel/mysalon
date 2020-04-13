import Professional from '../models/Professional'
import ProfessionalDTO from '../dtos/ProfessionalDTO';
import FieldError from './FieldError';

export default class ProfessionalForm {
    constructor(formElement) {
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

        document.querySelector('input[name="name"]').value = professional.name;
        document.querySelector('input[name="residencialPhone"]').value = professional.residencialPhone;
        document.querySelector('input[name="cellphone"]').value = professional.cellphone;
        document.querySelector('select[name="departament"]').value = professional.departament;
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

        document.querySelector('input[name="name"]').value = '';
        document.querySelector('input[name="residencialPhone"]').value = '';
        document.querySelector('input[name="cellphone"]').value = '';
        document.querySelector('select[name="departament"]').value = '';
    }
}