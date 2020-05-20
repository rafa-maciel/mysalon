package com.rmaciel.mysaloon.repositories.specifications;

import javax.persistence.criteria.Path;

import com.rmaciel.mysaloon.models.Customer;
import com.rmaciel.mysaloon.models.Customer_;
import com.rmaciel.mysaloon.models.Professional;

import org.springframework.data.jpa.domain.Specification;

public class CustomerSpecification {
    
    public static Specification<Customer> getByFullname(SearchCriteria<String> criteria) {
        return (root, query, criteriaBuilder) -> {
            if (criteria.getValue() == null) return null;

            Path<String> path = root.get(Customer_.fullname);
            return criteriaBuilder.like(path, "%" + criteria.getValue() + "%");
        };
    }

    public static Specification<Customer> getByResidencialPhone(SearchCriteria<String> criteria) {
        return (root, query, criteriaBuilder) -> {
            if (criteria.getValue() == null) return null;

            Path<String> path = root.get(Customer_.residencialPhone);
            return criteriaBuilder.like(path, "%" + criteria.getValue() + "%");
        };
    }

    public static Specification<Customer> getByCellphone(SearchCriteria<String> criteria) {
        return (root, query, criteriaBuilder) -> {
            if (criteria.getValue() == null) return null;

            Path<String> path = root.get(Customer_.residencialPhone);
            return criteriaBuilder.like(path, "%" + criteria.getValue() + "%");
        };
    }

    public static Specification<Customer> getByAnyPhone(SearchCriteria<String> criteria) {
        if (criteria.getValue() == null) return null;

        Specification<Customer> spec = CustomerSpecification.getByResidencialPhone(criteria);
        return spec.or(CustomerSpecification.getByCellphone(criteria));
    }

    public static Specification<Customer> getByIndicatedBy(SearchCriteria<String> criteria) {
        return (root, query, criteriaBuilder) -> {
            if (criteria.getValue() == null) return null;

            Path<String> path = root.get(Customer_.indicatedBy);
            return criteriaBuilder.like(path, "%" + criteria.getValue() + "%");
        };
    }

    public static Specification<Customer> getByProfessionalEngaged(SearchCriteria<Long> criteria) {
        return (root, query, criteriaBuilder) -> {
            if (criteria.getValue() == null) return null;
            
            Path<Professional> path = root.get(Customer_.professionalEngaged);
            return criteriaBuilder.equal(path, criteria.getValue());
        };
    }
    
}