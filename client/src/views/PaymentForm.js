import Form from "../components/Form"
import Payment from "../models/Payment"
import DOMParserUtil from "../helpers/DOMParserUtil";

export default class PaymentForm extends Form {
    constructor(parentSelector, ...listeners) {
        super(parentSelector, {
            'id': 'paymentForm',
            listeners
        });

        this._payment = new Payment();
        this.updateFields();
    }

    set payment(payment) {
        this._payment = payment;
        this.updateFields();
    }

    _template() {
        let template = `
            <div>       
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="paymentValue">Valor</label>
                        <input type="number" min="0.00" step="0.01" class="form-control" name="paymentValue"
                            value="${this._payment.value ? this._payment.value : ''}">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="paymentMethod">Forma de Pagamento</label>
                        <select name="paymentMethod" class="form-control">
                            <option value="CREDIT_CARD" ${this._payment.method.equals('CREDIT_CARD') ? 'selected' : ''}>Cartão de Crédito</option>
                            <option value="MONEY" ${this._payment.method.equals('CREDIT_CARD') ? 'selected' : ''}>Dinheiro</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="paymentDate">Data</label>
                        <input type="date" class="form-control" name="paymentDate"
                            value="${this._payment.date ?  this._payment.date.toISOString().slice(0,10) : ''}">
                    </div>
                </div>
    
                <div class="form-group">
                    <label for="paymentNotes">Anotações</label>
                    <textarea class="form-control" name="paymentNotes">${this._payment.notes ? this._payment.notes : ''}</textarea>
                </div>
            </div>
        `;

        return DOMParserUtil.parse(template);
    }
}