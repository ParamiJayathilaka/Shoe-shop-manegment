package com.example.demo.repository;

import com.example.demo.entity.Customer;
import com.example.demo.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepo extends JpaRepository<Employee,String> {

//    @Query(value = "SELECT empCode FROM employee ORDER BY empCode DESC LIMIT 1", nativeQuery = true)
//    String getLastIndex();
//
//
//
//    List<Employee> findByEmployeeNameStartingWith(String name);

}
