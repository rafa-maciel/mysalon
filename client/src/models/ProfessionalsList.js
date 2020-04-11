export default class ProfessionalsList {
    constructor() {
        this._professionals = [];
    }

    add(professional) {
        this._professionals.push(professional);
    }

    get professionals() {
        return this._professionals;
    }

}