package com.example.demo.repository;

import com.example.demo.entity.Customer;
import com.example.demo.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface InventoryRepo extends JpaRepository<Inventory,String> {

    @Query(value = "SELECT itemCode FROM inventory ORDER BY itemCode DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();
}
