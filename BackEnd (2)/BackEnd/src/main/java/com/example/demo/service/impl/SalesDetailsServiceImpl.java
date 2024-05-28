package com.example.demo.service.impl;

import com.example.demo.dto.CustomDTO;
import com.example.demo.dto.OrderDTO;
import com.example.demo.dto.OrderDetailDTO;
import com.example.demo.service.SalesDetailsService;

import java.util.List;

public class SalesDetailsServiceImpl implements SalesDetailsService {
    @Override
    public List<OrderDTO> getAllRefundOrders() {
        return null;
    }

    @Override
    public boolean refundOrder(String orderId) {
        return false;
    }

    @Override
    public boolean refundOrderDetails(CustomDTO customDTO) {
        return false;
    }

    @Override
    public OrderDTO getOrderByOrderId(String orderId) {
        return null;
    }

    @Override
    public List<OrderDetailDTO> getOrderDetailListByOrderId(String orderId) {
        return null;
    }
}
