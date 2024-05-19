package com.example.demo.dto;


import com.example.demo.util.AccessRole;
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
public class EmployeeDTO {

    private String employeeCode;
    private String employeeName;
    private String employeeProfilePic;
    private Gender gender;
    private String status;
    private String designation;
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
