package com.rmaciel.mysaloon.controllers.forms;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PagSeguroTransaction {

    @JsonProperty("detalhes")
    private List<TransactionForm> transaction;

    public List<TransactionForm> getTransaction() {
        return transaction;
    }

    public void setTransaction(List<TransactionForm> transaction) {
        this.transaction = transaction;
    }

    @Override
    public String toString() {
        return "{" +
            " transaction='" + getTransaction() + "'" +
            "}";
    }

}