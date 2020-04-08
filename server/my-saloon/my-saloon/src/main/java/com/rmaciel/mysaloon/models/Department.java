package com.rmaciel.mysaloon.models;

public enum Department {
    MANICURE("Manicure"), DESIGNER_SOBRANCELHAS("designer de sobrancelha"), DEPILADORA("depiladora"), CABELELEIRA("cabelereira"), ESTETICISTA("esteticista");

    private String label;

    private Department(String label) {
        this.label = label;
    }

    public String getLabel() {
        return this.label;
    }
}