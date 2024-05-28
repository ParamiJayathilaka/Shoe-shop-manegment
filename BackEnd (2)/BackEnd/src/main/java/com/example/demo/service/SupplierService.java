package com.example.demo.service;

import com.example.demo.dto.CustomDTO;
import com.example.demo.dto.CustomerDTO;
import com.example.demo.dto.SupplierDTO;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

public interface SupplierService {
    SupplierDTO saveSupplier(SupplierDTO supplierDTO );
    SupplierDTO updateSupplier(SupplierDTO supplierDTO);
    boolean deleteSupplier(String id);
    List<SupplierDTO> getAllSupplier();
    List<SupplierDTO> searchSupplier(String name);

//    @ResponseBody
//    CustomDTO supplierIdGenerate();
}
