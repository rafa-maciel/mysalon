package com.rmaciel.mysaloon.repositories.specifications;

public class SearchCriteria {
    private String key;
    private SearchOperation operation;
    private Object value;
    

    public SearchCriteria(String key, SearchOperation operation, Object value) {
        this.key = key;
        this.operation = operation;
        this.value = value;
    }
   

    public String getKey() {
        return this.key;
    }

    public SearchOperation getOperation() {
        return this.operation;
    }

    public Object getValue() {
        return this.value;
    }
    
}