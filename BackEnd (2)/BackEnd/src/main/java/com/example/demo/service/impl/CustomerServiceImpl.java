package com.example.demo.service.impl;

import com.example.demo.dto.CustomerDTO;
import com.example.demo.entity.Customer;
import com.example.demo.repository.CustomerRepo;
import com.example.demo.service.CustomerService;
import com.example.demo.service.exseption.DuplicateRecordException;
import com.example.demo.service.exseption.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public CustomerDTO saveCustomer(CustomerDTO customerDTO) {
        if (customerRepo.existsById(customerDTO.getCode())){
            throw new DuplicateRecordException("Customer Id is already exists !!");
        }
        return mapper.map(customerRepo.save(mapper.map(customerDTO, Customer.class)),CustomerDTO.class);
    }

    @Override
    public CustomerDTO updateCustomer(CustomerDTO customerDTO) {

        if (!customerRepo.existsById(customerDTO.getCode())){
            throw new NotFoundException("Can't find customer id !!");
        }

        Customer customer = customerRepo.findById(customerDTO.getCode()).get();
        System.out.println("customer is "+customer);

        customerDTO.setLoyaltyLevel(customer.getLoyaltyLevel());
        customerDTO.setLoyaltyPoints(customer.getLoyaltyPoints());
        customerDTO.setRecentPurchaseDate(customer.getRecentPurchaseDate());

        return mapper.map(customerRepo.save(mapper.map(customerDTO, Customer.class)), CustomerDTO.class);
    }

    public boolean deleteCustomer(String id) {
        if (!customerRepo.existsById(id)) {
            throw new NotFoundException("Customer with id " + id + " not found!");
        }

        customerRepo.deleteById(id);
        return true;
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return null;
    }

    @Override
    public String generateNextId() {
        return null;
    }

    @Override
    public List<CustomerDTO> searchCustomer(String name) {
        return null;
    }
}
