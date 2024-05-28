package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailDTO {

    private String order_id;
    private String item_code;
    private String itemName;
    private String size;
    private Double unitPrice;
    private Integer itemQty;
}
