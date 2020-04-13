import ProfessionalController from "./controllers/ProfessionalController";

let controller = new ProfessionalController();

document.querySelector(".btn-modal-professional").addEventListener('click', event => {
    event.preventDefault();
    controller.callFormForNewProfessional();
});

document.querySelector("#professionalForm").addEventListener('submit', event => {
    event.preventDefault();
    controller.createProfessional();

    document.querySelectorAll(".btn-edit-professional").forEach(element => element.addEventListener('click', function(event) {
        event.preventDefault();
        let id = this.dataset["professionalid"];
        controller.editProfessional(id);
    }));
});