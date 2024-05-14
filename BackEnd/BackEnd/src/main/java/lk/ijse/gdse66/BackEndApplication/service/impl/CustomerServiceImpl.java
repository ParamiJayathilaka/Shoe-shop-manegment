package lk.ijse.gdse66.BackEndApplication.service.impl;

import lk.ijse.gdse66.BackEndApplication.repository.CustomerRepo;
import lk.ijse.gdse66.BackEndApplication.service.CustomerService;
import lk.ijse.gdse66.BackEndApplication.service.exseption.DuplicateRecordException;
import lk.ijse.gdse66.BackEndApplication.dto.CustomerDTO;
import lk.ijse.gdse66.BackEndApplication.entity.Customer;
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
        return null;
    }

    @Override
    public boolean deleteCustomer(String id) {
        return false;
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
