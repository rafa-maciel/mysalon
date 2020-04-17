import ModelView from './ModelView'
import PageableNavigation from '../components/PageableNavigation';

export default class CustomerListView extends ModelView {
    
    _template(model) {
        let pageableNav = PageableNavigation.create(model.pageableInfo);
        
        return `
        <div class="table-responsive">
            <table class="table table-striped table-sm">
            <thead>
                <tr>
                <th>Nome</th>
                <th>Profissional Responsável</th>
                <th>Telefone</th>
                <th>Celular</th>
                <th>-</th>
                </tr>
            </thead>
            <tbody>
                ${model.list.map(customer => 
                    `
                    <tr>    
                        <td>${customer.fullname}</td>
                        <td>${customer.professionalEngaged}</td>
                        <td>${customer.residencialPhone}</td>
                        <td>${customer.cellphone}</td>
                        <td>
                            <button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal" 
                                data-customerid="${customer.id}" data-target="#modalCustomer">Editar</button>
                            <button type="button" class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#modalCustomerRemove" 
                                data-customerid="${customer.id}" data-customer="${customer.fullname}">Remover</button>
                        </td>
                    </tr>
                    `        
                ).join('')}
            </tbody>
            </table>
            
            ${pageableNav}
        </div>
        `;
    }

}