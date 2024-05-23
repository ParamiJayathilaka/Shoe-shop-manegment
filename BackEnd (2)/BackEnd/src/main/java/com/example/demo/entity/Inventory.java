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
    @Column(name = "item_code", nullable = false)
    private String itemCode;

    private String itemDescription;

    @Column(columnDefinition = "LONGTEXT")
    private String itemPicture;


    private String category;


    private Integer size;

    @ManyToOne
    @JoinColumn(name = "supplier_code" , referencedColumnName = "supplier_code")
    private Supplier supplier;

    private String supplierName;

    private Double unitPriceSale;

    private Double unitPriceBuy;

    private Double expectedProfit;

    private Double profitMargin;

    private String status;

    private Integer quantity;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =  "inventory")
    private List<SalesDetails> salesDetails = new ArrayList<>();

}
