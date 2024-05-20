package com.example.demo.service.impl;

import com.example.demo.dto.CustomDTO;
import com.example.demo.dto.SupplierDTO;
import com.example.demo.entity.Supplier;
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
        if (supplierRepo.existsById(supplierDTO.getSupCode())){
            throw new DuplicateRecordException("Customer Id is already exists !!");
        }
        return mapper.map(supplierRepo.save(mapper.map(supplierDTO, Supplier.class)), SupplierDTO.class);
    }

    @Override
    public SupplierDTO updateSupplier(SupplierDTO supplierDTO) {
        if (!supplierRepo.existsById(supplierDTO.getSupCode())){
            throw new NotFoundException("Can't find customer id !!");
        }

        Supplier supplier  = supplierRepo.findById(supplierDTO.getSupCode()).get();
        System.out.println("supplier is "+supplier);

        supplierDTO.setCategory(supplier.getCategory());

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
        return supplierRepo.findAll().stream().map(supplier -> mapper.map(supplier, SupplierDTO.class)).toList();

    }

    @Override
    public List<SupplierDTO> searchSupplier(String name) {
        return null;
    }

    @Override
    public CustomDTO supplierIdGenerate() {
        return new CustomDTO(supplierRepo.getLastIndex());

    }

}
