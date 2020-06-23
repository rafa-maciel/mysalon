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

export default class ProfessionalController extends DefaultDashboardController{

    _init() {
        this._service = new ProfessionalService();
        this._buttonsMenuEl = document.querySelector(".buttons-menu-bar");
        this._contentEl = document.querySelector(".main-content");

        this._initTopNavButtons();
        this._initAlertMessages();
        this._initProfessionalsTable();
        this._initProfessionalFormModal();
        this._initRemoveConfirmationModal();
        this._initModalFormButtons();
        this._initConfirmRestorePassowordModal();
    }

    _initTopNavButtons() {
        let elCreate = new Button("Cadastrar Profissional", "btn btn-primary ", "button", 
            new ListenerAction("click", () => {this._createProfessional()}));

        this._buttonsMenuEl.appendChild(elCreate);
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
            new ProfessionalsTable('.main-content', 
                id => {this._editProfessional(id)},
                id => {this._confirmRemoveProfessional(id)},
                email => {this._confirmRestorePassword(email)}),
            'add', 'remove');

        this.updateProfessionalTable();
    }

    _initAlertMessages(el) {
        let messageEl = document.createElement("div");
        this._contentEl.appendChild(messageEl);

        this._message = new ModelView(new AlertMessage(),
            new AlertMessageView(messageEl), 
            'update');
    }
    
    _initProfessionalFormModal() {
        this._modalForm = new Modal(this._contentEl, {
            'id': 'MForm',
            'title': 'Formulário do Profissional',
            'footer': true
        });

        this._professionalForm = new ProfessionalForm(this._modalForm.contentSelector, false);
    }

    _initRemoveConfirmationModal() {
        this._modalConfirmRemove = new ConfirmModal(this._contentEl, {
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
        this._modalRestorePassword = new ConfirmModal(this._contentEl, {
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