package com.example.demo.repository;


import com.example.demo.entity.Inventory;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InventoryRepo extends JpaRepository<Inventory,String> {

//    @Query(value = "SELECT item_code FROM inventory ORDER BY item_code DESC LIMIT 1", nativeQuery = true)
//    String getLastIndex();

    @Query("SELECT i.itemCode FROM Inventory i")
    List<String> findAllItemCodes();

    @Transactional
    @Modifying
    @Query(value = "UPDATE Inventory " +
            "SET " +
            "status = :status, " +
            "size6 = CASE WHEN :size = '6' THEN :qty ELSE size6 END, " +
            "size8 = CASE WHEN :size = '8' THEN :qty ELSE size8 END, " +
            "size10 = CASE WHEN :size = '10' THEN :qty ELSE size10 END, " +
            "size11 = CASE WHEN :size = '11' THEN :qty ELSE size11 END " +
            "WHERE item_code = :itemCode", nativeQuery = true)
    void updateByItemCodeAndSize(int qty, String status, String itemCode, String size);

    @Query(value = "SELECT CASE " +
            "   WHEN :size = '6' THEN i.size6 " +
            "   WHEN :size = '8' THEN i.size8 " +
            "   WHEN :size = '10' THEN i.size10 " +
            "   WHEN :size = '11' THEN i.size11" +
            "   ELSE 0 " +
            "END " +
            "FROM Inventory i " +
            "WHERE i.item_code = :itemCode", nativeQuery = true)
    Integer findQtyByItemCodeAndSize(String itemCode, String size);
}
