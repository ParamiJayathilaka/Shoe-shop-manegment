package com.example.demo.repository;


import com.example.demo.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface InventoryRepo extends JpaRepository<Inventory,String> {

    @Query(value = "SELECT item_code FROM inventory ORDER BY item_code DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();
}
