import DefaultDashboardController from "./DefaultDashboardController";
import BindProxyModelView from "../helpers/BindProxyModelView";
import AlertMessage from "../models/AlertMessage";
import AlertMessageView from "../views/AlertMessageView";
import ProxyModelComponent from "../helpers/ProxyModelComponent";
import ModelList from "../models/ModelList";
import PurchaseTable from "../views/PurchasesTable";
import PurchaseService from "../services/PurchaseService";
import PurchaseSearchForm from "../views/PurchaseSearchForm";
import Modal from "../components/Modal";
import ListenerAction from "../components/ListenerAction";
import PurchaseForm from "../views/PurchaseForm";
import Button from "../components/Button";
import Purchase from "../models/Purchase";
import ConfirmModal from "../components/ConfirmModal";
import DateFormatHelper from "../helpers/DateFormatHelper";
import PageableNavigation from "../components/PageableNavigation";

export default class PurchaseController extends DefaultDashboardController {

    _init() {
        this._service = new PurchaseService();
        this._buttonsMenuEl = document.querySelector(".buttons-menu-bar");
        this._contentEl = document.querySelector(".main-content");
        
        this._initTopNavButtons();
        this._initAlertMessages();
        this._initPurchaseTable();
        this._initPurchaseFormModal();
        this._initRemoveConfirmationModal();
        
    }

    savePurchaseForm() {
        let purchaseDTO = this._purchaseForm.purchase;
        let savePromisse = purchaseDTO.id ?
            this._service.updatePurchase(purchaseDTO) :
            this._service.createPurchase(purchaseDTO);

        this._preLoader.run(
            savePromisse.then(purchase => {
                this._purchases.add(purchase);
                this._modalForm.hide();
                this._message.update('', 'Os dados da compra foram salvos com sucesso', 'success');
            })
        );
    }

    deletePurchase(id) {
        this._preLoader.run(
            this._service.deletePurchase(id)
                .then(() => {
                    this._modalRemoveConfirmation.hide();
                    this._purchases.remove(id);
                    this._message.update('', 'Compra removida com sucesso', 'success');
                })
        );
    }

    searchPurchases(page=null) {
        let searchData = this._purchasesSearchForm.getDataAsParams();
        if (page != null) searchData = searchData + '&page=' + page;
        
        this._purchases.clean();        
        this._preLoader.run(
            this._service.getPageablePurchases(searchData)
                .then(pageable => {
                    pageable.content.forEach(purchase => this._purchases.add(purchase));
                    this._tableNav.update(pageable);
                    this._message.update('A lista de compras está atualizar com o servidor',
                        'Lista atualizada de compras', 'info');
                })
        );


    }

    _initTopNavButtons() {
        let elCreate = new Button("Cadastrar Compra", "btn btn-primary ", "button", 
            new ListenerAction("click", () => {this._createPurchase()}));

        let elFilter = new Button("Filtrar Pesquisa", "btn btn-secondary ", "button", 
            new ListenerAction("click", () => {this._searchModal.show()}));

        this._buttonsMenuEl.appendChild(elCreate);
        this._buttonsMenuEl.appendChild(elFilter);
    }

    _initAlertMessages() {
        let messageEl = document.createElement("div");
        this._contentEl.appendChild(messageEl);

        this._message = new BindProxyModelView(new AlertMessage(),
            new AlertMessageView(messageEl),
            'update');
    }

    _initPurchaseTable() {
        this._purchases = new ProxyModelComponent(new ModelList(), 
            new PurchaseTable(this._contentEl,
                id => {this._editPurchase(id)},
                id => {this._showRemoveConfirmation(id)},
                notes => {this._showNotes(notes)}),
            'add', 'remove', 'clean');
        
        this._tableNav = new PageableNavigation(this._contentEl, {'id': 'tableNav'}, 
            page => this.searchPurchases(page));

        this._initPurchasesSearchForm();
        this._initPurchaseNotesInforMolda();
        this.searchPurchases();
    }

    _initPurchaseNotesInforMolda() {
        this._notesModal = new Modal(this._contentEl,  {
            'id': 'notesModal',
            'title': 'Notas da compra'
        });
    }

    _initPurchasesSearchForm() {
        this._searchModal = new Modal(this._contentEl, {
            'id': 'searchModal',
            'title': 'Filtro de Pesquisa',
        });

        this._purchasesSearchForm = new PurchaseSearchForm(this._searchModal.contentSelector, 
            new ListenerAction('submit', event => {
                event.preventDefault();
                this.searchPurchases();
                this._searchModal.hide();
            }));
    }

    _initPurchaseFormModal() {
        this._modalForm = new Modal(this._contentEl, {
            'id': 'PurchaseFormModal',
            'title': 'Formulário de Compras',
            'footer': true
        });

        this._purchaseForm = new PurchaseForm(this._modalForm.contentSelector);

        this._initPurchaseFormModalButtons();
    }

    _initPurchaseFormModalButtons() {
        this._modalForm.updateFooter(
            new Button('Salvar', 'btn btn-primary btn-lg', 'button',
                new ListenerAction('click', () => {this.savePurchaseForm()}))
        );
    }

    _initRemoveConfirmationModal() {
        this._modalRemoveConfirmation = new ConfirmModal(this._contentEl, {
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