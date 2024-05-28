package com.example.demo.controller;


import com.example.demo.dto.OrderDTO;
import com.example.demo.service.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sales")
@CrossOrigin(origins = "*")

public class SalesController {
    public SalesController() {
        System.out.println("Sales Working !");
    }

    @Autowired
    private SalesService salesService;

    @PostMapping("/save")
    public void save(@RequestBody OrderDTO orderDTO){
        System.out.println(orderDTO);

        salesService.placeOrder(orderDTO);
    }
}
