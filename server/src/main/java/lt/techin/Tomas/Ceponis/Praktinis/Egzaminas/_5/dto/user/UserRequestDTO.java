package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserRequestDTO (@NotNull(message = "Name cannot be null")
                              @Size(min = 3,max = 255, message = "Name must be from 3 to 255")
                              @Pattern(regexp = "^[a-zA-Z0-9 !.,£$%^&*(){}:;'#`~_-]*$", message = "Name allows letter,numbers and following symbols !.,£$%^&*(){}:;'#`~_-")
                              String name,
                              @NotNull(message = "Email cannot be null")
                              @Size(max = 255, message = "Email cannot exceed 255 characters")
                              @Pattern(
                                      regexp = "^[a-zA-Z0-9][a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]*(?:\\.[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+)*@"
                                              + "(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$",
                                      message = "Must be a valid email address"
                              )
                              String email,
                              @NotNull(message = "Password cannot be null")
                              @Pattern(
                                      regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[\\S]{8,255}$",
                                      message = "Password must contain at least one lowercase letter, one uppercase letter, " +
                                              "one number, one special character, and be 8-255 characters long"
                              )
                              String password,
                              @Pattern(
                                      regexp = "^(|https?:\\/\\/(?:[a-zA-Z0-9\\-._~!$&'()*+,;=:@\\/]|%[0-9A-F]{2})+)$",
                                      message = "Must be a valid HTTP/HTTPS URL or empty"
                              )
                              String imageURL){
}
