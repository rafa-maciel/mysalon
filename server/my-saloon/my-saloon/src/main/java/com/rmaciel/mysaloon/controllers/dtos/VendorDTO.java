package com.rmaciel.mysaloon.controllers.dtos;

import com.rmaciel.mysaloon.models.Vendor;

public class VendorDTO {
    private Long id;
    private String name;
    private String phone;
    private String secondaryPhone;
    private String notes;

    public VendorDTO(Vendor vendor) {
        this.id = vendor.getId();
        this.name = vendor.getName();
        this.phone = vendor.getPhone();
        this.secondaryPhone = vendor.getSecondaryPhone();
        this.notes = vendor.getNotes();
    }


    public Long getId() {
        return this.id;
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