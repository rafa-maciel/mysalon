export default class PaymentMethod {
    constructor(paymentMethod) {
        this._paymentMethod = paymentMethod;

        this._labels = {
            'CREDIT_CARD': 'Cartão de Crédito',
            'MONEY': 'Dinheiro'
        }
    }

    equals(stringMethod) {
        return this._paymentMethod != null && this._paymentMethod == stringMethod;
    }

    get label() {
        return this._labels[this._paymentMethod];
    }

    get method() {
        return this._paymentMethod;
    }
}