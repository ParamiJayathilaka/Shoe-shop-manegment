package com.example.demo.repository;


import com.example.demo.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SupplierRepo extends JpaRepository<Supplier,String> {

    @Query(value = "SELECT sup_code FROM supplier ORDER BY sup_code DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();
}
