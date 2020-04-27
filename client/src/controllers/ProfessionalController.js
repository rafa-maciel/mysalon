import ModelView from "../helpers/BindProxyModelView";
import ProfessionalService from "../services/ProfessionalService";
import AlertMessage from "../models/AlertMessage";
import AlertMessageView from "../views/AlertMessageView";
import Modal from '../components/Modal';
import ProfessionalForm from '../views/ProfessionalForm';
import Professional from "../models/Professional";
import ModelList from "../models/ModelList";
import Button from "../components/Button";
import ListenerAction from "../components/ListenerAction";
import ProfessionalsTable from "../views/ProfessionalsTable";
import ConfirmModal from "../components/ConfirmModal";
import ProxyModelComponent from "../helpers/ProxyModelComponent";

export default class ProfessionalController {
    constructor() {
        this._professionals = new ProxyModelComponent(new ModelList(),
            new ProfessionalsTable('#professionalList', 
                id => {this._editProfessional(id)},
                id => {this._confirmRemoveProfessional(id)}),
            'add', 'remove');
        

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
        this._initModalFormButtons();

        document.querySelector('.btn-create-professional').addEventListener('click', () => {
            this._createProfessional();
        });
    }

    _initModalFormButtons() {
        this._modalForm.updateFooter(
            new Button('Salvar', 'btn btn-primary btn-lg', 'button', 
                new ListenerAction('click', () => {this.saveProfessionalForm()})));
    }

    saveProfessionalForm() {
        let dto = this._professionalForm.professional;
        let savePromisse = dto.id ? this._service.updateProfessional(dto) : this._service.createProfessional(dto);

        savePromisse.then(professional => {
            this._professionals.add(professional);
            this._modalForm.hide();
            this._message.update('',
                `Os dados do(a) ${professional.name} foram salvos com sucesso`, 
                'success');
        });
    }
   
    deleteProfessional(id) {
        this._service.deteleProfessional(id)
            .then(() => {
                this._modalConfirmRemove.hide();
                this._professionals.remove(id);
                this._message.update('Os dados do profissional foram removidos definitivamente',
                    'Profissional removido!', 'info');
            })
    }

    _confirmRemoveProfessional(id) {
        let professional = this._professionals.find(id);
        this._modalConfirmRemove.update(`Você tem certeza que deseja remover definitivamente o(a) professional <strong>${professional.name}</strong> do sistema?`, 
            professional.id);
        this._modalConfirmRemove.show();
    }

    _editProfessional(id) {
        let professional = this._professionals.find(id);
        this._professionalForm.professional = professional;
        this._modalForm.show();
    }

    _createProfessional() {
        this._professionalForm.professional = new Professional();
        this._modalForm.show();
    }

    _updateProfessionalTable() {
        this._service.getAllProfessionals()
            .then(professionalsList => professionalsList.forEach(professional => this._professionals.add(professional)));
        
        this._message.update('A lista de profissionais foi sincronizada com o servidor',
            'Lista de Profissionais atualizada!', 
            'info');
    }

}