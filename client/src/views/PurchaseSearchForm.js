import Form from "../components/Form";
import Button from "../components/Button";
import DOMParserUtil from "../helpers/DOMParserUtil";
import VendorService from "../services/VendorService";

export default class PurchaseSearchForm extends Form {
    constructor(parentSelector, ...listeners) {
        super(parentSelector, {
            'id': 'purchaseSearchForm',
            'buttons': true,
            'initialButtons': [
                new Button('Filtrar', 'btn btn-primary btn-sm float-rigth', 'submit'),
                new Button('Limpar Filtro', 'btn btn-secondary btn-sm', 'reset'),
            ],
            listeners
        });

        this._vendorList = [];
        new VendorService().getAll()
            .then(vendors => {
                this._vendorList = vendors
                this.updateFields();
            });
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
                    <label for="paymentMethod">Tipo de Pagamento</label>
                    <select name="paymentMethod" class="form-control">
                        <option value="">Todos</option>
                        <option value="CREDIT_CARD">Cartão de Crédito</option>
                        <option value="MONEY">Dinheiro</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="vendor">Fornecedor</label>
                    <select name="vendorId" class="form-control">
                        <option value="">Todos</option>
                        ${this._vendorList.map(vendor => `
                            <option value="${vendor.id}">${vendor.name}</option>
                        `).join('')}
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
                            <option value="value,ASC">Valor (crescente)</option>
                            <option value="value,DESC">Valor (Decrescente)</option>
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