package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Sales_Details")

public class SalesDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int salesId;

    private String itemDescription;

    private Integer size;

    private Double unitPriceSale;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "item_code" , referencedColumnName = "item_code")
    private Inventory inventory;

    @ManyToOne
    @JoinColumn(name = "order_no" , referencedColumnName = "order_no")
    private Sale sales;

}
