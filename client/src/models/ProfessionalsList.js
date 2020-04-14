export default class ProfessionalsList {
    constructor() {
        this._professionals = [];
    }

    clean() {
        this._professionals = [];
    }

    add(professional) {
        if (this._professionals.some(item => item.equals(professional))) {
            this._professionals.forEach((item, i) => {
                if (item.equals(professional)) this._professionals[i] = professional;
            });
        } else {
            this._professionals.push(professional);
        }
    }

    get professionals() {
        return this._professionals;
    }

}