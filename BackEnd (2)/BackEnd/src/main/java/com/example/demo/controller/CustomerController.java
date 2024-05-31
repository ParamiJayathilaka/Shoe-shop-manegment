package com.example.demo.controller;

import com.example.demo.dto.CustomDTO;
import com.example.demo.dto.CustomerDTO;
import com.example.demo.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    public CustomerController() {
        System.out.println("customer working !");
    }

    @GetMapping("/getAllCustomers")
    public List<CustomerDTO> getAllCustomers(){
        System.out.println("customer getAll !");
        return customerService.getAllCustomers();
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

    @GetMapping("/search/{name}")
    public List<CustomerDTO> search(@PathVariable(value = "name")String name){
        System.out.println("dd"+name);
        return customerService.searchCustomer(name);
    }


    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/cusIdGenerate")
    public @ResponseBody
    CustomDTO customerIdGenerate() {
        return customerService.customerIdGenerate();
    }

}
