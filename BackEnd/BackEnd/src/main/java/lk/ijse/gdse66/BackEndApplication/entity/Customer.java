package lk.ijse.gdse66.BackEndApplication.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lk.ijse.gdse66.BackEndApplication.util.CustomerLoyaltyLevel;
import lk.ijse.gdse66.BackEndApplication.util.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {

    @Id
    private String code;
    private String name;
    private String email;
    @Enumerated(EnumType.STRING)
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

    @Enumerated(EnumType.STRING)
    private CustomerLoyaltyLevel loyaltyLevel;

    private Integer loyaltyPoints;
    private Timestamp recentPurchaseDate;
}
