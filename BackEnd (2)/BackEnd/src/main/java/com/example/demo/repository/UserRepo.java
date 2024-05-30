package com.example.demo.repository;


import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,String> {

    @Query(value = "SELECT * FROM customer c WHERE  c.name = :name", nativeQuery = true)
    User findUserByName( @Param("name") String name);

    Optional<User> findByEmail(String email);
}
