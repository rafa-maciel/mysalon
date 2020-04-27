import Form from "../components/Form";
import Vendor from "../models/Vendor";
import VendorDTO from "../dtos/VendorDTO";
import DOMParserUtil from "../helpers/DOMParserUtil";

export default class VendorForm extends Form{
    constructor(parentSelector, ...listeners) {
        super(parentSelector, {
            "id": "vendorForm",
            listeners
        });

        this._vendor = new Vendor();
        this.updateFields();
    }

    set vendor(vendor) {
        this._vendor = vendor;
        this.updateFields();
    }

    getVendorDTO() {
        let data = this.getData();
        return new VendorDTO(data['name'], data['phone'], data['secondaryPhone'], data['notes'], data['id']);
    }

    _template() {
        let template = `
            <div>
                <input type="hidden" class="form-control" id="id" name="id" value="${this._vendor.id ? this._vendor.id : ''}">
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" min="3" max="20" class="form-control id="name" name="name" 
                        placeholder="Maria Souza Silva" value="${this._vendor.name ? this._vendor.name : ''}">
                </div>
        
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="phone">Telefone</label>
                        <input type="text" class="form-control" id="phone" name="phone" value="${this._vendor.phone ? this._vendor.phone : ''}">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="secondaryPhone">Telefone</label>
                        <input type="text" class="form-control" id="secondaryPhone" name="secondaryPhone" value="${this._vendor.secondaryPhone ? this._vendor.secondaryPhone : ''}">
                    </div>
                </div>
        
                <div class="form-group">
                    <label for="notes">Outras Informações</label>
                    <textarea class="form-control" id="notes" name="notes">${this._vendor.notes ? this._vendor.notes : ''}</textarea>
                </div>
            </div>
        `;

        return DOMParserUtil.parse(template);
    }



}