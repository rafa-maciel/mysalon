import View from './ModelView'

export default class ProfessionalsListView extends View {

    constructor(viewElement) {
        super(viewElement);
    }
    
    _template(model) {
        return `
        <div class="table-responsive">
            <table class="table table-striped table-sm">
            <thead>
                <tr>
                <th>Nome</th>
                <th>Área de Atuação</th>
                <th>Telefone</th>
                <th>Celular</th>
                <th>-</th>
                </tr>
            </thead>
            <tbody>
                ${model.professionals.map(professional => 
                    `
                    <tr>    
                        <td>${professional.name}</td>
                        <td>${professional.departament}</td>
                        <td>${professional.residencialPhone}</td>
                        <td>${professional.cellphone}</td>
                        <td>
                            <button type="button" class="btn btn-outline-primary btn-sm btn-edit-professional" data-professionalid="${professional.id}">Editar</button>
                            <button type="button" class="btn btn-outline-danger btn-sm">Remover</button>
                        </td>
                    </tr>
                    `        
                ).join('')}
            </tbody>
            </table>
        </div>
        `;
    }
}