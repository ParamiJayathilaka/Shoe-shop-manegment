package com.example.demo.service;

import com.example.demo.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {

    CustomerDTO saveCustomer(CustomerDTO customerDTO);
    CustomerDTO updateCustomer(CustomerDTO customerDTO);
    boolean deleteCustomer(String id);
    List<CustomerDTO> getAllCustomers();
    String generateNextId();
    List<CustomerDTO> searchCustomer(String name);
}
