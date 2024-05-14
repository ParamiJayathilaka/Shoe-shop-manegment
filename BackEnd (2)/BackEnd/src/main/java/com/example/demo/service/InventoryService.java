package com.example.demo.service;

import com.example.demo.dto.InventoryDTO;
import com.example.demo.dto.SupplierDTO;

import java.util.List;

public interface InventoryService {

    InventoryDTO saveInventory(InventoryDTO inventoryDTO  );
    InventoryDTO updateInventory(InventoryDTO inventoryDTO);
    boolean deleteInventory(String id);
    List<InventoryDTO> getAllInventory();
    String generateNextId();
    List<InventoryDTO> searchInventory(String name);
}
