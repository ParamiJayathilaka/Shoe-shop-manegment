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

    @Id
    @Column(name = "supplier_code", unique = true, nullable = false)
    private String supplierCode;

    @Column(name = "supplier_name", nullable = false)
    private String supplierName;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private Category category;

    @Column(name = "address_line_01", nullable = false)
    private String addressLine01;

    @Column(name = "address_line_02")
    private String addressLine02;

    @Column(name = "address_line_03")
    private String addressLine03;

    @Column(name = "address_line_04")
    private String addressLine04;

    @Column(name = "address_line_05")
    private String addressLine05;

    @Column(name = "address_line_06")
    private String addressLine06;

    @Column(name = "contact_no1", nullable = false)
    private String contactNo1;

    @Column(name = "land_line_no", nullable = false)
    private String landLineNo;

    @Column(name = "email", nullable = false)
    private String email;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =  "supplier")
    private List<Inventory> inventory = new ArrayList<>();
}
