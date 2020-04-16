import ProfessionalController from "./controllers/ProfessionalController";

let controller = new ProfessionalController();

document.querySelector('#professionalForm').addEventListener('submit', event => {
    event.preventDefault();
    controller.saveFormProfessional();
});

$('#modalProfessional').on('shown.bs.modal', event => {
    event.preventDefault();
    let id = $(event.relatedTarget).data('professionalid');
    if (id) {
        controller.showEditProfessionalForm(id);
    } else {
        controller.showNewProfessionalForm();
    }
});

$('#modalProfessionalRemove').on('show.bs.modal', event => {
    let id = $(event.relatedTarget).data('professionalid');
    let name = $(event.relatedTarget).data('professional');
        
    let modal = $("#modalProfessionalRemove");

    modal.find(".professional-name").text(name);

    document.querySelector("#formRemoveProfessional input[name='id']").value = id;
    
});

document.querySelector("#formRemoveProfessional").addEventListener('submit', event => {
    event.preventDefault();
    let id = document.querySelector("#formRemoveProfessional input[name='id']").value;
    controller.deleteProfessional(id);
});
