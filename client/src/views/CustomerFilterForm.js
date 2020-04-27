import Form from "../components/Form";
import ProfessionalService from "../services/ProfessionalService";
import DOMParserUtil from "../helpers/DOMParserUtil";
import Button from "../components/Button";
import ListenerAction from "../components/ListenerAction";

export default class CustomerFilterForm extends Form{
    constructor(parentSelector, ...listeners) {
        super(parentSelector, {
            'id': 'customerFilterForm',
            'buttons': true,
            'initialButtons': [
                new Button('Filtrar', 'btn btn-primary btn-sm float-rigth', 'submit'),
                new Button('Limpar Filtro', 'btn btn-secondary btn-sm', 'reset'),
            ],
            listeners
        });

        this._professionalList = [];
    
        new ProfessionalService().getAllProfessionals()
            .then(professionalList => {
                this._professionalList = professionalList;
                this.updateFields();
            });
    }

    _template() {
        let template = `
            <div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="name">Nome</label>
                        <input type="text" class="form-control" id="name" name="name">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="professionalEngagedName">Profissional Responsável</label>
                        <select id="professionalEngagedName" class="form-control" name="professionalEngagedName">
                        <option value="">Todos</option>
                            ${this._professionalList.map(professional => `
                            <option value="${professional.name}">${professional.name}</option>
                            `).join('')}
                        </select>
                    </div>
                </div>
            </div>
        `;

        return DOMParserUtil.parse(template);
    }
}