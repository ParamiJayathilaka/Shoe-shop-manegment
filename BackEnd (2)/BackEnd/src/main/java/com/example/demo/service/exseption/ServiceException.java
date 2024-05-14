package com.example.demo.service.exseption;

public class ServiceException extends RuntimeException{

    public ServiceException(String massage){
        super(massage);
    }
}
