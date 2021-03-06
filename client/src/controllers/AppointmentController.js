import DefaultDashboardController from "./DefaultDashboardController";
import AppointmentService from "../services/AppointmentService";
import BindProxyModelView from "../helpers/BindProxyModelView";
import AlertMessage from "../models/AlertMessage";
import AlertMessageView from "../views/AlertMessageView";
import ProxyModelComponent from "../helpers/ProxyModelComponent";
import ModelList from "../models/ModelList";
import PageableNavigation from "../components/PageableNavigation";
import AppointmentSearchForm from "../views/AppointmentSearchForm";
import Modal from "../components/Modal";
import AppointmentTable from '../views/AppointmentTable';
import Button from "../components/Button";
import ListenerAction from "../components/ListenerAction";
import AppointmentTabPanelForm from "../views/AppointmentTabPanelForm";
import ConfirmModal from "../components/ConfirmModal";
import DateFormatHelper from "../helpers/DateFormatHelper";

export default class AppointmentController extends DefaultDashboardController {
    _init() {
        this._service = new AppointmentService();
        this._buttonsMenuEl = document.querySelector(".buttons-menu-bar");
        this._contentEl = document.querySelector(".main-content");


        this._initTopNavButtons();
        this._initAlertMessages();
        this._initAppointmentsTable();
        this._initAppointmentFormModal();
        this._initRemoveConfirmationModal();
    }

    _initTopNavButtons() {
        let elCreate = new Button("Cadastrar Atendimento", "btn btn-primary ", "button", 
            new ListenerAction("click", () => {this._createAppointment()}));

        let elFilter = new Button("Filtrar Pesquisa", "btn btn-secondary ", "button", 
            new ListenerAction("click", () => {this._searchModal.show()}));

        this._buttonsMenuEl.appendChild(elCreate);
        this._buttonsMenuEl.appendChild(elFilter);
    }

    _initAlertMessages() {
        let messageEl = document.createElement("div");
        this._contentEl.appendChild(messageEl);

        this._message = new BindProxyModelView(new AlertMessage(),
            new AlertMessageView(messageEl),
            'update');
    }

    _initAppointmentsTable() {
        this._appointments = new ProxyModelComponent(new ModelList(),
            new AppointmentTable(this._contentEl,
                id => {this._editAppointment(id)}, 
                id => {this._showRemoveModalConfirmation(id)}),
            'add', 'remove', 'clean');

        this._tableNav = new PageableNavigation(this._contentEl, {
            'id': 'tableNav'
        }, page => {this.searchAppointments(page)});

        this._initAppointmentsSearchForm();
        this.searchAppointments();
    }

    _initAppointmentsSearchForm() {
        this._searchModal = new Modal(this._contentEl, {
            'id': 'searchModal',
            'title': 'Filtro de Pesquisa'
        });

        this._searchForm = new AppointmentSearchForm(this._searchModal.contentSelector, 
            new ListenerAction('submit', event => {
                event.preventDefault();
                this.searchAppointments();
                this._searchModal.hide();
            }));
    }

    _initAppointmentFormModal() {
        this._modalForm = new Modal(this._contentEl, {
            'id': 'appointmentFormModal',
            'title': 'Formulário de Atendimento',
            'footer': true
        });

        this._panelForm = new AppointmentTabPanelForm(this._modalForm.contentSelector);

        this._modalForm.updateFooter(
            new Button('Salvar', 'btn btn-primary btn-lg', 'button',
                new ListenerAction('click', () => {this.saveAppointmentForm()}))
        );
    }

    _initRemoveConfirmationModal() {
        this._modalRemoveConfirmation = new ConfirmModal(this._contentEl, {
            "id": "removeConfirmationModal",
            "title": 'Remover Atendimento',
            "buttonLabel": "Remover Definitivamente"
        }, id => {this.deleteAppointment(id)});
    }
    


    _createAppointment() {
        this._panelForm.newMode();
        this._modalForm.show();
    }

    _editAppointment(id) {
        this._preLoader.run(
            this._service.getDetailed(id)
                .then(appointment => {
                    this._panelForm.updateMode(appointment);
                    this._modalForm.show();
                })
        );
    }

    _showRemoveModalConfirmation(id) {
        let appointment = this._appointments.find(id);
        this._modalRemoveConfirmation.update(`
            Você tem certeza que deseja remover definitivamente o atendimento do
            cliente ${appointment.customer.fullname} marcado para o dia
            ${DateFormatHelper.toString(appointment.date)}?
        `, id);
        this._modalRemoveConfirmation.show();
    }

    saveAppointmentForm() {
        let appointmentDTO = this._panelForm.getAppointmentDTO();
        
        let promisse = this._panelForm.isUpdateMode() ?
            this._service.updateAppointment(appointmentDTO) :
            this._service.createAppointment(appointmentDTO);

        this._preLoader.run(
            promisse.then(appointment => {
                this._appointments.add(appointment);
                this._modalForm.hide();
                this._message.update('', 'Os dados do atendimento foram salvos com sucesso', 'success');
            })
        )

    }

    searchAppointments(page=null) {
        let parameters = this._searchForm.getDataAsParams();
        if (page != null) parameters = parameters + '&page=' + page;

        this._appointments.clean();
        this._preLoader.run(
            this._service.getPageableAppointments(parameters)
                .then(pageable => {
                    pageable.content.forEach(appointment => {
                        this._appointments.add(appointment)
                    });
                    this._tableNav.update(pageable);
                    this._message.update('A lista de atendimentos está atualizada', 'Lista Atualizada', 'info');
                })
        );
    }

    deleteAppointment(id) {
        this._preLoader.run(
            this._service.deleteAppointment(id)
                .then(() => {
                    this._modalRemoveConfirmation.hide();
                    this._appointments.remove(id);
                    this._message.update('', 'Atendimento removido com sucesso', 'success');
                })
        );
    }
}