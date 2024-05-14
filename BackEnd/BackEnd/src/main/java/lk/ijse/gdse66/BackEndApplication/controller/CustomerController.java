package lk.ijse.gdse66.BackEndApplication.controller;

import lk.ijse.gdse66.BackEndApplication.service.CustomerService;
import lk.ijse.gdse66.BackEndApplication.dto.CustomerDTO;
import org.springframework.beans.factory.annotation.Autowired;
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
}
