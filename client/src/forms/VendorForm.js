import Vendor from "../models/Vendor";
import VendorDTO from '../dtos/VendorDTO';

export default class VendorForm {
    constructor() {
        this._vendor = new Vendor();
        this._errors = [];
    }

    get vendor() {
        return this._vendor;
    }

    get errors() { 
        return this._errors;
    }

    include(vendor) {
        this._vendor = vendor;
        this._errors = [];
    }

    convertToDTOModel() {
        let name = document.querySelector('#vendorForm input[name="name"]').value;
        let phone = document.querySelector('#vendorForm input[name="phone"]').value;
        let secondaryPhone = document.querySelector('#vendorForm input[name="secondaryPhone"]').value;
        let notes = document.querySelector('#vendorForm textarea[name="notes"]').value;
        let id = document.querySelector('#vendorForm input[name="id"]').value;
        
        return new VendorDTO(name, phone, secondaryPhone, notes, id);
    }

    addErrors(errors) {
        errors.forEach(error => this._errors.push(error));
    }

    clean() {
        this._vendor = new Vendor();
        this._errors = [];
    }


}