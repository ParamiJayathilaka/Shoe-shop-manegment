package com.example.demo.repository;

import com.example.demo.entity.Customer;
import com.example.demo.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepo extends JpaRepository<Inventory,String> {
}
