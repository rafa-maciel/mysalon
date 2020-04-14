import ProfessionalController from "./controllers/ProfessionalController";

let controller = new ProfessionalController();

/* document.querySelector('.btn-modal-professional').addEventListener('click', event => {
    event.preventDefault();
    controller.callFormForNewProfessional();
}); */

document.querySelector('#professionalForm').addEventListener('submit', event => {
    event.preventDefault();
    controller.saveFormProfessional();
});

$('#modalProfessional').on('show.bs.modal', event => {
    let id = $(event.relatedTarget).data('professionalid');
    if (id) {
        controller.showEditProfessionalForm(id);
    } else {
        controller.callFormForNewProfessional();
    }
});