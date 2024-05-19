package com.example.demo.controller;

import com.example.demo.dto.CustomDTO;
import com.example.demo.dto.CustomerDTO;
import com.example.demo.dto.EmployeeDTO;
import com.example.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "*")
public class EmployeeController {

//    @Autowired
//    private EmployeeService employeeService ;
//
//    public EmployeeController() {
//        System.out.println("employee working !");
//    }
//
//    @GetMapping("/getAllEmployee")
//    public List<EmployeeDTO> getAllEmployee(){
//        System.out.println("employee getAll !");
//        return employeeService.getAllEmployee();
//    }
//
//    @PostMapping("/save")
//    public EmployeeDTO save(@RequestBody EmployeeDTO employeeDTO ){
//        System.out.println(employeeDTO);
////        customerDTO.setCode(customerService.generateNextId());
//        return employeeService.saveEmployee(employeeDTO);
//    }
//
//
//    @PatchMapping ("/update")
//    public EmployeeDTO update(@RequestBody EmployeeDTO employeeDTO){
//        System.out.println(employeeDTO);
//        return employeeService.updateEmployee(employeeDTO);
//    }
//
//    @DeleteMapping("/{id}")
//
//    public String delete(@PathVariable(value = "id")String id){
//
//        System.out.println(id);
//        return String.valueOf(employeeService.deleteEmployee(id));
//    }
//
//    @GetMapping("/search")
//    public List<EmployeeDTO> search(@RequestParam("name") String name){
//        return employeeService.searchEmployee(name);
//    }
//
//    @ResponseStatus(HttpStatus.CREATED)
//    @GetMapping(path = "/employeeIdGenerate")
//    public @ResponseBody
//    CustomDTO employeeIdGenerate() {
//        return employeeService.employeeIdGenerate();
//    }

    @Autowired
    private EmployeeService employeeService;

    public EmployeeController() {
//        this.customerService = customerService;
        System.out.println("Employee Working");
    }

    @GetMapping("/getAllEmployee")
    List<EmployeeDTO> getAllEmployee(){
        System.out.println("request received");
        return employeeService.getAllEmployee();
    }

    @PostMapping("/save")
    public EmployeeDTO saveEmployee(@RequestBody EmployeeDTO employeeDTO){
        System.out.println(employeeDTO);
        return employeeService.saveEmployee(employeeDTO);
    }
    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable(value = "id") String id){

        employeeService.deleteEmployee(id);
    }


    @PatchMapping ("/update")
    public EmployeeDTO updateEmployee(@RequestBody EmployeeDTO employeeDTO){
        System.out.println(employeeDTO);
        return employeeService.updateEmployee(employeeDTO);
    }

//
//    @GetMapping(value = "/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
//    public EmployeeDTO getEmployeeDetails(@PathVariable("id")String id){
//        return employeeService.getEmployeeDetails(id);
//    }
}
