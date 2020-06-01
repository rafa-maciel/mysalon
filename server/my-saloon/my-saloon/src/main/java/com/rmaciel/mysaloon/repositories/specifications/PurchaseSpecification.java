package com.rmaciel.mysaloon.repositories.specifications;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.criteria.Path;

import com.rmaciel.mysaloon.models.PaymentMethod;
import com.rmaciel.mysaloon.models.Purchase;
import com.rmaciel.mysaloon.models.Purchase_;
import com.rmaciel.mysaloon.models.Vendor;

import org.springframework.data.jpa.domain.Specification;

public abstract class PurchaseSpecification {
    public static Specification<Purchase> getByValue(SearchCriteria<BigDecimal> criteria) {
        return (root, query, criteriaBuilder) -> {
            Path<BigDecimal> path = root.get(Purchase_.value);
            return SpecificationUtils.filterByBigDecimal(path, query, criteriaBuilder, criteria);
        };
    }

    public static Specification<Purchase> getByDate(SearchCriteria<LocalDate> criteria) {
        return (root, query, criteriaBuilder) -> {
            Path<LocalDate> path = root.get(Purchase_.date);
            return SpecificationUtils.filterByLocalDate(path, query, criteriaBuilder, criteria);
        };
    }

    public static Specification<Purchase> getByPaymentMethod(SearchCriteria<PaymentMethod> criteria) {
        return (root, query, criteriaBuilder) -> {
            if (criteria.getValue() == null) return null;
            
            Path<PaymentMethod> path = root.get(Purchase_.paymentMethod);
            return criteriaBuilder.equal(path, criteria.getValue());
        };
    }

    public static Specification<Purchase> getByVendor(SearchCriteria<Long> criteria) {
        return (root, query, criteriaBuilder) -> {
            if (criteria.getValue() == null) return null;
            
            Path<Vendor> path = root.get(Purchase_.vendor);
            return criteriaBuilder.equal(path, criteria.getValue());
        };
    }
}