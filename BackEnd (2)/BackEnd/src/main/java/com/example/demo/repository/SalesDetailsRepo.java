package com.example.demo.repository;

import com.example.demo.entity.Sales;
import com.example.demo.entity.SalesDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SalesDetailsRepo extends JpaRepository<SalesDetails,String> {

    @Query(value = "SELECT * FROM sales_details WHERE order_id = :orderId", nativeQuery = true)
    List<SalesDetails> findOrderDetailsByOrderId(String orderId);
}
