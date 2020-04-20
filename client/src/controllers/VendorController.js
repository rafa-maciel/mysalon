import BindProxy from '../helpers/BindProxyModelView'
import ModelList from '../models/ModelList'
import VendorService from '../services/VendorService';
import AlertMessage from '../models/AlertMessage';
import AlertMessageView from '../views/AlertMessageView';
import VendorListView from '../views/VendorsListView';
import VendorFormView from '../views/VendorFormView';
import VendorForm from '../forms/VendorForm';

export default class VendorController {
    constructor() {
        this._service = new VendorService();

        this._vendors = new BindProxy(new ModelList(),
            new VendorListView(document.querySelector('#vendorsList')),
            'add', 'remove');

        this._form = new BindProxy(new VendorForm(),
            new VendorFormView(document.querySelector('#vendorForm .fields')),
            'include', 'clean');

        this._message = new BindProxy(new AlertMessage(),
            new AlertMessageView(document.querySelector('#alertMessage')),
            'update');
        
        this._init();
    }

    _init() {
        this._updateVendorsList();
    }

    saveForm() {
        let dto = this._form.convertToDTOModel();
        if (dto.id) {
            this._updateViewsFromSaveForm(this._service.update(dto),
                'atualizado');
        } else {
            this._updateViewsFromSaveForm(this._service.create(dto),
                'criado');
        }
    }

    delete(id) {
        this._service.delete(id)
            .then(() => {
                this._vendors.remove(id);
                this._message.update('', 'O fornecedor foi removido', 'info');
                this._showRemoveFormModal(false);
            }).catch(error => {
                this._message.update(error.message, 'A operação falhou', 'warning');
                this._showRemoveFormModal(false);
            });
    }

    showNewForm() {
        this._form.clean();
        this._showFormModal();
    }

    showEditForm(id) {
        this._service.getById(id)
            .then(vendor => {
                this._form.include(vendor);
            }).catch(error => {
                this._message.update(error.message, 
                    'Não foi possivel encontrar o fornecedor', 'warning');
            })
    }

    _updateViewsFromSaveForm(promisse, actionLabel='criado') {
        promisse.
            then(vendor => {
                this._vendors.add(vendor);
                this._message.update(`O Fornecedor foi ${actionLabel} com sucesso.`,
                    `Fornecedor ${actionLabel}!`,
                    'success');
                
                this._showFormModal(false);
            }).catch(errorFields => {
                this._form.addErrors(errorFields);
            });
    }

    _updateVendorsList() {
        this._service.getAll()
            .then(vendors => {
                vendors.forEach(vendor => this._vendors.add(vendor))
                this._message.update('', 'Lista de fornecedores atualizada!', 'info');
            }).catch(error => {
                this._message.update('Erro ao conectar ao servidor', error.message, 'warning');
            });
    }

    _showFormModal(option=true) {
        if (option) {
            $("#modalVendorForm").modal("show");
        } else {
            $("#modalVendorForm").modal("hide");
        }
    }

    _showRemoveFormModal(option=true) {
        if (option) {
            $("#modalVendorRemove").modal("show");
        } else {
            $("#modalVendorRemove").modal("hide");
        }
    }
}