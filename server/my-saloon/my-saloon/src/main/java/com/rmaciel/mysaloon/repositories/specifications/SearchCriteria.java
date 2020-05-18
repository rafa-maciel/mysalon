package com.rmaciel.mysaloon.repositories.specifications;

public class SearchCriteria<T> {
    private SearchOperation operation;
    private T value;
    private T valueMax;
    

    public SearchCriteria(SearchOperation operation, T value) {
        this.operation = operation;
        this.value = value;
    }


    public SearchCriteria(SearchOperation operation, T value, T valueMax) {
        this.operation = operation;
        this.value = value;
        this.valueMax = valueMax;
    }

    public SearchOperation getOperation() {
        return this.operation;
    }

    public T getValue() {
        return this.value;
    }

    public T getValueMax() {
        return valueMax;
    }
    
}