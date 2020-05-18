package com.rmaciel.mysaloon.repositories.specifications;

import java.math.BigDecimal;
import java.util.Calendar;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.SingularAttribute;

import com.rmaciel.mysaloon.models.Purchase;

public abstract class SpecificationUtils {

    public static Predicate filterByDate(Root<Purchase> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder, SearchCriteria<Calendar> criteria, SingularAttribute<Purchase, Calendar> attribute) {
        if (criteria.getValue() == null) return null;

        Path<Calendar> path = root.<Calendar> get(attribute);
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

    public static Predicate filterByBigDecimal(Root<Purchase> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder, SearchCriteria<BigDecimal> criteria, SingularAttribute<Purchase, BigDecimal> attribute) {
        if (criteria.getValue() == null) return null;

        Path<BigDecimal> path = root.<BigDecimal> get(attribute);
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