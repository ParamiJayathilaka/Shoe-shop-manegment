package com.example.demo.entity;

import com.example.demo.util.CustomerLoyaltyLevel;
import com.example.demo.util.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "inventory")
public class Inventory {

    @Id
    private String itemCode;
    private String itemDescription;
    private String itemPicture;
    private String category;
//    private Integer size;
    private Integer size6;
    private Integer size8;
    private Integer size10;
    private Integer size11;
    private String supplierName;
    private Double unitPriceSale;
    private Double unitPriceBuy;
    private Double expectedProfit;
    private Double profitMargin;

    @ManyToOne
    @JoinColumn(name = "supplier_code" , referencedColumnName = "supplier_code")
    private Supplier supplier;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "item_code")
    private List<SalesDetails> orderDetails = new ArrayList<>();
}
