package com.example.demo.dto;

import com.example.demo.util.CustomerLoyaltyLevel;
import com.example.demo.util.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;
import java.sql.Timestamp;

@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {

    private String code;
    private String name;
    private String email;
    private Gender gender;
    private String contact;
    private Date dob;
    private String addressLine1;
    private String addressLine2;
    private String addressLine3;
    private String addressLine4;
    private String addressLine5;
    private String addressLine6;
    private Date loyaltyDate;
    private CustomerLoyaltyLevel loyaltyLevel;
    private Integer loyaltyPoints;
    private Timestamp recentPurchaseDate;

}
