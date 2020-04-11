import ProfessionalController from "./controllers/ProfessionalController";

let controller = new ProfessionalController();

document.querySelector(".btn-modal-professional").addEventListener('click', event => {
    event.preventDefault();
    $("#modalProfessional").modal("show");
});