package com.rmaciel.mysaloon.repositories.specifications;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.rmaciel.mysaloon.models.Purchase;

import org.springframework.data.jpa.domain.Specification;

public class PurchaseSpecificationBuilder {

    private final List<SearchCriteria> params;

    public PurchaseSpecificationBuilder() {
        params = new ArrayList<>();
    }

    public PurchaseSpecificationBuilder with(final String key, final SearchOperation operation, final Object value) {
        params.add(new SearchCriteria(key, operation, value));
        return this;
    }

    public Specification<Purchase> build() {
        if (params.size() == 0) return null;

        final List<Specification<Purchase>> specs = params.stream().map(PurchaseSpecification::new).collect(Collectors.toList());

        Specification<Purchase> result = specs.get(0);

        for (int i = 1; i < params.size(); i++) {
            result = result.and(specs.get(i));
        }

        return result;
    }
    
}