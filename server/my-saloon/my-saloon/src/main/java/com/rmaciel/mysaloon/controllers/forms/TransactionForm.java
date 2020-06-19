package com.rmaciel.mysaloon.controllers.forms;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TransactionForm {
    @JsonProperty("codigo_transacao")
    private String code;

    @JsonProperty("data_venda_ajuste")
    private LocalDate date;

    @JsonProperty("hora_venda_ajuste")
    private LocalTime time;

    @JsonProperty("valor_total_transacao")
    private BigDecimal value;

    @JsonProperty("taxa_intermediacao")
    private BigDecimal fee;

    @JsonProperty("valor_liquido_transacao")
    private BigDecimal netValue;


    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return this.time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public BigDecimal getValue() {
        return this.value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public BigDecimal getFee() {
        return this.fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }

    public BigDecimal getNetValue() {
        return this.netValue;
    }

    public void setNetValue(BigDecimal netValue) {
        this.netValue = netValue;
    }


    @Override
    public String toString() {
        return "{" +
            " code='" + getCode() + "'" +
            ", date='" + getDate() + "'" +
            ", time='" + getTime() + "'" +
            ", value='" + getValue() + "'" +
            ", fee='" + getFee() + "'" +
            ", netValue='" + getNetValue() + "'" +
            "}";
    }


}