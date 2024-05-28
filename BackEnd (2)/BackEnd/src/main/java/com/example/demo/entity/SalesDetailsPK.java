package com.example.demo.entity;


import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor

public class SalesDetailsPK implements Serializable {
    private String order_id;
    private String item_code;
    private String size;
}
