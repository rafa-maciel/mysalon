import Form from "../components/Form";
import Button from "../components/Button";
import ProfessionalService from "../services/ProfessionalService";
import Appointment from "../models/Appointment";
import DOMParserUtil from "../helpers/DOMParserUtil";
import Modal from "../components/Modal";
import CustomerForm from "./CustomerForm";
import ListenerAction from "../components/ListenerAction";
import Customer from "../models/Customer";
import CustomerService from "../services/CustomerService";
import CustomerSelectTable from "./CustomerSelectTable";
import AppointmentDTO from "../dtos/AppointmentsDTO";

export default class AppointmentForm extends Form {
    constructor(parentSelector, ...listeners) {
        super(parentSelector, {
            'id': 'appointmentForm',
            listeners
        });

        this._appointment = new Appointment();
        this._professionalList = [];
        new ProfessionalService().getAllProfessionals()
            .then(professionals => {
                this._professionalList = professionals;
                this.updateFields();
            });

        this._customerModal = new Modal('main', {
            'id': 'customerSelectionModal',
            'title': "Cadastrar novo Cliente",
            'footer': true
        });

        this._customerService = new CustomerService();
    }

    _showForNewCustomer() {
        this._customerModal.cleanContent();
        this._customerForm = new CustomerForm(this._customerModal.contentSelector);

        this._customerModal.updateFooter(
            new Button('Cadastrar', 'btn btn-primary btn-block', 'button',
                new ListenerAction('click', () => {this._submitNewCustomerForm()}))
        );
        this._customerModal.show();
    }

    _showForSearchCustomer() {
        this._customerModal.cleanContent();
        this._customerForm = new CustomerSelectTable(this._customerModal.contentSelector,
                customer => {
                    this._setCustomer(customer)
                    this._customerModal.hide();
                });
        
        this._customerModal.cleanFooter();
        this._customerModal.show();
    }

    _submitNewCustomerForm() {
        let customerDTO = this._customerForm.getCustomerDTO();

        this._customerService.createCustomer(customerDTO)
            .then(customer => {
                this._setCustomer(customer);
                this._customerModal.hide();
            });
    }

    _setCustomer(customer) {
        this._appointment.customer = customer;
        this.updateFields();
    }

    set appointment(appointment) {
        this._appointment = appointment;
        this.updateFields();
    }

    getAsDTO() {
        let data = this.getData();
        
        return new AppointmentDTO(data['customerId'], data['professionalId'], data['date'], 
            data['time'], data['title'], data['notes'], data['done'], data['id']);
    }

    _template() {
        let btnNCustomerId = 'btnCreateCustomer';
        let btnSCustomerId = 'btnSearchCustomer';

        let template = `
            <div>
                <input type="hidden" class="form-control" name="id" 
                    value="${this._appointment.id ? this._appointment.id : ''}" />
                <input type="hidden" class="form-control" name="customerId"
                    value="${this._appointment.customer ? this._appointment.customer.id : ''}" />
                
                <div class="form-group">
                    <label for="customerName">Cliente</label>
                    <div class="input-group">
                        <input type="text" class="form-control" aria-describedby="button-addon4" readonly name="customerName"
                            value="${this._appointment.customer ? this._appointment.customer.fullname : ''}">
                        <div class="input-group-append" id="button-addon4">
                            <button class="btn btn-outline-primary" type="button" id="${btnNCustomerId}">Novo</button>
                            <button class="btn btn-outline-secondary" type="button" id="${btnSCustomerId}">Encontrar</button>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="professionalId">Professional Responsável</label>
                    <select name="professionalId" class="form-control">
                        ${this._professionalList.map(professional => `
                            <option value="${professional.id}" ${this._appointment.professional && 
                                this._appointment.professional.id == professional.id ? 'selected' : ''}>
                                    ${professional.name}
                            </option>
                        `).join('')}
                    </select>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="date">Data</label>
                        <input type="date" class="form-control" name="date" 
                            value="${this._appointment.date ? this._appointment.date.toISOString().slice(0,10) : ''}">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="time">Horário</label>
                        <input type="time" class="form-control" name="time"
                            value="${this._appointment.time ? this._appointment.time : ''}">
                    </div>
                </div>

                <div class="form-group">
                    <label for="title">Titulo</label>
                    <input type="text" class="form-control" name="title"
                        value="${this._appointment.title ? this._appointment.title : ''}">
                </div>

                <div class="form-group">
                    <label for="notes">Anotações</label>
                    <textarea class="form-control" name="notes">${this._appointment.notes ? this._appointment.notes : ''}</textarea>
                </div>

                ${this._appointment.id ? `
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" name="done" value="true" ${this._appointment.done ? 'checked' : ''}>
                        <label class="form-check-label">Concluido</label>
                    </div>
                ` : ''}
            </div>
        `;

        let form = DOMParserUtil.parse(template);
        form.querySelector('#' + btnNCustomerId)
            .addEventListener('click', () => {this._showForNewCustomer()});

        form.querySelector('#' + btnSCustomerId)
            .addEventListener('click', () => {this._showForSearchCustomer()});

        return form;
    }
}