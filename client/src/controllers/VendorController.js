import BindProxy from '../helpers/BindProxyModelView'
import ModelList from '../models/ModelList'
import VendorService from '../services/VendorService';
import AlertMessage from '../models/AlertMessage';
import AlertMessageView from '../views/AlertMessageView';

import Modal from '../components/Modal';
import VendorForm from '../views/VendorForm';
import Vendor from '../models/Vendor';
import Button from '../components/Button';
import ListenerAction from '../components/ListenerAction';
import VendorsTable from '../views/VendorsTable';
import ProxyModelComponent from '../helpers/ProxyModelComponent';
import ConfirmModal from '../components/ConfirmModal';
import DefaultDashboardController from './DefaultDashboardController';

export default class VendorController extends DefaultDashboardController {
    _init() {
        this._service = new VendorService();

        this._initVendorsTable();
        this._initAlertMessages();
        this._initVendorFormModal();
        this._initRemoveConfirmationModal();
        this._initModalFormButtons();

        document.querySelector('.btn-create-vendor').addEventListener('click', () => {this._createVendor()});
    }

    saveVendorForm() {
        let dto = this._vendorForm.getVendorDTO();
        let savePromisse = dto.id ? this._service.update(dto) : this._service.create(dto);
        
        this._preLoader.run(
            savePromisse.then(vendor => {
                this._vendors.add(vendor);
                this._message.update(``,
                        `Os dados do fornecedors foram salvos com sucesso.`,
                        'success');
                this._modalForm.hide();
            })
        );
    }

    delete(id) {
        this._preLoader.run(
            this._service.delete(id)
                .then(() => {
                    this._vendors.remove(id);
                    this._message.update('', 'O fornecedor foi removido', 'info');
                    
                }).catch(error => {
                    this._message.update(error.message, 'A operação falhou', 'warning');
                })
        );
        
        this._modalConfirmRemove.hide();
    }

    searchVendors() {
        this._preLoader.run(
            this._service.getAll()
                .then(vendors => {
                    vendors.forEach(vendor => this._vendors.add(vendor))
                    this._message.update('', 'Lista de fornecedores atualizada!', 'info');
                }).catch(error => {
                    this._message.update('Erro ao conectar ao servidor', error.message, 'warning');
                })
        );
    }

    _initVendorFormModal() {
        this._modalForm = new Modal('main', {
            'id': 'mForm',
            'title': 'Formulário do Fornecedor',
            'footer': true
        });

        this._vendorForm = new VendorForm(this._modalForm.contentSelector);
    }

    _initVendorsTable() {
        this._vendors = new ProxyModelComponent(new ModelList(), 
            new VendorsTable('#vendorsList', 
                id => {this._editVendor(id)}, 
                id => {this._confirmRemoveVendor(id)}), 
            'add', 'remove');

        this.searchVendors();
    }

    _initAlertMessages() {
        this._message = new BindProxy(new AlertMessage(),
            new AlertMessageView(document.querySelector('#alertMessage')),
            'update');
    }

    _initRemoveConfirmationModal() {
        let modalDetails = {
            "id": "modalConfirmRemove",
            "title": "Remover Fornecedor", 
            "buttonLabel": "Remover definitivamente"
        }

        this._modalConfirmRemove = new ConfirmModal("main", modalDetails, id => {this.delete(id)});
    }

    _initModalFormButtons() {
        this._modalForm.updateFooter(
            new Button('Salvar', 'btn btn-primary btn-lg', 'button', 
                new ListenerAction('click', () => {this.saveVendorForm()})));
    }

    _createVendor() {
        this._vendorForm.vendor = new Vendor();
        this._modalForm.show();
    }

    _editVendor(id) {
        let vendor = this._vendors.find(id);
        this._vendorForm.vendor = vendor;
        this._modalForm.show();
    }

    _confirmRemoveVendor(id) {
        let vendor = this._vendors.find(id);
        this._modalConfirmRemove.update(
            `Você tem certeza que deseja remover definitivamente o(a) professional <strong>${vendor.name}</strong> do sistema?`, 
            vendor.id);
        this._modalConfirmRemove.show();
    }
}