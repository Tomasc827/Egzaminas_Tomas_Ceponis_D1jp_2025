package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.validation;

import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.exception.AlreadyExistsException;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> handleValidation(MethodArgumentNotValidException e) {
        Map<String,String> errors = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(err -> errors.put(err.getField(),err.getDefaultMessage()));
        return new ResponseEntity<>(errors,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<Map<String,String>> handleAlreadyExists(AlreadyExistsException e) {
        return new ResponseEntity<>(Map.of("Conflict",e.getMessage()),HttpStatus.CONFLICT);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Map<String,String>> handleNotFound(NotFoundException e) {
        return new ResponseEntity<>(Map.of("Not Found",e.getMessage()),HttpStatus.NOT_FOUND);
    }
}
