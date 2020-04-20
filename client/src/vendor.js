import VendorController from "./controllers/VendorController";

let controller = new VendorController();

document.querySelector("#vendorForm").addEventListener('submit', event => {
    event.preventDefault();
    controller.saveForm();
});

$('#modalVendorForm').on('shown.bs.modal', event => {
    event.preventDefault();
    let id = $(event.relatedTarget).data('vendorid');
    if (id) {
        controller.showEditForm(id);
    } else {
        controller.showNewForm();
    }
});

$('#modalVendorRemove').on('show.bs.modal', event => {
    let id = $(event.relatedTarget).data('vendorid');
    let name = $(event.relatedTarget).data('vendor');
        
    let modal = $("#modalVendorRemove");

    modal.find(".vendor-name").text(name);

    document.querySelector("#formRemoveVendor input[name='id']").value = id;
});

document.querySelector('#formRemoveVendor').addEventListener('submit', event => {
    event.preventDefault();

    let id = document.querySelector('#formRemoveVendor input[name="id"]').value;
    controller.delete(id);
});