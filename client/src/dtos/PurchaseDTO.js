export default class PurchaseDTO {
    constructor(value, date, notes, paymentMethod, vendorId, id='') {
        this.value = value;
        this.date = new Date(date);
        this.notes = notes;
        this.paymentMethod = paymentMethod;
        this.vendorId = vendorId;
        this.id = id;
    }
}