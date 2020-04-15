import ModelView from "./ModelView";

export default class CustomerFormView extends ModelView {

    _template(model) {
        return `
            <input type="hidden" class="form-control" id="id" name="id" value="${model.customer.id ? model.customer.id : ''}">
            <div class="form-group">
                <label for="fullname">Nome</label>
                <input type="text" min="3" max="20" class="form-control ${this._getFieldErrors(model, 'fullname') ? 'is-invalid' : ''}" id="fullname" name="fullname" 
                    placeholder="Juliana Bandeiras" value="${model.customer.fullname ? model.customer.fullname : ''}">
                <div class="invalid-feedback">${this._getFieldErrors(model, 'fullname')}</div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="residencialPhone">Telefone</label>
                    <input type="text" class="form-control" id="residencialPhone" name="residencialPhone" value="${model.customer.residencialPhone ? model.customer.residencialPhone : ''}">
                </div>
                <div class="form-group col-md-6">
                    <label for="cellphone">Celular</label>
                    <input type="text" class="form-control" id="cellphone" name="cellphone" value="${model.customer.cellphone ? model.customer.cellphone : ''}">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="indicatedBy">Indicado Por</label>
                    <input type="text" class="form-control" id="indicatedBy" name="indicatedBy" value="${model.customer.indicatedBy ? model.customer.indicatedBy : ''}">
                </div>
                <div class="form-group col-md-6">
                    <label for="professionalEngaged">Profissional Responsável</label>
                    <select id="professionalEngaged" class="form-control" name="professionalEngaged">
                        ${model.professionalList.map(professional => `
                            <option value="${professional.id}" "${model.customer.professionalEngaged == professional.name ? 'selected' : ''}">${professional.name}</option>
                        `).join('')}
                    </select>
                </div>
            </div>
        `;
    }

    _getFieldErrors(model, fieldName) {
        return model.errors.map(field => field.name == fieldName ? field.message : '').join('');
    }

}