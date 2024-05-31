package com.example.demo.controller;

import com.example.demo.dto.CustomDTO;
import com.example.demo.dto.CustomerDTO;
import com.example.demo.dto.SupplierDTO;
import com.example.demo.service.CustomerService;
import com.example.demo.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/supplier")
@CrossOrigin(origins = "*")
public class SupplierController {
    @Autowired
    private SupplierService supplierService ;

    public SupplierController() {
        System.out.println("supplier working !");
    }

    @GetMapping("/getAllSupplier")
    public List<SupplierDTO> getAllSupplier(){
        System.out.println("Supplier getAll !");
        return supplierService.getAllSupplier();
    }


    @PostMapping("/save")
    public SupplierDTO save(@RequestBody SupplierDTO supplierDTO){
        System.out.println(supplierDTO);
//        customerDTO.setCode(customerService.generateNextId());
        return supplierService.saveSupplier(supplierDTO);
    }

    @PatchMapping ("/update")
    public SupplierDTO update(@RequestBody SupplierDTO supplierDTO){
        System.out.println(supplierDTO);
        return supplierService.updateSupplier(supplierDTO);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable(value = "id")String id){
        System.out.println(id);
        return String.valueOf(supplierService.deleteSupplier(id));

    }

    @GetMapping("/search")
    public List<SupplierDTO> searchSupplier(@RequestParam("name") String name){
      //  return supplierService.searchCustomer(name);
        return null;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/supplierIdGenerate")
    public @ResponseBody
    CustomDTO supplierIdGenerate() {
        return supplierService.supplierIdGenerate();
    }


}
