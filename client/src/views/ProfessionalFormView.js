import ModelView from "./ModelView";

export default class ProfessionalFormView extends ModelView{

    _template(model) {
        return `
            <input type="hidden" class="form-control" id="id" name="id" value="${model.professional.id ? model.professional.id : ''}">
            <div class="form-group">
                <label for="name">Nome</label>
                <input type="text" min="3" max="20" class="form-control ${this._getFieldErrors(model, 'name') ? 'is-invalid' : ''}" id="name" name="name" 
                placeholder="Maria Souza Silva" value="${model.professional.name ? model.professional.name : ''}">
                <div class="invalid-feedback">${this._getFieldErrors(model, 'name')}</div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                <label for="residencialPhone">Telefone</label>
                <input type="text" class="form-control" id="residencialPhone" name="residencialPhone" value="${model.professional.residencialPhone ? model.professional.residencialPhone : ''}">
                </div>
                <div class="form-group col-md-6">
                <label for="cellphone">Celular</label>
                <input type="text" class="form-control" id="cellphone" name="cellphone" value="${model.professional.cellphone ? model.professional.cellphone : ''}">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                <label for="departament">Àrea de Atuação</label>
                <select id="departament" class="form-control" name="departament">
                    <option value="CABELELEIRA" "${model.professional.departament == 'CABELELEIRA' ? 'selected' : ''}">Cabeleleira</option>
                    <option value="MANICURE" "${model.professional.departament == 'MANICURE' ? 'selected' : ''}">Manicure</option>
                    <option value="DESIGNSOBRANCELHAS" "${model.professional.departament == 'DESIGNSOBRANCELHAS' ? 'selected' : ''}">Design de Sobrancelhas</option>
                    <option value="DEPILADORA" "${model.professional.departament == 'DEPILADORA' ? 'selected' : ''}">Depiladora</option>
                    <option value="ESTETICISTA" "${model.professional.departament == 'ESTETICISTA' ? 'selected' : ''}">Esteticista</option>
                </select>
                </div>
            </div>
        `;
    }

    _getFieldErrors(model, fieldName) {
        return model.errors.map(field => field.name == fieldName ? field.message : '').join('');
    }
}