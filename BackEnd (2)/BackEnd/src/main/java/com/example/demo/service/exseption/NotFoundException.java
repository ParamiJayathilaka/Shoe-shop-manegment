package com.example.demo.service.exseption;

public class NotFoundException extends ServiceException {

    public NotFoundException(String massage){
        super(massage);
    }
}
