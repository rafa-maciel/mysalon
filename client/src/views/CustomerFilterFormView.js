import ModelView from "./ModelView";

export default class CustomerFilterFormView extends ModelView{
    _template(model) {
        return `
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="name">Nome</label>
                    <input type="text" class="form-control" id="name" name="name">
                </div>
                <div class="form-group col-md-6">
                    <label for="professionalEngagedName">Profissional Responsável</label>
                    <select id="professionalEngagedName" class="form-control" name="professionalEngagedName">
                    <option value="">Todos</option>
                        ${model.professionalList.map(professional => `
                        <option value="${professional.name}">${professional.name}</option>
                        `).join('')}
                    </select>
                </div>
            </div>
        `
    }
}