import ModelView from "./ModelView";

export default class VendorsListView extends ModelView{

    _template(model) {
        return `
        <div class="table-responsive">
            <table class="table table-striped table-sm">
            <thead>
                <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Telefone</th>
                <th>Notas</th>
                <th>-</th>
                </tr>
            </thead>
            <tbody>
                ${model.list.map(vendor => 
                    `
                    <tr>    
                        <td>${vendor.name}</td>
                        <td>${vendor.phone}</td>
                        <td>${vendor.secondaryPhone}</td>
                        <td>${vendor.notes}</td>
                        <td>
                            <button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal" 
                                data-vendorid="${vendor.id}" data-target="#modalVendorForm">Editar</button>
                            <button type="button" class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#modalVendorRemove" 
                                data-vendorid="${vendor.id}" data-vendor="${vendor.name}">Remover</button>
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