import ModelView from "./ModelView"

export default class VendorFormView extends ModelView{

    _template(model) {
        return `
        <input type="hidden" class="form-control" id="id" name="id" value="${model.vendor.id ? model.vendor.id : ''}">
        <div class="form-group">
            <label for="name">Nome</label>
            <input type="text" min="3" max="20" class="form-control ${this._getFieldErrors(model, 'name') ? 'is-invalid' : ''}" id="name" name="name" 
            placeholder="Maria Souza Silva" value="${model.vendor.name ? model.vendor.name : ''}">
            <div class="invalid-feedback">${this._getFieldErrors(model, 'name')}</div>
        </div>

        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="phone">Telefone</label>
                <input type="text" class="form-control" id="phone" name="phone" value="${model.vendor.phone ? model.vendor.phone : ''}">
            </div>
            <div class="form-group col-md-6">
                <label for="secondaryPhone">Telefone</label>
                <input type="text" class="form-control" id="secondaryPhone" name="secondaryPhone" value="${model.vendor.secondaryPhone ? model.vendor.secondaryPhone : ''}">
            </div>
        </div>

        <div class="form-group">
            <label for="notes">Outras Informações</label>
            <textarea class="form-control" id="notes" name="notes">${model.vendor.notes ? model.vendor.notes : ''}</textarea>
        </div>
    `;
    }

    _getFieldErrors(model, fieldName) {
        return model.errors.map(field => field.name == fieldName ? field.message : '').join('');
    }
}