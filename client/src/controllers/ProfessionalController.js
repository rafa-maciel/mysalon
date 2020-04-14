import ModelView from "../helpers/BindProxyModelView";
import ProfessionalsList from "../models/ProfessionalsList";
import ProfessionalsListView from "../views/ProfessionalsListView";
import ProfessionalForm from "../forms/ProfessionalForm";
import ProfessionalFormView from "../views/ProfessionalFormView";
import ProfessionalService from "../services/ProfessionalService";
import AlertMessage from "../models/AlertMessage";
import AlertMessageView from "../views/AlertMessageView";

export default class ProfessionalController {
    constructor() {
        this._professionalsList = new ModelView(new ProfessionalsList(), 
            new ProfessionalsListView(document.querySelector('#professionalList')), 'add', 'remove');

        this._form = new ModelView(new ProfessionalForm(document.querySelector('#professionalForm')),
            new ProfessionalFormView(document.querySelector('#professionalFormFields')),
            'clean', 'include', 'addErrors');

        this._message = new ModelView(new AlertMessage(),
            new AlertMessageView(document.querySelector('#alertMessage')), 
            'update');

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
                this._message.update('Os dados do profissional foram removidos definitivamente',
                    'Profissional removido!', 'info');
            })
    }

    _updateProfessional(professionalDto) {
        this._service.updateProfessional(professionalDto)
            .then(professional => {
                this._professionalsList.add(professional)
                this._showFormModal(false);
                this._message.update(`Os dados do(a) ${professional.name} foram atualizados com sucesso`,
                    'Profissional atualizado!', 
                     'success');
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
                this._message.update(`${professional.name} foi cadastrado com sucesso`,
                    'Profissional Cadastrado!', 
                    'success');
            })
            .catch(fieldErrors => {
                this._form.addErrors(fieldErrors);
            });
    }

    _updateProfessionalsList() {
        this._professionalsList.clean();
        this._service.getAllProfessionals()
            .then(professionalsList => professionalsList.forEach(professional => this._professionalsList.add(professional)));
        
        this._message.update('A lista de profissionais foi sincronizada com o servidor',
            'Lista de Profissionais atualizada!', 
            'info');
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