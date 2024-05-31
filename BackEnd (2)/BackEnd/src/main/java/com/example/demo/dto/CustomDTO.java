package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomDTO {

    private String orderId;
    private String itemCode;
    private String size;
    private Integer qty;
    private Double unitTotalPrice;
    private Integer arrayLength;

    private String value;
    private int count;
    public CustomDTO(String lastIndex) {
        this.value=lastIndex;
    }
    public CustomDTO(int count) {
        this.count=count;
    }


}
