export default class VendorDTO {
    constructor(name, phone, secondaryPhone, notes, id='') {
        this.name = name;
        this.phone = phone;
        this.secondaryPhone = secondaryPhone;
        this.notes = notes;
        this.id = id;
    }
}