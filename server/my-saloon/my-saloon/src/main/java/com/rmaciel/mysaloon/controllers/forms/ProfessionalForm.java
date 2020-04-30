package com.rmaciel.mysaloon.controllers.forms;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.rmaciel.mysaloon.models.AccountRole;
import com.rmaciel.mysaloon.models.Department;
import com.rmaciel.mysaloon.models.Professional;

public class ProfessionalForm {

    @NotEmpty @NotNull @Size(min = 3, max = 50)
    private String name;

    @NotNull
    private Department department;
    private String residencialPhone;
    private String cellphone;

    private String email;

    private AccountRole role;

    public ProfessionalForm(String name, Department department, String residencialPhone, String cellphone, String email,
            AccountRole role) {
        this.name = name;
        this.department = department;
        this.residencialPhone = residencialPhone;
        this.cellphone = cellphone;
        this.email = email;
        this.role = role;
    }

    public Professional convert() {
		return new Professional(name, department, residencialPhone, cellphone);
    }

    public boolean hasEmail() {
        return this.email != null && !this.email.isEmpty();
    }
    
    public void updateTo(Professional professional) {
        professional.setName(this.name);
        professional.setDepartment(this.department);
        professional.setCellphone(this.cellphone);
        professional.setResidencialPhone(this.residencialPhone);
    }

    public String getName() {
        return this.name;
    }

    public Department getDepartment() {
        return this.department;
    }

    public String getResidencialPhone() {
        return this.residencialPhone;
    }

    public String getCellphone() {
        return this.cellphone;
    }

    public String getEmail() {
        return email;
    }

    public AccountRole getRole() {
        return role;
    }

}
