import Professional from '../models/Professional'

export default class ProfessionalForm {
    constructor(formElement) {
        this._professional = null;

        this._name = formElement.querySelector('input[name="name"]');
        this._residencialPhone = formElement.querySelector('input[name="residencialPhone"]');
        this._cellphone = formElement.querySelector('input[name="cellphone"]');;
        this._departament = formElement.querySelector('input[name="departament"]');;
    }

    get professional() {
        return this._professional;
    }

    include(professional) {
        this._professional = professional;

        this._name.value = professional.name;
        this._residencialPhone.value = professional.residencialPhone;
        this._cellphone.value = professional.cellphone;
        this._departament.value = professional.departament;
    }

    convertToModel() {
        return new Professional(this._name.value,
            this._residencialPhone.value,
            this._cellphone.value,
            this._departament.value);
    }

    clean() {
        this.professional = null;

        this._name.value = '';
        this._residencialPhone.value = '';
        this._cellphone.value = '';
        this._departament.value = '';
    }
}