package com.example.demo.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class SalesDetails {

    @EmbeddedId
    private SalesDetailsPK salesDetailsPK ;

    private String itemName;
    private Double unitPrice;
    private Integer itemQty;

    @ManyToOne
    @JoinColumn(name = "order_id",
            referencedColumnName = "order_id",insertable = false,
            updatable = false)
    private Sales order_id;

    @ManyToOne
    @JoinColumn(name = "item_code",
            referencedColumnName = "itemCode",
            insertable = false,
            updatable = false)
    private Inventory item_code;

}
