package com.example.demo.service;

import com.example.demo.dto.CustomerDTO;
import com.example.demo.dto.SupplierDTO;

import java.util.List;

public interface SupplierService {
    SupplierDTO saveSupplier(SupplierDTO supplierDTO );
    SupplierDTO updateSupplier(SupplierDTO supplierDTO);
    boolean deleteSupplier(String id);
    List<SupplierDTO> getAllSupplier();
    String generateNextId();
    List<SupplierDTO> searchCustomer(String name);
}
