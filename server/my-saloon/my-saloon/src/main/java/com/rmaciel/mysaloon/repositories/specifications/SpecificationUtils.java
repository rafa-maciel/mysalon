package com.rmaciel.mysaloon.repositories.specifications;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Calendar;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;

public abstract class SpecificationUtils {

    public static Predicate filterByDate(Path<Calendar> path, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder, SearchCriteria<Calendar> criteria) {
        if (criteria.getValue() == null) return null;

        switch (criteria.getOperation()) {
            case GREATER_THAN:                    
                return criteriaBuilder.greaterThanOrEqualTo(path, criteria.getValue());

            case LESS_THAN:
                return criteriaBuilder.lessThan(path, criteria.getValue());

            case EQUAL:
                return criteriaBuilder.equal(path, criteria.getValue());

            case BETWEEN:
                if (criteria.getValueMax() == null) return null;
                return criteriaBuilder.between(path, criteria.getValue(), criteria.getValueMax());       
            default:
                return null;
        }
    }

    public static Predicate filterByLocalDate(Path<LocalDate> path, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder, SearchCriteria<LocalDate> criteria) {
        if (criteria.getValue() == null) return null;

        switch (criteria.getOperation()) {
            case GREATER_THAN:                    
                return criteriaBuilder.greaterThanOrEqualTo(path, criteria.getValue());

            case LESS_THAN:
                return criteriaBuilder.lessThan(path, criteria.getValue());

            case EQUAL:
                return criteriaBuilder.equal(path, criteria.getValue());

            case BETWEEN:
                if (criteria.getValueMax() == null) return null;
                return criteriaBuilder.between(path, criteria.getValue(), criteria.getValueMax());       
            default:
                return null;
        }
    }

    public static Predicate filterByLocalTime(Path<LocalTime> path, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder, SearchCriteria<LocalTime> criteria) {
        if (criteria.getValue() == null) return null;

        switch (criteria.getOperation()) {
            case GREATER_THAN:                    
                return criteriaBuilder.greaterThanOrEqualTo(path, criteria.getValue());

            case LESS_THAN:
                return criteriaBuilder.lessThan(path, criteria.getValue());

            case EQUAL:
                return criteriaBuilder.equal(path, criteria.getValue());

            case BETWEEN:
                if (criteria.getValueMax() == null) return null;
                return criteriaBuilder.between(path, criteria.getValue(), criteria.getValueMax());       
            default:
                return null;
        }
    }

    public static Predicate filterByBigDecimal(Path<BigDecimal> path, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder, SearchCriteria<BigDecimal> criteria) {
        if (criteria.getValue() == null) return null;

        switch (criteria.getOperation()) {
            case GREATER_THAN:                    
                return criteriaBuilder.greaterThanOrEqualTo(path, criteria.getValue());

            case LESS_THAN:
                return criteriaBuilder.lessThan(path, criteria.getValue());

            case EQUAL:
                return criteriaBuilder.equal(path, criteria.getValue());

            case BETWEEN:
                if (criteria.getValueMax() == null) return null;
                return criteriaBuilder.between(path, criteria.getValue(), criteria.getValueMax());       
            default:
                return null;
        }
    }
}