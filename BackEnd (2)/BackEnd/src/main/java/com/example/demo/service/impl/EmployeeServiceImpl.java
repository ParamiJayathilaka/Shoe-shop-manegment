package com.example.demo.service.impl;

import com.example.demo.dto.CustomDTO;
import com.example.demo.dto.CustomerDTO;
import com.example.demo.dto.EmployeeDTO;
import com.example.demo.entity.Customer;
import com.example.demo.entity.Employee;
import com.example.demo.repository.EmployeeRepo;
import com.example.demo.service.EmployeeService;
import com.example.demo.service.exseption.DuplicateRecordException;
import com.example.demo.service.exseption.NotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Transactional
@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public EmployeeDTO saveEmployee(EmployeeDTO employeeDTO) {
        if (employeeRepo.existsById(employeeDTO.getEmpCode())){
            throw new DuplicateRecordException("Customer Id is already exists !!");
        }
        return mapper.map(employeeRepo.save(mapper.map(employeeDTO, Employee.class)), EmployeeDTO.class);

    }

    @Override
    public EmployeeDTO updateEmployee(EmployeeDTO employeeDTO) {

        if (!employeeRepo.existsById(employeeDTO.getEmpCode())){
            throw new NotFoundException("Can't find customer id !!");
        }

        Employee employee  = employeeRepo.findById(employeeDTO.getEmpCode()).get();
        System.out.println("customer is "+employee);

        employeeDTO.setAccessRole(employee.getAccessRole());
        employeeDTO.setDob(employee.getDob());
        employeeDTO.setDateOfJoin(employee.getDateOfJoin());


        return mapper.map(employeeRepo.save(mapper.map(employeeDTO, Employee.class)), EmployeeDTO.class);

    }


    @Override
    public boolean deleteEmployee(String id) {
        if (!employeeRepo.existsById(id)) {
            throw new NotFoundException("Customer with id " + id + " not found!");
        }
        employeeRepo.deleteById(id);
        return true;

    }

    @Override
    public List<EmployeeDTO> getAllEmployee() {
        return employeeRepo.findAll().stream().map(employee -> mapper.map(employee, EmployeeDTO.class)).toList();

    }

    @Override
    public List<EmployeeDTO> searchEmployee(String name) {
      //  return employeeRepo.findByNameStartingWith(name).stream().map(customer -> mapper.map(customer, CustomerDTO.class)).toList();

        return null;
    }

    @Override
    public CustomDTO employeeIdGenerate() {
        return new CustomDTO(employeeRepo.getLastIndex());
    }
}
