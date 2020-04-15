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