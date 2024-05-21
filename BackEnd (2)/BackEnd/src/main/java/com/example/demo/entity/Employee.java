package com.example.demo.entity;

import com.example.demo.util.AccessRole;
import com.example.demo.util.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {

    @Id
    private String empCode;
    private String employeeName;

    @Column(columnDefinition = "LONGTEXT")
    private String employeeProfilePic;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String status;
    private String designation;

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
