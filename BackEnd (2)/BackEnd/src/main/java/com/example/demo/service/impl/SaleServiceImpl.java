package com.example.demo.service.impl;

import com.example.demo.dto.InventoryDTO;
import com.example.demo.dto.SalesDTO;
import com.example.demo.dto.SalesInventoryDTO;
import com.example.demo.entity.Sale;
import com.example.demo.entity.SalesDetails;
import com.example.demo.repository.SalesDetailsRepository;
import com.example.demo.repository.SalesRepository;
import com.example.demo.service.SaleService;
import com.example.demo.service.exseption.DuplicateRecordException;
import com.example.demo.service.exseption.NotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class SaleServiceImpl implements SaleService {
    SalesRepository salesRepository;
    SalesDetailsRepository salesDetailsRepository;
    ModelMapper modelMapper;

    public SaleServiceImpl(SalesRepository salesRepository, SalesDetailsRepository salesDetailsRepository, ModelMapper modelMapper) {
        this.salesRepository = salesRepository;
        this.salesDetailsRepository = salesDetailsRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<SalesDTO> getAllSales() {
        List<Sale> salesList = salesRepository.findAll();
        return salesList.stream().map(sales -> {
            SalesDTO salesDTO = modelMapper.map(sales, SalesDTO.class);

            List<SalesDetails> salesDetailsList = salesDetailsRepository.findAllBySalesOrderNo(sales.getOrderNo());
            List<SalesInventoryDTO> salesInventoryDTOList = salesDetailsList.stream()
                    .map(details -> {
                        SalesInventoryDTO salesInventoryDTO = modelMapper.map(details, SalesInventoryDTO.class);
                        salesInventoryDTO.setInventory(modelMapper.map(details.getInventory(), InventoryDTO.class));
                        return salesInventoryDTO;
                    })
                    .collect(Collectors.toList());

            salesDTO.setInventory(salesInventoryDTOList);
            return salesDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public SalesDTO getSaleDetails(String id) {
        if(!salesRepository.existsByOrderNo(id)){
            throw new NotFoundException("Sales "+id+" Not Found!");
        }
        SalesDTO salesDTO = modelMapper.map(salesRepository.findByOrderNo(id), SalesDTO.class);
        System.out.println("ID-----------------------"+id);
        List<SalesInventoryDTO> salesInventory = salesDetailsRepository.findAllBySalesOrderNo(id).stream().map(
                salesDetails -> modelMapper.map(salesDetails, SalesInventoryDTO.class)
        ).toList();
        salesDTO.setInventory(salesInventory);

        return salesDTO;
    }

    @Override
    public SalesDTO saveSales(SalesDTO salesDTO) {
        if(salesRepository.existsByOrderNo(salesDTO.getOrderNo())){
            throw new DuplicateRecordException("This Sales "+salesDTO.getOrderNo()+" already exicts...");
        }
        SalesDTO newsalesDTO = modelMapper.map(salesRepository.save(modelMapper.map(
                salesDTO, Sale.class)), SalesDTO.class
        );

        List<SalesInventoryDTO> salesInventoryDTO = new ArrayList<>();
        for (SalesInventoryDTO inventoryDTO : salesDTO.getInventory()) {
            SalesDetails savedSaleDetails = salesDetailsRepository.save(modelMapper.map(inventoryDTO, SalesDetails.class));
            salesInventoryDTO.add(modelMapper.map(savedSaleDetails, SalesInventoryDTO.class));
        }
        newsalesDTO.setInventory(salesInventoryDTO);
        return newsalesDTO;
    }

    @Override
    public void updateSales(String id, SalesDTO salesDTO) {
        for(SalesInventoryDTO inventoryDTO : salesDTO.getInventory()){
            if(inventoryDTO.getQuantity() == 0){
                if(!isDateWithinThreeDays(String.valueOf(salesDTO.getPurchaseDate()))){
                    System.out.println("----------------------------------------------------------------");
                    System.out.println("comming");
                    throw new NotFoundException("Update Failed This Order " +
                            salesDTO.getOrderNo() + " Can't refund");
                }
            }
        }
        if(salesRepository.existsById(salesDTO.getOrderNo())){
            salesRepository.save(modelMapper.map(salesDTO,Sale.class));
            for (SalesInventoryDTO inventoryDTO : salesDTO.getInventory()) {
                if(!salesDetailsRepository.existsById(inventoryDTO.getId())){
                    throw new NotFoundException("Update Failed; Sales id: " +
                            salesDTO.getOrderNo() + " does not exist");
                }
                salesDetailsRepository.save(modelMapper.map(inventoryDTO, SalesDetails.class));
            }
        }
    }

    @Override
    public void deleteSales(String id) {
        if(!salesDetailsRepository.existsBySalesOrderNo(id)&&!salesRepository.existsByOrderNo(id)){
            throw  new NotFoundException("Sales "+ id + "Not Found...");
        }else if(salesRepository.existsByOrderNo(id)){
            salesRepository.deleteByOrderNo(id);
        }
        salesDetailsRepository.deleteAllBySalesOrderNo(id);
        salesRepository.deleteByOrderNo(id);
    }

    protected boolean isDateWithinThreeDays(String dateString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE MMM dd HH:mm:ss z yyyy");
        LocalDateTime inputDate = LocalDateTime.parse(dateString, formatter.withZone(ZoneId.of("Asia/Kolkata")));
        LocalDateTime currentDate = LocalDateTime.now(ZoneId.of("Asia/Kolkata"));
        LocalDateTime threeDaysAgo = currentDate.minus(3, ChronoUnit.DAYS);
        return !inputDate.isBefore(threeDaysAgo);
    }
}
