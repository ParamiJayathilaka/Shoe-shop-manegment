package com.example.demo.service.impl;

import com.example.demo.dto.CustomerDTO;
import com.example.demo.dto.SupplierDTO;
import com.example.demo.entity.Customer;
import com.example.demo.entity.Supplier;
import com.example.demo.repository.CustomerRepo;
import com.example.demo.repository.SupplierRepo;
import com.example.demo.service.SupplierService;
import com.example.demo.service.exseption.DuplicateRecordException;
import com.example.demo.service.exseption.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierRepo supplierRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public SupplierDTO saveSupplier(SupplierDTO supplierDTO) {
        if (supplierRepo.existsById(supplierDTO.getSupplierCode())){
            throw new DuplicateRecordException("Customer Id is already exists !!");
        }
        return mapper.map(supplierRepo.save(mapper.map(supplierDTO, Supplier.class)), SupplierDTO.class);
    }

    @Override
    public SupplierDTO updateSupplier(SupplierDTO supplierDTO) {
        if (!supplierRepo.existsById(supplierDTO.getSupplierCode())){
            throw new NotFoundException("Can't find customer id !!");
        }

        Supplier supplier  = supplierRepo.findById(supplierDTO.getSupplierCode()).get();
        System.out.println("supplier is "+supplier);

        supplierDTO.setCategory(supplier.getCategory());
//        supplierDTO.se(customer.getLoyaltyPoints());
//        customerDTO.setRecentPurchaseDate(customer.getRecentPurchaseDate());

        return mapper.map(supplierRepo.save(mapper.map(supplierDTO, Supplier.class)), SupplierDTO.class);
    }

    @Override
    public boolean deleteSupplier(String id) {
        if (!supplierRepo.existsById(id)) {
            throw new NotFoundException("Customer with id " + id + " not found!");
        }

        supplierRepo.deleteById(id);
        return true;
    }

    @Override
    public List<SupplierDTO> getAllSupplier() {
        return null;
    }

    @Override
    public String generateNextId() {
        return null;
    }

    @Override
    public List<SupplierDTO> searchCustomer(String name) {
        return null;
    }
}
