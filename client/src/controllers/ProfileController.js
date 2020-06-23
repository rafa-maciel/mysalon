import DefaultDashboardController from "./DefaultDashboardController";
import ProfessionalForm from "../views/ProfessionalForm";
import ListenerAction from "../components/ListenerAction";
import ProfessionalService from "../services/ProfessionalService";
import BindProxyModelView from "../helpers/BindProxyModelView";
import AlertMessage from "../models/AlertMessage";
import AlertMessageView from "../views/AlertMessageView";
import HttpHelper from "../helpers/HttpHelper";
import Modal from "../components/Modal";
import PasswordResetForm from "../views/PasswordResetForm";
import Button from "../components/Button";

export default class ProfileController extends DefaultDashboardController {
    _init() {
        this._service = new ProfessionalService();
        this._buttonsMenuEl = document.querySelector(".buttons-menu-bar");
        this._contentEl = document.querySelector(".main-content");

        this._initTopNavButtons();
        this._initMessages();
        this._initProfilePanel();
        this._initPasswordResetModal();
    }

    _initTopNavButtons() {
        let resetPasswordEl = new Button("Resetar Minha Senha", "btn btn-primary ", "button", 
            new ListenerAction("click", () => {this._showPasswordResetModal()}));

        this._buttonsMenuEl.appendChild(resetPasswordEl);
    }

    
    _initMessages() {
        let messageEl = document.createElement("div");
        this._contentEl.appendChild(messageEl);

        this._message = new BindProxyModelView(new AlertMessage(),
            new AlertMessageView(messageEl),
            'update');
    }

    _initProfilePanel() {
        this._profileForm = new ProfessionalForm(this._contentEl, true, 
        new ListenerAction('submit', event => {
            event.preventDefault();
            this.saveProfile();
        }));

        
        
        let email = new HttpHelper().getStoredItem('email');
        this._preLoader.run(
            this._service.getProfessionalByEmail(email)
                .then(professiontal => {
                    this._profileForm.professional = professiontal;
                })
        );
    }

    _initPasswordResetModal() {
        this._passwordResetModal = new Modal(this._contentEl, {
            'id': 'pwdresetModal',
            'title': 'Resetar Minha Senha',
            'footer': false
        });

        this._passwordResetForm = new PasswordResetForm(this._passwordResetModal.contentSelector, 
            new ListenerAction('submit', event => {
                event.preventDefault();
                this.resetPassword();
            }));
    }

    _showPasswordResetModal() {
        this._passwordResetForm.reset();
        this._passwordResetModal.show();
    }

    resetPassword() {
        let password = this._passwordResetForm.getData().password;
        this._preLoader.run(
            this._service.resetPassword(password)
                .then(() => {
                    this._message.update('', 'Sua senha foi alterada com sucesso', 'success');
                    this._passwordResetModal.hide();
                })
        );
    }

    saveProfile() {
        let professional = this._profileForm.professional;
        this._preLoader.run(
            this._service.updateProfessional(professional)
                .then(professional => {
                    this._message.update('', 'Perfil atualizado com sucesso', 'success');
                })
        );
    }
}