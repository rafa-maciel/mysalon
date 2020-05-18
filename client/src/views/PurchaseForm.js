import Form from "../components/Form";
import Purchase from "../models/Purchase";
import VendorService from "../services/VendorService";
import DOMParserUtil from "../helpers/DOMParserUtil";
import PurchaseDTO from "../dtos/PurchaseDTO";
import DateFormatHelper from "../helpers/DateFormatHelper";

export default class PurchaseForm extends Form {
    constructor(parentSelector, ...listeners) {
        super(parentSelector, {
            'id': 'purchaseForm',
            listeners
        });

        this._purchase = new Purchase();
        this._vendorList = [];
        new VendorService().getAll()
            .then(list => {
                this._vendorList = list
                this.updateFields();
            });
    }

    set purchase(purchase) {
        this._purchase = purchase;
        this.updateFields();
    }

    get purchase() {
        let data = this.getData();
        return new PurchaseDTO(data['value'], data['date'], data['notes'], 
            data['paymentMethod'], data['vendorId'], data['id']);
    }

    _template() {
        let template = `
        <div>
            <input type="hidden" class="form-control" name="id" value="${this._purchase.id ? this._purchase.id : ''}">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="date">Data</label>
                    <input type="date" class="form-control" name="date" 
                        value="${this._purchase.date ? this._purchase.date.toISOString().slice(0,10) : ''}">
                </div>
                <div class="form-group col-md-6">
                    <label for="value">Fornecedor</label>
                    <select class="form-control" name="vendorId">
                        ${this._vendorList.map(vendor => `
                            <option value="${vendor.id}">${vendor.name}</option>
                        `).join('')}
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="value">Valor</label>
                    <input type="number" min="0.00" step="0.01" class="form-control" name="value"
                        value="${this._purchase.value ? this._purchase.value : ''}">
                </div>
                <div class="form-group col-md-6">
                    <label for="paymentMethod">Meio de Pagamento</label>
                    <select class="form-control" name="paymentMethod">
                        <option value="CREDIT_CARD" ${this._purchase.paymentMethod.equals('CREDIT_CARD') ? 'selected' : ''}>Cartão de Crédito</option>
                        <option value="MONEY" ${this._purchase.paymentMethod.equals('MONEY') ? 'selected' : ''}>Dinheiro</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="notes">Notas/Produtos</label>
                <textarea class="form-control" name="notes">${this._purchase.notes ?  this._purchase.notes : ''}</textarea>
            </div>
        </div>
        `;

        return DOMParserUtil.parse(template);
    }



}