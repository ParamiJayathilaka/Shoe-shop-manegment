package com.example.demo.entity;

import com.example.demo.util.Category;
import com.example.demo.util.CustomerLoyaltyLevel;
import com.example.demo.util.Gender;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Supplier {


    @Id
    private String supplierCode;
    private String name;

    @Enumerated(EnumType.STRING)
    private Category category;

    private String addressLine1;
    private String addressLine2;
    private String addressLine3;
    private String addressLine4;
    private String addressLine5;
    private String addressLine6;
    private String contactNo1;
    private String contactNo2;
    private String email;


}
