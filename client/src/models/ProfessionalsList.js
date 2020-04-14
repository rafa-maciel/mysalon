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

    remove(id) {
        this._professionals.forEach((item, i) => {
            if (item.id == id) this._professionals.splice(i, 1);
        });
    }

    get professionals() {
        return this._professionals;
    }

}