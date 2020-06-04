import Form from '../components/Form'
import ProfessionalDTO from '../dtos/ProfessionalDTO';
import DOMParserUtil from "../helpers/DOMParserUtil";
import Professional from '../models/Professional';

export default class ProfessionalForm extends Form {
    constructor(parentSelector, defaultButtons=false, ...listeners) {
        super(parentSelector, {
            'id': 'professionalForm',
            'defaultButtons': defaultButtons,
            listeners
        });

        this._professional = new Professional();
        this.updateFields()
    }

    set professional(professional) {
        this._professional = professional;
        this.updateFields();
    }

    get professional() {
        let data = this.getData();
        return new ProfessionalDTO(data['name'], data['residencialPhone'], data['cellphone'], data['departament'], data['email'], data['id']);
    }

    _template() {
        let template = `
            <div>
                <input type="hidden" class="form-control" name="id" value="${this._professional.id ? this._professional.id : ''}">
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" min="3" max="20" class="form-control" id="name" name="name" 
                    placeholder="Maria Souza Silva" value="${this._professional.name ? this._professional.name : ''}">
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="residencialPhone">Telefone</label>
                    <input type="text" class="form-control" name="residencialPhone" value="${this._professional.residencialPhone ? this._professional.residencialPhone : ''}">
                    </div>
                    <div class="form-group col-md-6">
                    <label for="cellphone">Celular</label>
                    <input type="text" class="form-control" name="cellphone" value="${this._professional.cellphone ? this._professional.cellphone : ''}">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="departament">Àrea de Atuação</label>
                    <select class="form-control" name="departament">
                        <option value="CABELELEIRA" ${this._professional.departament == 'CABELELEIRA' ? 'selected' : ''}>Cabeleleira</option>
                        <option value="MANICURE" ${this._professional.departament == 'MANICURE' ? 'selected' : ''}>Manicure</option>
                        <option value="DESIGNER_SOBRANCELHAS" ${this._professional.departament == 'DESIGNER_SOBRANCELHAS' ? 'selected' : ''}>Design de Sobrancelhas</option>
                        <option value="DEPILADORA" ${this._professional.departament == 'DEPILADORA' ? 'selected' : ''}>Depiladora</option>
                        <option value="ESTETICISTA" ${this._professional.departament == 'ESTETICISTA' ? 'selected' : ''}>Esteticista</option>
                    </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="email">E-mail</label>
                    <input type="email" min="3" max="20" class="form-control" name="email" 
                        placeholder="maria.silva@gmail.com" value="${this._professional.email ? this._professional.email : ''}">
                </div>
            </div>
        `;

        return DOMParserUtil.parse(template);
    }

}