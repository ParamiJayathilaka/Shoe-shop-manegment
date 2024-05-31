package com.example.demo.service.impl;

import com.example.demo.dto.CustomDTO;
import com.example.demo.dto.CustomerDTO;
import com.example.demo.dto.InventoryDTO;
import com.example.demo.entity.Customer;
import com.example.demo.entity.Inventory;
import com.example.demo.repository.CustomerRepo;
import com.example.demo.repository.InventoryRepo;
import com.example.demo.service.InventoryService;
import com.example.demo.service.exseption.DuplicateRecordException;
import com.example.demo.service.exseption.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private InventoryRepo inventoryRepo ;

    @Autowired
    private ModelMapper mapper;

    @Override
    public InventoryDTO saveInventory(InventoryDTO inventoryDTO) {
        if (inventoryRepo.existsById(inventoryDTO.getItemCode())){
            throw new DuplicateRecordException("Inventory Id is already exists !!");
        }
        return mapper.map(inventoryRepo.save(mapper.map(inventoryDTO, Inventory.class)), InventoryDTO.class);

    }

    @Override
    public InventoryDTO updateInventory(InventoryDTO inventoryDTO) {

        if (!inventoryRepo.existsById(inventoryDTO.getItemCode())){
            throw new NotFoundException("Can't find customer id !!");
        }

        Inventory inventory  = inventoryRepo.findById(inventoryDTO.getItemCode()).get();
        System.out.println("inventory is "+inventory);

        inventoryDTO.setCategory(inventory.getCategory());
        inventoryDTO.setExpectedProfit(inventory.getExpectedProfit());
       // customerDTO.setRecentPurchaseDate(customer.getRecentPurchaseDate());

        return mapper.map(inventoryRepo.save(mapper.map(inventoryDTO, Inventory.class)), InventoryDTO.class);

    }

    @Override
    public boolean deleteInventory(String id) {
        if (!inventoryRepo.existsById(id)) {
            throw new NotFoundException("Inventory with id " + id + " not found!");
        }

        inventoryRepo.deleteById(id);
        return true;

    }

    @Override
    public List<InventoryDTO> getAllInventory() {
        return inventoryRepo.findAll().stream().map(inventory -> mapper.map(inventory, InventoryDTO.class)).toList();

    }

    @Override
    public List<InventoryDTO> searchInventory(String name) {
        return null;
    }

    @Override
    public CustomDTO inventoryIdGenerate() {
        return new CustomDTO(inventoryRepo.getLastIndex());

    }
}
