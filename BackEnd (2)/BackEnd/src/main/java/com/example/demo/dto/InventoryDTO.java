package com.example.demo.dto;

import com.example.demo.entity.Supplier;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryDTO {

    private String itemCode ;
    private String itemDescription;
    private String itemPicture ;
    private String category;
    private Integer size6;
    private Integer size8;
    private Integer size10;
    private Integer size11;
    private String supCode;
    private String supplierName ;
    private double unitPriceSale ;
    private double unitPriceBuy;
    private double expectedProfit ;
    private double profitMargin;
    private String status;
}
