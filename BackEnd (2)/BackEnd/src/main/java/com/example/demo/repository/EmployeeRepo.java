package com.example.demo.repository;


import com.example.demo.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepo extends JpaRepository<Employee,String> {

    @Query(value = "SELECT emp_code FROM employee ORDER BY emp_code DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

}
