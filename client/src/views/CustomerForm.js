import Form from "../components/Form";
import Customer from "../models/Customer";
import DOMParserUtil from "../helpers/DOMParserUtil";
import CustomerDTO from "../dtos/CustomerDTO";
import ProfessionalService from "../services/ProfessionalService";

export default class CustomerForm extends Form{
    constructor(parentSelector, ...listeners) {
        super(parentSelector, {
            'id': 'customerForm',
            listeners
        });

        this._customer = new Customer();
        this._professionalList = [];
    
        new ProfessionalService().getAllProfessionals()
            .then(professionalList => {
                this._professionalList = professionalList;
                this.updateFields();
            });
    }

    set customer(customer) {
        this._customer = customer;
        this.updateFields();
    }

    getCustomerDTO() {
        let data = this.getData();
        return new CustomerDTO(data['fullname'], data['residencialPhone'], data['cellphone'], data['indicatedBy'], data['professionalEngaged'], data['id']);
    }

    _template() {
        let template = `
            <div>
                <input type="hidden" class="form-control" id="id" name="id" value="${this._customer.id ? this._customer.id : ''}">
                <div class="form-group">
                    <label for="fullname">Nome</label>
                    <input type="text" min="3" max="20" class="form-control" id="fullname" name="fullname" 
                        placeholder="Juliana Bandeiras" value="${this._customer.fullname ? this._customer.fullname : ''}">
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="residencialPhone">Telefone</label>
                        <input type="text" class="form-control" id="residencialPhone" name="residencialPhone" value="${this._customer.residencialPhone ? this._customer.residencialPhone : ''}">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="cellphone">Celular</label>
                        <input type="text" class="form-control" id="cellphone" name="cellphone" value="${this._customer.cellphone ? this._customer.cellphone : ''}">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="indicatedBy">Indicado Por</label>
                        <input type="text" class="form-control" id="indicatedBy" name="indicatedBy" value="${this._customer.indicatedBy ? this._customer.indicatedBy : ''}">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="professionalEngaged">Profissional Responsável</label>
                        <select id="professionalEngaged" class="form-control" name="professionalEngaged">
                            ${this._professionalList.map(professional => `
                                <option value="${professional.id}" ${this._customer.professionalEngaged == professional.name ? 'selected' : ''}>${professional.name}</option>
                            `).join('')}
                        </select>
                    </div>
                </div>
            </div>
        `;

        return DOMParserUtil.parse(template);
    }

}