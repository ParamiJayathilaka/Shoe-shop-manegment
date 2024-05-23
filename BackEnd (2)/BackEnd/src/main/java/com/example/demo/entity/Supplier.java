package com.example.demo.entity;

import com.example.demo.util.Category;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "supplier")
public class Supplier {

//    @Id
//    @Column(name = "supplier_code", unique = true, nullable = false)
//    private String supplierCode;
//
//    private String supplierName;

    @Id
    @Column(name = "supplier_code", nullable = false)
    private String supplierCode;

    private String supplierName;

    @Enumerated(EnumType.STRING)
    private Category category;

    private String addressLine01;

    private String addressLine02;

    private String addressLine03;

    private String addressLine04;

    private String addressLine05;

    private String addressLine06;

    private String contactNo1;

    private String landLineNo;

    private String email;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =  "supplier")
    private List<Inventory> inventory = new ArrayList<>();

}
