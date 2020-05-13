package com.rmaciel.mysaloon.repositories.specifications;

import java.util.Date;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.rmaciel.mysaloon.models.Purchase;

import org.springframework.data.jpa.domain.Specification;

public class PurchaseSpecification implements Specification<Purchase> {
    private static final long serialVersionUID = 1L;

    private SearchCriteria criteria;


    public PurchaseSpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate(Root<Purchase> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        if (criteria.getOperation().equals(SearchOperation.GREATER_THAN)) {
            if (root.get(criteria.getKey()).getJavaType() == Date.class) {
                return builder.greaterThanOrEqualTo(root.<Date> get(criteria.getKey()), (Date) criteria.getValue());
            }
            return builder.greaterThanOrEqualTo(root.<String> get(criteria.getKey()), criteria.getValue().toString());
        }
        else if (criteria.getOperation().equals(SearchOperation.LESS_THAN)) {
            if (root.get(criteria.getKey()).getJavaType() == Date.class) {
                return builder.lessThanOrEqualTo(root.<Date> get(criteria.getKey()), (Date) criteria.getValue());
            }
            return builder.lessThanOrEqualTo(root.<String> get(criteria.getKey()), criteria.getValue().toString());
        }
        else if (criteria.getOperation().equals(SearchOperation.EQUAL)) {
            if (root.get(criteria.getKey()).getJavaType() == String.class) {
                return builder.like(root.<String> get(criteria.getKey()), "%" + criteria.getValue() + "%");
            } else {
                return builder.equal(root.get(criteria.getKey()), criteria.getValue());
            }
        }

        return null;
    }
    
}