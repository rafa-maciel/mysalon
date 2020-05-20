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
                        <label for="fullname">Nome</label>
                        <input type="text" class="form-control" name="fullname">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="phone">Telefone</label>
                        <input type="text" class="form-control" name="phone">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="indicatedBy">Indicado Por:</label>
                        <input type="text" class="form-control" name="indicatedBy">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="professionalEngagedId">Profissional Responsável</label>
                        <select class="form-control" name="professionalEngagedId">
                        <option value="">Todos</option>
                            ${this._professionalList.map(professional => `
                            <option value="${professional.id}">${professional.name}</option>
                            `).join('')}
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="size">Itens por Pagina</label>
                        <select name="size" class="form-control">
                            <option value="20">20</option>
                            <option value="10">10</option>
                            <option value="5">5</option>
                            <option value="2">2</option>
                        </select>
                    </div>

                    <div class="form-group col-md-6">
                        <label for="sort">Ordenar Por:</label>
                        <select name="sort" class="form-control">
                            <option value="">Sem Ordenação</option>
                            <option value="fullname,ASC">Nome (crescente)</option>
                            <option value="fullname,DESC">Nome (Decrescente)</option>
                            <option value="professionalEngaged,ASC">Profissional Responsável (Crescente)</option>
                            <option value="professionalEngaged,DESC">Profissional Responsável (Decrescente)</option>
                        </select>
                    </div>
                </div>
            </div>
        `;

        return DOMParserUtil.parse(template);
    }
}