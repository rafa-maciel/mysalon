package com.rmaciel.mysaloon.controllers.forms;

import javax.validation.constraints.Size;

import com.rmaciel.mysaloon.models.Vendor;

public class VendorForm {
    @Size(min = 3, max = 40)
    private String name;

    @Size(max = 16)
    private String phone;

    @Size(max = 16)
    private String secondaryPhone;

    private String notes;


    public VendorForm(String name, String phone, String secondaryPhone, String notes) {
        this.name = name;
        this.phone = phone;
        this.secondaryPhone = secondaryPhone;
        this.notes = notes;
    }

    public Vendor convert() {
        return new Vendor(this.name, this.phone, this.secondaryPhone, this.notes);
    }

    public void updateTo(Vendor vendor) {
        vendor.setName(name);
        vendor.setPhone(phone);
        vendor.setSecondaryPhone(secondaryPhone);
        vendor.setNotes(notes);
    }


    public String getName() {
        return this.name;
    }

    public String getPhone() {
        return this.phone;
    }

    public String getSecondaryPhone() {
        return this.secondaryPhone;
    }

    public String getNotes() {
        return this.notes;
    }



}