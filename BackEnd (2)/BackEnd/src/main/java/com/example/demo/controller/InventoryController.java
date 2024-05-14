package com.example.demo.controller;

import com.example.demo.dto.EmployeeDTO;
import com.example.demo.dto.InventoryDTO;
import com.example.demo.service.EmployeeService;
import com.example.demo.service.InventoryService;
import com.example.demo.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventory")
@CrossOrigin(origins = "*")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService  ;

    public InventoryController() {
        System.out.println("inventory working !");
    }

    @PostMapping("/save")
    public InventoryDTO save(@RequestBody InventoryDTO inventoryDTO ){
        System.out.println(inventoryDTO);
//        customerDTO.setCode(customerService.generateNextId());
        return inventoryService.saveInventory(inventoryDTO);
    }

    @PatchMapping ("/update")
    public InventoryDTO update(@RequestBody InventoryDTO inventoryDTO){
        System.out.println(inventoryDTO);
        return inventoryService.updateInventory(inventoryDTO);
    }

    @DeleteMapping("/{id}")

    public String delete(@PathVariable(value = "id")String id){

        System.out.println(id);
        return String.valueOf(inventoryService.deleteInventory(id));

    }

}
