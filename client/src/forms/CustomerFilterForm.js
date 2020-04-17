import CustomerDTO from "../dtos/CustomerDTO";

export default class CustomerFilterForm {
    constructor() {
        this._professionalList = [];
    }

    get professionalList() {
        return this._professionalList;
    }

    updateProfessionalsList(professionalList) {
        this._professionalList = professionalList;
    }

    getJSONParameters() {
        let name = document.querySelector("#customerFilterForm input[name='name']").value;
        let professionalEngagedName = document.querySelector("#customerFilterForm select[name='professionalEngagedName']").value;

        return {
            name,
            professionalEngagedName
        }
    }
}