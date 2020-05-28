import Form from "../components/Form";
import DOMParserUtil from "../helpers/DOMParserUtil";
import Button from "../components/Button";

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

        this.updateFields();
    }

    _template() {
        let template = `
            <div>
                <div class="form-group">
                    <label for="value">Valor</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <select name="valueOperation">
                                <option value="EQUAL">Igual a</option>
                                <option value="GREATER_THAN">Maior que</option>
                                <option value="LESS_THAN">Menor que</option>
                                <option value="BETWEEN">Entre</option>
                            </select>
                        </div>    
                        <input type="number" min="0.00" step="0.01" class="form-control" id="value" name="value">
                        <input type="number" min="0.00" step="0.01" class="form-control" id="valueMax" name="valueMax">
                    </div>
                </div>
            </div>
        `

        return DOMParserUtil.parse(template);
    }
}
