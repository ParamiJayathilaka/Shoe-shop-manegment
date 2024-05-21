package com.example.demo.entity;

import com.example.demo.util.CustomerLoyaltyLevel;
import com.example.demo.util.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Inventory {

    @Id
    private String itemCode ;
    private String itemDesc;

    @Column(columnDefinition = "LONGTEXT")
    private String itemPicture ;
    private String category;
    private Integer size;
    private String supplierCode ;
    private String supplierName ;
    private double unitPriceSale ;
    private double unitPriceBuy;
    private double expectedProfit ;
    private double profitMargin;
    private Integer Status ;

}
