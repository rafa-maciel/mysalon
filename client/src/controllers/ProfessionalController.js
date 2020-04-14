import ModelView from "../helpers/BindProxyModelView";
import ProfessionalsList from "../models/ProfessionalsList";
import ProfessionalsListView from "../views/ProfessionalsListView";
import ProfessionalForm from "../forms/ProfessionalForm";
import ProfessionalFormView from "../views/ProfessionalFormView";
import Professional from "../models/Professional";
import ProfessionalService from "../services/ProfessionalService";
import FieldError from "../forms/FieldError";

export default class ProfessionalController {
    constructor() {
        this._professionalsList = new ModelView(new ProfessionalsList(), 
            new ProfessionalsListView(document.querySelector('#professionalList')), 'add', 'remove');

        this._form = new ModelView(new ProfessionalForm(document.querySelector('#professionalForm')),
            new ProfessionalFormView(document.querySelector('#professionalFormFields')),
            'clean', 'include', 'addErrors');

        this._service = new ProfessionalService();
        this.init();
    }

    init() {
       this._updateProfessionalsList();
    }

    saveFormProfessional() {
        let dto = this._form.convertToDTOModel();
        if(dto.id) {
            this._updateProfessional(dto);
        } else {
            this._createProfessional(dto);
        }
    }

    showNewProfessionalForm() {
        this._form.clean();
        this._showFormModal();
    }

    showEditProfessionalForm(id) {
        this._service.getProfessionalByID(id)
            .then(professional => {
                this._form.include(professional)
                this._showFormModal();
            });
    }

    deleteProfessional(id) {
        this._service.deteleProfessional(id)
            .then(() => {
                this._showRemoveModal(false);
                this._professionalsList.remove(id);
            })
    }

    _updateProfessional(professionalDto) {
        this._service.updateProfessional(professionalDto)
            .then(professional => {
                this._professionalsList.add(professional)
                this._showFormModal(false);
            })
            .catch(fieldErrors => {
                this._form.addErrors(fieldErrors);
            });
    }

    _createProfessional(professionalDto) {
        this._service.createProfessional(professionalDto)
            .then(professional => {
                this._professionalsList.add(professional)
                this._showFormModal(false);
            })
            .catch(fieldErrors => {
                this._form.addErrors(fieldErrors);
            });
    }

    _updateProfessionalsList() {
        this._professionalsList.clean();
        this._service.getAllProfessionals()
            .then(professionalsList => professionalsList.forEach(professional => this._professionalsList.add(professional)));
    }

    _showFormModal(option=true) {
        if (option) {
            $("#modalProfessional").modal("show");
        } else {
            $("#modalProfessional").modal("hide");
        }
    }

    _showRemoveModal(option=false) {
        if (option) {
            $("#modalProfessionalRemove").modal("show");
        } else {
            $("#modalProfessionalRemove").modal("hide");
        }
    }


}