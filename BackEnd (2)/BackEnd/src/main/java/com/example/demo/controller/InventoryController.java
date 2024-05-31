package com.example.demo.controller;

import com.example.demo.dto.CustomDTO;
import com.example.demo.dto.CustomerDTO;
import com.example.demo.dto.EmployeeDTO;
import com.example.demo.dto.InventoryDTO;
import com.example.demo.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
@CrossOrigin(origins = "*")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService  ;

    public InventoryController() {
        System.out.println("inventory working !");
    }

        @GetMapping("/getAllInventory")
        public List<InventoryDTO> getAllInventory(){
            System.out.println("customer getAll !");
            return inventoryService.getAllInventory();

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

    @GetMapping("/search")
    public List<InventoryDTO> search(@RequestParam("name") String name){
        return inventoryService.searchInventory(name);
    }


    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/inventoryIdGenerate")
    public @ResponseBody
    CustomDTO inventoryIdGenerate() {
        return inventoryService.inventoryIdGenerate();
    }


}
