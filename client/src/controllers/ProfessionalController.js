import ModelView from "../helpers/BindProxyModelView";
import ProfessionalsList from "../models/ProfessionalsList";
import ProfessionalsListView from "../views/ProfessionalsListView";
import ProfessionalForm from "../forms/ProfessionalForm";
import ProfessionalFormView from "../views/ProfessionalFormView";

export default class ProfessionalController {
    constructor() {
        this._professionalsList = new ModelView(new ProfessionalsList(), 
            new ProfessionalsListView(document.querySelector('#')), 
            'add');

        this._form = new ModelView(new ProfessionalForm(document.querySelector('#professionalForm')),
            new ProfessionalFormView(document.querySelector('#modalForm')),
            'clean', 'include');
    }

    cleanProfessionalForm() {
        this._form.clean();
    }
}