import DefaultDashboardController from "./DefaultDashboardController";
import BindProxyModelView from "../helpers/BindProxyModelView";
import AlertMessage from "../models/AlertMessage";
import AlertMessageView from "../views/AlertMessageView";
import ProxyModelComponent from "../helpers/ProxyModelComponent";
import ModelList from "../models/ModelList";
import PurchaseTable from "../views/PurchasesTable";
import PurchaseService from "../services/PurchaseService";
import PurchaseSearchForm from "../views/PurchaseSearchForm";
import CollapsePanel from "../components/CollapsePanel";
import Modal from "../components/Modal";
import ListenerAction from "../components/ListenerAction";
import PurchaseForm from "../views/PurchaseForm";
import Button from "../components/Button";
import Purchase from "../models/Purchase";
import ConfirmModal from "../components/ConfirmModal";
import DateFormatHelper from "../helpers/DateFormatHelper";

export default class PurchaseController extends DefaultDashboardController {

    _init() {
        this._service = new PurchaseService();
        
        this._initAlertMessages();
        this._initPurchaseTable();
        this._initPurchaseFormModal();
        this._initRemoveConfirmationModal();
        
    }

    _initAlertMessages() {
        this._message = new BindProxyModelView(new AlertMessage(),
            new AlertMessageView(document.querySelector('#alertMessage')),
            'update');
    }

    _initPurchaseTable() {
        this._purchases = new ProxyModelComponent(new ModelList(), 
            new PurchaseTable('#purchaseList',
                id => {this._editPurchase(id)},
                id => {this._showRemoveConfirmation(id)},
                notes => {this._showNotes(notes)}),
            'add', 'remove', 'clean');
        
        this._searchModal = new Modal("#searchPanel", {
            'id': 'searchModal',
            'title': 'Filtro de Pesquisa',
        });

        this._purchasesSearchForm = new PurchaseSearchForm(this._searchModal.contentSelector, 
            new ListenerAction('submit', event => {
                event.preventDefault();
                this.searchPurchases();
                this._searchModal.hide();
            }));

        this._notesModal = new Modal("#purchaseList",  {
            'id': 'notesModal',
            'title': 'Notas da compra'
        });

        document.querySelector('.btn-show-search-modal')
            .addEventListener('click', () => {this._searchModal.show()});

        this.searchPurchases();
    }

    searchPurchases() {
        let searchData = this._purchasesSearchForm.getDataAsParams();
        
        this._purchases.clean();        
        this._service.getPurchases(searchData)
            .then(purchases => {
                purchases.forEach(purchase => this._purchases.add(purchase));
            });


        this._message.update('A lista de compras está atualizar com o servidor',
            'Lista atualizada de compras', 'info');
    }

    savePurchaseForm() {
        let purchaseDTO = this._purchaseForm.purchase;
        let savePromisse = purchaseDTO.id ?
            this._service.updatePurchase(purchaseDTO) :
            this._service.createPurchase(purchaseDTO);

        savePromisse.then(purchase => {
            this._purchases.add(purchase);
            this._modalForm.hide();
            this._message.update('', 'Os dados da compra foram salvos com sucesso', 'success');
        });
    }

    deletePurchase(id) {
        this._service.deletePurchase(id)
            .then(() => {
                this._modalRemoveConfirmation.hide();
                this._purchases.remove(id);
                this._message.update('', 'Compra removida com sucesso', 'success');
            });
    }

    _initPurchaseFormModal() {
        this._modalForm = new Modal("main", {
            'id': 'PurchaseFormModal',
            'title': 'Formulário de Compras',
            'footer': true
        });

        this._purchaseForm = new PurchaseForm(this._modalForm.contentSelector);

        this._initPurchaseFormModalButtons();

        document.querySelector('.btn-create-purchase').addEventListener('click', () => {this._createPurchase()});
    }

    _initPurchaseFormModalButtons() {
        this._modalForm.updateFooter(
            new Button('Salvar', 'btn btn-primary btn-lg', 'button',
                new ListenerAction('click', () => {this.savePurchaseForm()}))
        );
    }

    _initRemoveConfirmationModal() {
        this._modalRemoveConfirmation = new ConfirmModal("main", {
            "id": "removeConfirmationModal",
            'title': 'Remover Compra',
            'buttonLabel': 'Remover Definitivamente'
        }, id => {this.deletePurchase(id)});
    }


    _createPurchase() {
        this._purchaseForm.purchase = new Purchase();
        this._modalForm.show();
    }

    _editPurchase(id) {
        let purchase = this._purchases.find(id);
        this._purchaseForm.purchase = purchase;
        this._modalForm.show();
    }

    _showRemoveConfirmation(id) {
        let purchase = this._purchases.find(id);
        this._modalRemoveConfirmation.update(`
            Você tem certeza que deseja remover definitivamente a compra 
            do dia ${DateFormatHelper.toString(purchase.date)} no valor de
            ${purchase.value}?
        `, id);
        this._modalRemoveConfirmation.show();
    }

    _showNotes(notes) {
        this._notesModal.updateContentText(notes);
        this._notesModal.show();
    }





}