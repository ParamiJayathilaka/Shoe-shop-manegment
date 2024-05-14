package com.example.demo.dto;

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
    private String itemDesc;
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
