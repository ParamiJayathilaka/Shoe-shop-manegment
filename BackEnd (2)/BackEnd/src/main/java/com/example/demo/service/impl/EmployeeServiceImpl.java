package com.example.demo.service.impl;

import com.example.demo.dto.CustomDTO;
import com.example.demo.dto.CustomerDTO;
import com.example.demo.dto.EmployeeDTO;
import com.example.demo.entity.Customer;
import com.example.demo.entity.Employee;
import com.example.demo.repository.CustomerRepo;
import com.example.demo.repository.EmployeeRepo;
import com.example.demo.service.EmployeeService;
import com.example.demo.service.exseption.DuplicateRecordException;
import com.example.demo.service.exseption.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public EmployeeDTO saveEmployee(EmployeeDTO employeeDTO) {
        if (employeeRepo.existsById(employeeDTO.getEmployeeCode())){
            throw new DuplicateRecordException("Employee Id is already exists !!");
        }
        return mapper.map(employeeRepo.save(mapper.map(employeeDTO, Employee.class)), EmployeeDTO.class);
    }

    @Override
    public EmployeeDTO updateEmployee(EmployeeDTO employeeDTO) {
        if (!employeeRepo.existsById(employeeDTO.getEmployeeCode())){
            throw new NotFoundException("Can't find employee id !!");
        }

        Employee employee = employeeRepo.findById(employeeDTO.getEmployeeCode()).get();
        System.out.println("employee is "+employee);

        employeeDTO.setAccessRole(employee.getAccessRole());
//        employeeDTO.(customer.getLoyaltyPoints());
//        employeeDTO.setRecentPurchaseDate(customer.getRecentPurchaseDate());

        return mapper.map(employeeRepo.save(mapper.map(employeeDTO, Employee.class)), EmployeeDTO.class);
    }

    @Override
    public boolean deleteEmployee(String id) {
        if (!employeeRepo.existsById(id)) {
            throw new NotFoundException("Employee with id " + id + " not found!");
        }

        employeeRepo.deleteById(id);
        return true;
    }

    @Override
    public List<EmployeeDTO> getAllEmployee() {
        return null;
    }


    @Override
    public List<EmployeeDTO> searchEmployee(String name){return null;}

    @Override
    public CustomDTO employeeIdGenerate() {
        return new CustomDTO(employeeRepo.getLastIndex());
    }

}
