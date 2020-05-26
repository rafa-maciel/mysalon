package com.rmaciel.mysaloon.repositories.specifications;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.criteria.Path;

import com.rmaciel.mysaloon.models.Appointment;
import com.rmaciel.mysaloon.models.Appointment_;
import com.rmaciel.mysaloon.models.Customer;
import com.rmaciel.mysaloon.models.Customer_;
import com.rmaciel.mysaloon.models.PaymentMethod;
import com.rmaciel.mysaloon.models.Payment_;
import com.rmaciel.mysaloon.models.Professional;
import com.rmaciel.mysaloon.models.Service_;

import org.springframework.data.jpa.domain.Specification;

public class AppointmentSpecification {

    public static Specification<Appointment> getByTitle(SearchCriteria<String> criteria) {
        return (root, query, criteriaBuilder) -> {
            if (criteria.getValue() == null) return null;

            Path<String> path = root.get(Appointment_.title);
            return criteriaBuilder.like(path, "%" + criteria.getValue() + "%");
        };
    }

    public static Specification<Appointment> getByDoneStatus(SearchCriteria<Boolean> criteria) {
        return (root, query, criteriaBuilder) -> {
            if (criteria.getValue() == null) return null;

            Path<Boolean> path = root.get(Appointment_.done);
            return criteriaBuilder.equal(path, criteria.getValue());
        };
    }

    public static Specification<Appointment> getByCustomer(SearchCriteria<Long> criteria) {
        return (root, query, criteriaBuilder) -> {
            if (criteria.getValue() == null) return null;

            Path<Customer> path = root.get(Appointment_.customer);
            return criteriaBuilder.equal(path, criteria.getValue());
        };
    }

    public static Specification<Appointment> getByCustomerName(SearchCriteria<String> criteria) {
        return (root, query, criteriaBuilder) -> {
            if (criteria.getValue() == null) return null;

            Path<String> path = root.get(Appointment_.customer)
                .get(Customer_.fullname);
            return criteriaBuilder.like(path, "%" + criteria.getValue() + "%");
        };
    }

    public static Specification<Appointment> getByProfessional(SearchCriteria<Long> criteria) {
        return (root, query, criteriaBuilder) -> {
            if (criteria.getValue() == null) return null;

            Path<Professional> path = root.get(Appointment_.professional);
            return criteriaBuilder.equal(path, criteria.getValue());
        };
    }

    public static Specification<Appointment> getByDate(SearchCriteria<LocalDate> criteria) {
        return (root, query, criteriaBuilder) -> {
            Path<LocalDate> path = root.get(Appointment_.date);
            return SpecificationUtils.filterByLocalDate(path, query, criteriaBuilder, criteria);
        };
    }

    public static Specification<Appointment> getByTime(SearchCriteria<LocalTime> criteria) {
        return (root, query, criteriaBuilder) -> {
            Path<LocalTime> path = root.get(Appointment_.time);
            return SpecificationUtils.filterByLocalTime(path, query, criteriaBuilder, criteria);
        };
    }

    public static Specification<Appointment> getByPaymentValue(SearchCriteria<BigDecimal> criteria) {
        return (root, query, criteriaBuilder) -> {
            Path<BigDecimal> path = root.get(Appointment_.service)
                .get(Service_.payment)
                .get(Payment_.value);
            
            return SpecificationUtils.filterByBigDecimal(path, query, criteriaBuilder, criteria);
        };
    }

    public static Specification<Appointment> getByPaymentMethod(SearchCriteria<PaymentMethod> criteria) {
        return (root, query, criteriaBuilder) -> {
            if (criteria.getValue() == null) return null;

            Path<PaymentMethod> path = root.get(Appointment_.service)
                .get(Service_.payment)
                .get(Payment_.method);

            return criteriaBuilder.equal(path, criteria.getValue());
        };
    }

    public static Specification<Appointment> getByPaymentDate(SearchCriteria<LocalDate> criteria) {
        return (root, query, criteriaBuilder) -> {
            Path<LocalDate> path = root.get(Appointment_.service)
                .get(Service_.payment)
                .get(Payment_.date);

            return SpecificationUtils.filterByLocalDate(path, query, criteriaBuilder, criteria);
        };
    }
    
}