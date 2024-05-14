package lk.ijse.gdse66.BackEndApplication.repository;

import lk.ijse.gdse66.BackEndApplication.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository <Customer,String>{


}
