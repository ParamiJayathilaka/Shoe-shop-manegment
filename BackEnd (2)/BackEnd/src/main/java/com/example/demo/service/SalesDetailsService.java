package com.example.demo.service;

import com.example.demo.dto.CustomDTO;
import com.example.demo.dto.OrderDTO;
import com.example.demo.dto.OrderDetailDTO;

import java.util.List;

public interface SalesDetailsService {
    List<OrderDTO> getAllRefundOrders();
    boolean refundOrder(String orderId);

    boolean refundOrderDetails(CustomDTO customDTO);
    OrderDTO getOrderByOrderId(String orderId);
    List<OrderDetailDTO> getOrderDetailListByOrderId(String orderId);
}
