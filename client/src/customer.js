import CustomerController from './controllers/CustomerController';

let controller = new CustomerController();

$('#modalCustomer').on('shown.bs.modal', event => {
    event.preventDefault();
    let id = $(event.relatedTarget).data('customerid');
    if (id) {
        controller.showEditCustomerForm(id);
    } else {
        controller.showNewCustomerForm();
    }
});

document.querySelector('#customerForm').addEventListener('submit', event => {
    event.preventDefault();
    controller.saveCustomerForm();
});

$('#modalCustomerRemove').on('show.bs.modal', event => {
    let id = $(event.relatedTarget).data('customerid');
    let name = $(event.relatedTarget).data('customer');
        
    let modal = $("#modalCustomerRemove");

    modal.find(".customer-name").text(name);

    document.querySelector("#formRemoveCustomer input[name='id']").value = id;
});

document.querySelector('#formRemoveCustomer').addEventListener('submit', event => {
    event.preventDefault();

    let id = document.querySelector('#formRemoveCustomer input[name="id"]').value;
    controller.deleteCustomer(id);
});

document.querySelector("#customerFilterForm").addEventListener('submit', event => {
    event.preventDefault();
    controller.updateCustomerList();
});
