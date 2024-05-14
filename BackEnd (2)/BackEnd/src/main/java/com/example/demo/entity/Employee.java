package com.example.demo.entity;

import com.example.demo.util.AccessRole;
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
public class Employee {


    @Id
    private String EmployeeCode;
    private String EmployeeName;
    private String EmployeeProfilePic;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String Status;
    private String Designation;

    @Enumerated(EnumType.STRING)
    private AccessRole accessRole;

    private Date dob;
    private Date dateOfJoin;

    private String branch;
    private String addressLine1;
    private String addressLine2;
    private String addressLine3;
    private String addressLine4;
    private String addressLine5;
    private String contactNum;
    private String email;
    private String emergency;
    private String emergencyContact;


}
