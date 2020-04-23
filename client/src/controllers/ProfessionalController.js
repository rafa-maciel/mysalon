import ModelView from "../helpers/BindProxyModelView";
import ProfessionalService from "../services/ProfessionalService";
import AlertMessage from "../models/AlertMessage";
import AlertMessageView from "../views/AlertMessageView";
import Modal from '../components/Modal';
import ProfessionalForm from '../views/ProfessionalForm';
import Professional from "../models/Professional";
import Button from "../components/Button";
import ListenerAction from "../components/ListenerAction";
import ProfessionalsTableList from "../views/ProfessionalsTableList";
import ConfirmModal from "../components/ConfirmModal";

export default class ProfessionalController {
    constructor() {
        this._professionalTable = new ProfessionalsTableList('#professionalList', 
            id => {this.editProfessional(id)},
            id => {this.confirmRemoveProfessional(id)});

        this._message = new ModelView(new AlertMessage(),
            new AlertMessageView(document.querySelector('#alertMessage')), 
            'update');

        this._modalForm = new Modal('#modalForm', {
            'id': 'MForm',
            'title': 'Formulário do Profissional',
            'footer': true
        });

        this._modalConfirmRemove = new ConfirmModal("#modalForm", {
            "id": "modalConfirmRemove",
            "title": "Remover Profissional", 
            "buttonLabel": "Remover definitivamente"
        }, id => {this.deleteProfessional(id)});

        this._professionalForm = new ProfessionalForm(this._modalForm.contentSelector);

        this._service = new ProfessionalService();
        this._init();
    }

    _init() {
        this._updateProfessionalTable();
        this._modalForm.updateFooter(
            new Button('Salvar', 'btn btn-primary btn-lg', 'button', 
                new ListenerAction('click', () => {this.saveProfessionalForm()})));

        document.querySelector('.btn-create-professional').addEventListener('click', () => {
            this.createProfessional();
        });
    }

    confirmRemoveProfessional(id) {
        let professional = this._professionalTable.find(id);
        this._modalConfirmRemove.update(`Você tem certeza que deseja remover definitivamente o(a) professional <strong>${professional.name}</strong> do sistema?`, 
            professional.id);
        this._modalConfirmRemove.show();
    }

    editProfessional(id) {
        let professional = this._professionalTable.find(id);
        this._professionalForm.professional = professional;
        this._modalForm.show();
    }

    createProfessional() {
        this._professionalForm.professional = new Professional();
        this._modalForm.show();
    }

    saveProfessionalForm() {
        let dto = this._professionalForm.professional;
        if(dto.id) {
            this._service.updateProfessional(dto)
                .then(professional => {
                    this._professionalTable.update(professional)
                    this._modalForm.hide();
                    this._message.update(`Os dados do(a) ${professional.name} foram atualizados com sucesso`,
                    'Profissional atualizado!', 
                     'success');
                });
        } else {
            this._service.createProfessional(dto)
                .then(professional => {
                    this._professionalTable.add(professional);
                    this._modalForm.hide();
                    this._message.update(`${professional.name} foi cadastrado com sucesso`,
                        'Profissional Cadastrado!', 
                        'success');
            })
        }
    }
   
    deleteProfessional(id) {
        this._service.deteleProfessional(id)
            .then(() => {
                this._modalConfirmRemove.hide();
                this._professionalTable.remove(id);
                this._message.update('Os dados do profissional foram removidos definitivamente',
                    'Profissional removido!', 'info');
            })
    }

    _updateProfessionalTable() {
        this._professionalTable.clean();
        this._service.getAllProfessionals()
            .then(professionalsList => professionalsList.forEach(professional => this._professionalTable.add(professional)));
        
        this._message.update('A lista de profissionais foi sincronizada com o servidor',
            'Lista de Profissionais atualizada!', 
            'info');
    }

}