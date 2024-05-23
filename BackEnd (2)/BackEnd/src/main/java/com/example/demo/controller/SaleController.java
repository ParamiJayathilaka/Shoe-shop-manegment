package com.example.demo.controller;

import com.example.demo.dto.SalesDTO;
import com.example.demo.service.SaleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v0/sales")
@CrossOrigin(origins = "", allowedHeaders = "", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE,RequestMethod.PATCH, RequestMethod.OPTIONS})
public class SaleController {

    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    List<SalesDTO> getAllSales(){
        return saleService.getAllSales();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    SalesDTO saveSales(@Valid @RequestBody SalesDTO salesDTO){
        System.out.println(salesDTO);
        return saleService.saveSales(salesDTO);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    void updateSales(@Valid @RequestBody SalesDTO salesDTO){
        saleService.updateSales(salesDTO.getOrderNo(),salesDTO);
    }

    @DeleteMapping(value = "/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    void deleteSales(@PathVariable("id") String id){
        saleService.deleteSales(id);
    }

    @PatchMapping(value = "/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    SalesDTO getSales(@PathVariable("id") String id){
        return saleService.getSaleDetails(id);
    }
}
