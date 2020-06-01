import Form from "../components/Form";
import DOMParserUtil from "../helpers/DOMParserUtil";
import Button from "../components/Button";
import ProfessionalService from "../services/ProfessionalService";

export default class AppointmentSearchForm extends Form {
    constructor(parentSelector, ...listeners) {
        super(parentSelector, {
            'id': 'appointmentSearchForm',
            'buttons': true,
            'initialButtons': [
                new Button('Filtrar', 'btn btn-primary btn-sm float-right', 'submit'),
                new Button('Limpar Filtro', 'btn btn-secondary btn-sm', 'reset'),
            ],
            listeners
        });

        new ProfessionalService().getAllProfessionals()
            .then(professionals => {
                this._professionalsList = professionals;
                this.updateFields();
            });
    }

    _template() {
        let template = `
            <div>
                <div class="form-group">
                    <label for="title">Titulo</label>
                    <input type="text" class="form-control" name="title">
                </div>

                <div class="form-group">
                    <label for="customerName">Cliente</label>
                    <input type="text" class="form-control" name="customerName">
                </div>

                <div class="form-group">
                    <label for="professionalId">Profissional</label>
                    <select name="professionalId" class="form-control">
                        <option value="">Todos</option>
                        ${this._professionalsList.map(professional => `
                            <option value="${professional.id}">${professional.name}</option>
                        `).join('')}
                    </select>
                </div>

                <div class="form-group">
                    <label for="date">Data</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <select name="dateOperation">
                                <option value="EQUAL">Igual a</option>
                                <option value="GREATER_THAN">Maior que</option>
                                <option value="LESS_THAN">Menor que</option>
                                <option value="BETWEEN">Entre</option>
                            </select>
                        </div> 

                        <input type="date" class="form-control" id="date" name="date">
                        <input type="date" class="form-control" id="dateMax" name="dateMax">
                    </div>
                </div>

                <div class="form-group">
                    <label for="time">Horário</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <select name="timeOperation">
                                <option value="EQUAL">Igual a</option>
                                <option value="GREATER_THAN">Maior que</option>
                                <option value="LESS_THAN">Menor que</option>
                                <option value="BETWEEN">Entre</option>
                            </select>
                        </div> 

                        <input type="time" class="form-control" name="time">
                        <input type="time" class="form-control" name="timeMax">
                    </div>
                </div>

                <div class="form-group">
                    <label for="paymentValue">Valor Pago</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <select name="paymentValueOperation">
                                <option value="EQUAL">Igual a</option>
                                <option value="GREATER_THAN">Maior que</option>
                                <option value="LESS_THAN">Menor que</option>
                                <option value="BETWEEN">Entre</option>
                            </select>
                        </div>    
                        <input type="number" min="0.00" step="0.01" class="form-control" name="paymentValue">
                        <input type="number" min="0.00" step="0.01" class="form-control" name="paymentValueMax">
                    </div>
                </div>

                <div class="form-group">
                    <label for="paymentDate">Data do Pagamento</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <select name="paymentDateOperation">
                                <option value="EQUAL">Igual a</option>
                                <option value="GREATER_THAN">Maior que</option>
                                <option value="LESS_THAN">Menor que</option>
                                <option value="BETWEEN">Entre</option>
                            </select>
                        </div> 

                        <input type="date" class="form-control" name="paymentDate">
                        <input type="date" class="form-control" name="paymentDateMax">
                    </div>
                </div>

                <div class="form-group">
                    <label for="paymentMethod">Tipo de Pagamento</label>
                    <select name="paymentMethod" class="form-control">
                        <option value="">Todos</option>
                        <option value="CREDIT_CARD">Cartão de Crédito</option>
                        <option value="MONEY">Dinheiro</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="done">Finalizado</label>
                    <select name="done" class="form-control">
                        <option value="">Todos</option>
                        <option value="true">Finalizados</option>
                        <option value="false">Em Aberto</option>
                    </select>
                </div>

                <div class="row">
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
                            <option value="title,ASC">Titulo (crescente)</option>
                            <option value="title,DESC">Titulo (Decrescente)</option>
                            <option value="date,ASC">Data (Crescente)</option>
                            <option value="date,DESC">Data (Decrescente)</option>
                        </select>
                    </div>
                </div>

            </div>
        `

        return DOMParserUtil.parse(template);
    }
}
