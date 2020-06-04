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
import DefaultDashboardController from "./DefaultDashboardController";

export default class ProfessionalController extends DefaultDashboardController {
    _init() {
        this._service = new ProfessionalService();

        this._initAlertMessages();
        this._initProfessionalsTable();
        this._initProfessionalFormModal();
        this._initRemoveConfirmationModal();
        this.updateProfessionalTable();
        this._initModalFormButtons();
        this._initConfirmRestorePassowordModal();

        document.querySelector('.btn-create-professional').addEventListener('click', () => {
            this._createProfessional();
        });
    }

    saveProfessionalForm() {
        let dto = this._professionalForm.professional;
        let savePromisse = dto.id ? this._service.updateProfessional(dto) : this._service.createProfessional(dto);

        this._preLoader.run(savePromisse.then(professional => {
            this._professionals.add(professional);
            this._modalForm.hide();
            this._message.update('',
                `Os dados do(a) ${professional.name} foram salvos com sucesso`, 
                'success');
        }));
    }

    updateProfessionalTable() {
        this._preLoader.run(
            this._service.getAllProfessionals()
            .then(professionalsList => {
                professionalsList.forEach(professional => this._professionals.add(professional))
                this._message.update('A lista de profissionais foi sincronizada com o servidor',
                    'Lista de Profissionais atualizada!', 
                    'info');
            })
        );
    }
   
    deleteProfessional(id) {
        this._preLoader.run(this._service.deteleProfessional(id)
            .then(() => {
                this._modalConfirmRemove.hide();
                this._professionals.remove(id);
                this._message.update('Os dados do profissional foram removidos definitivamente',
                    'Profissional removido!', 'info');
            }));
    }

    restorePassword(email) {
        this._preLoader.run(
            this._service.restorePassword(email)
                .then(() => {
                    this._modalRestorePassword.hide();
                    this._message.update('A senha do profissional foi restaurada e um novo padrão foi enviada para o e-mail cadastrado',
                        'Senha Alterada', 'success');
                })
            )
    }

    _initProfessionalsTable() {
        this._professionals = new ProxyModelComponent(new ModelList(),
            new ProfessionalsTable('#professionalList', 
                id => {this._editProfessional(id)},
                id => {this._confirmRemoveProfessional(id)},
                email => {this._confirmRestorePassword(email)}),
            'add', 'remove');
    }

    _initAlertMessages() {
        this._message = new ModelView(new AlertMessage(),
            new AlertMessageView(document.querySelector('#alertMessage')), 
            'update');
    }
    
    _initProfessionalFormModal() {
        this._modalForm = new Modal('#modalForm', {
            'id': 'MForm',
            'title': 'Formulário do Profissional',
            'footer': true
        });

        this._professionalForm = new ProfessionalForm(this._modalForm.contentSelector);
    }

    _initRemoveConfirmationModal() {
        this._modalConfirmRemove = new ConfirmModal("#modalForm", {
            "id": "modalConfirmRemove",
            "title": "Remover Profissional", 
            "buttonLabel": "Remover definitivamente"
        }, id => {this.deleteProfessional(id)});
    }

    _initModalFormButtons() {
        this._modalForm.updateFooter(
            new Button('Salvar', 'btn btn-primary btn-lg', 'button', 
                new ListenerAction('click', () => {this.saveProfessionalForm()})));
    }

    _initConfirmRestorePassowordModal() {
        this._modalRestorePassword = new ConfirmModal('main', {
            'id': 'restorePasswordModal',
            'title': 'Restaurar Senha',
            'buttonLabel': 'Restaurar senha e enviar E-mail'
        }, email => {this.restorePassword(email)});


    }

    _confirmRemoveProfessional(id) {
        let professional = this._professionals.find(id);
        this._modalConfirmRemove.update(`Você tem certeza que deseja remover definitivamente o(a) professional <strong>${professional.name}</strong> do sistema?`, 
            professional.id);
        this._modalConfirmRemove.show();
    }

    _confirmRestorePassword(email) {
        this._modalRestorePassword.update(`Você tem certeza que deseja resetar a conta do usuário e criar um novo padrão de senha para o e-mail ${email}`, email);
        this._modalRestorePassword.show();
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

    

}