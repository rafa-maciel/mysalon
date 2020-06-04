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

export default class ProfileController extends DefaultDashboardController {
    _init() {
        this._service = new ProfessionalService();

        this._initMessages();
        this._initProfilePanel();
        this._initPasswordResetModal();
    }
    
    _initMessages() {
        this._message = new BindProxyModelView(new AlertMessage(),
            new AlertMessageView(document.querySelector('#alertMessage')),
            'update');
    }

    _initProfilePanel() {
        this._profileForm = new ProfessionalForm('#profileForm', true, 
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
        this._passwordResetModal = new Modal('main', {
            'id': 'pwdresetModal',
            'title': 'Resetar Minha Senha',
            'footer': false
        });

        this._passwordResetForm = new PasswordResetForm(this._passwordResetModal.contentSelector, 
            new ListenerAction('submit', event => {
                event.preventDefault();
                this.resetPassword();
            }));

        document.querySelector('.btn-reset-password').addEventListener('click', event => {
            event.preventDefault();
            this._showPasswordResetModal();
        });
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