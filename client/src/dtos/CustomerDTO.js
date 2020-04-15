export default class CustomerDTO {
    constructor(fullname, residencialPhone, cellphone, indicatedBy, professionalEngaged, id='') {
        this.fullname = fullname;
        this.residencialPhone = residencialPhone;
        this.cellphone = cellphone;
        this.indicatedBy = indicatedBy;
        this.professionalEngagedID = professionalEngaged;
        this.id = id;
    }

}