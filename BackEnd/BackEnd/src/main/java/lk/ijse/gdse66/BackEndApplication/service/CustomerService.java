package lk.ijse.gdse66.BackEndApplication.service;

import lk.ijse.gdse66.BackEndApplication.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {

    CustomerDTO saveCustomer(CustomerDTO customerDTO);
    CustomerDTO updateCustomer(CustomerDTO customerDTO);
    boolean deleteCustomer(String id);
    List<CustomerDTO> getAllCustomers();
    String generateNextId();
    List<CustomerDTO> searchCustomer(String name);
}
