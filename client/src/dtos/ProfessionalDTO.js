export default class ProfessionalDTO {
    constructor(name, residencialPhone, cellphone, department, email, identifiedColor, id='') {
        this.name = name;
        this.residencialPhone = residencialPhone;
        this.cellphone = cellphone;
        this.department = department;
        this.email = email;
        this.id = id;
        this.identifiedColor = identifiedColor;
    }
}