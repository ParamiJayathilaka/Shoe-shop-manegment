package com.example.demo.service.impl;

import com.example.demo.dto.OrderDTO;
import com.example.demo.dto.OrderDetailDTO;
import com.example.demo.entity.Customer;
import com.example.demo.entity.Sales;
import com.example.demo.entity.SalesDetails;
import com.example.demo.entity.SalesDetailsPK;
import com.example.demo.repository.CustomerRepo;
import com.example.demo.repository.InventoryRepo;
import com.example.demo.repository.SalesDetailsRepo;
import com.example.demo.repository.SalesRepo;
import com.example.demo.service.SalesDetailsService;
import com.example.demo.service.SalesService;
import com.example.demo.util.CustomerLoyaltyLevel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class SalesServiceImpl implements SalesService {

    @Autowired
    private SalesDetailsRepo orderDetailRepo;
    @Autowired
    private SalesRepo orderRepo;
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private InventoryRepo inventoryRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public void placeOrder(OrderDTO orderDTO) {

        Sales order = mapper.map(orderDTO, Sales.class);


        Customer customer = customerRepo.findByCode(orderDTO.getCustomer_id());
        order.setCustomer_id(customer);

        int currentPoints = customer.getLoyaltyPoints();
        int addedPoints = orderDTO.getAddedPoints();

        int newPoints = currentPoints+addedPoints;
        CustomerLoyaltyLevel loyaltyLevel = null;
        if (newPoints < 10){
            loyaltyLevel = CustomerLoyaltyLevel.NEW;
        }else if (newPoints >= 10 && newPoints<30){
            loyaltyLevel = CustomerLoyaltyLevel.BRONZE;
        } else if (newPoints >= 30 && newPoints<100) {
            loyaltyLevel = CustomerLoyaltyLevel.SILVER;
        } else if (newPoints >= 100) {
            loyaltyLevel = CustomerLoyaltyLevel.GOLD;
        }
        customer.setLoyaltyLevel(loyaltyLevel);
        customer.setLoyaltyPoints(newPoints);

        System.out.println("order Date  ="+ orderDTO.getOrderDate());
        customer.setRecentPurchaseDate(orderDTO.getOrderDate());
        customerRepo.save(customer);



        System.out.println("qqqqqqqqqqqqqqqqqq"+ order);
        orderRepo.save(order);
        System.out.println("12345"+orderDTO.getOrderDetailDTOList());
        for (OrderDetailDTO detailDTO : orderDTO.getOrderDetailDTOList()) {
            SalesDetailsPK orderDetailPK = new SalesDetailsPK(detailDTO.getOrder_id(),detailDTO.getItem_code(),detailDTO.getSize());

            SalesDetails orderDetail = new SalesDetails();

            orderDetail.setSalesDetailsPK(orderDetailPK);
            orderDetail.setItemName(detailDTO.getItemName());
            orderDetail.setUnitPrice(detailDTO.getUnitPrice());
            orderDetail.setItemQty(detailDTO.getItemQty());



            orderDetailRepo.save(orderDetail);


            int availableQty = inventoryRepo.findQtyByItemCodeAndSize(detailDTO.getItem_code(), detailDTO.getSize());
            int newQty = availableQty - detailDTO.getItemQty();

            String status;
            if (newQty<=0){
                status="Not Available";
            } else if (newQty<10) {
                status="Low";
            } else {
                status="Available";
            }
            inventoryRepo.updateByItemCodeAndSize(newQty, status, detailDTO.getItem_code(),detailDTO.getSize());
        }

    }
}
