package com.example.demo.repository;

import com.example.demo.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalesRepository extends JpaRepository<Sale,String> {
    Boolean existsByOrderNo(String id);
    Sale findByOrderNo(String id);
    void deleteByOrderNo(String id);
}
