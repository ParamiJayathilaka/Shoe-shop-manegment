package com.example.demo.controller;

import com.example.demo.dto.CustomDTO;
import com.example.demo.dto.CustomerDTO;
import com.example.demo.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    public CustomerController() {
        System.out.println("customer working !");
    }

    @PostMapping("/save")
    public CustomerDTO save(@RequestBody CustomerDTO customerDTO){
        System.out.println(customerDTO);
//        customerDTO.setCode(customerService.generateNextId());
        return customerService.saveCustomer(customerDTO);
    }

    @PatchMapping ("/update")
    public CustomerDTO update(@RequestBody CustomerDTO customerDTO){
        System.out.println(customerDTO);
        return customerService.updateCustomer(customerDTO);
    }

    @DeleteMapping("/{id}")

    public String delete(@PathVariable(value = "id")String id){

        System.out.println(id);
        return String.valueOf(customerService.deleteCustomer(id));

    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/cusIdGenerate")
    public @ResponseBody
    CustomDTO customerIdGenerate() {
        return customerService.customerIdGenerate();
    }
}
