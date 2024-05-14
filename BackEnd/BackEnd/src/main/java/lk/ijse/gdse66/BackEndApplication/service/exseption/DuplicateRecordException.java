package lk.ijse.gdse66.BackEndApplication.service.exseption;

public class DuplicateRecordException extends ServiceException {

    public DuplicateRecordException(String massage){
        super(massage);
    }
}
