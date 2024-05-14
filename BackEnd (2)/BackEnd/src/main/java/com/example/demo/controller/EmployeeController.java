package com.example.demo.controller;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService ;

    public EmployeeController() {
        System.out.println("employee working !");
    }

    @PostMapping("/save")
    public EmployeeDTO save(@RequestBody EmployeeDTO employeeDTO ){
        System.out.println(employeeDTO);
//        customerDTO.setCode(customerService.generateNextId());
        return employeeService.saveEmployee(employeeDTO);
    }

    @PatchMapping ("/update")
    public EmployeeDTO update(@RequestBody EmployeeDTO employeeDTO){
        System.out.println(employeeDTO);
        return employeeService.updateEmployee(employeeDTO);
    }

    @DeleteMapping("/{id}")

    public String delete(@PathVariable(value = "id")String id){

        System.out.println(id);
        return String.valueOf(employeeService.deleteEmployee(id));

    }
}
