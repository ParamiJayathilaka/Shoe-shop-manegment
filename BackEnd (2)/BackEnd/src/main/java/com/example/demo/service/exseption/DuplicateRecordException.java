package com.example.demo.service.exseption;

public class DuplicateRecordException extends ServiceException {

    public DuplicateRecordException(String massage){
        super(massage);
    }
}
