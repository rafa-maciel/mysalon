package com.rmaciel.mysaloon.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.rmaciel.mysaloon.controllers.dtos.TransactionDTO;
import com.rmaciel.mysaloon.controllers.forms.PagSeguroTransaction;
import com.rmaciel.mysaloon.controllers.forms.TransactionForm;
import com.rmaciel.mysaloon.services.RestHeaders;
import com.rmaciel.mysaloon.utils.DateFormatUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Value("${mysaloon.pagseguro.api.endpoint.transactions}")
    private String transactionsUrl;

    @Autowired
    private RestHeaders headersBuild;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping
    public ResponseEntity<List<TransactionDTO>> search(String startDate, String finalDate) {

        LocalDate startAt = DateFormatUtil.parseFromString(startDate);
        LocalDate endAt = DateFormatUtil.parseFromString(finalDate);

        List<TransactionForm> transactions = getBetweenDates(startAt, endAt);    
    
        return ResponseEntity.ok(transactions.stream().map(TransactionDTO::new).collect(Collectors.toList()));
    }

    private String createTransactionURI(LocalDate date) {
        String dateStr = DateFormatUtil.parseToString(date);

        return UriComponentsBuilder.fromHttpUrl(this.transactionsUrl)
            .queryParam("tipoMovimento", 1)
            .queryParam("dataMovimento", dateStr).toUriString();  
    }

    private List<TransactionForm> getBetweenDates(LocalDate startAt, LocalDate endAt) {
        List<TransactionForm> transactions = new ArrayList<>();

        for (LocalDate date = startAt; date.isBefore(endAt); date = date.plusDays(1)) {
            String url = createTransactionURI(date);
            HttpEntity<String> httpEntity = new HttpEntity<String>(headersBuild.getHeaderAuth());
            ResponseEntity<PagSeguroTransaction> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, PagSeguroTransaction.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                PagSeguroTransaction body = response.getBody();
                if (body != null && body.getTransaction() != null && body.getTransaction().size() > 0) 
                    transactions.addAll(body.getTransaction());
            }
        }

        return transactions;
    }

    

    
    
}