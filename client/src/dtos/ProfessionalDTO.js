export default class ProfessionalDTO {
    constructor(name, residencialPhone, cellphone, department, id='') {
        this.name = name;
        this.residencialPhone = residencialPhone;
        this.cellphone = cellphone;
        this.department = department;
        this.id = id;
    }
}