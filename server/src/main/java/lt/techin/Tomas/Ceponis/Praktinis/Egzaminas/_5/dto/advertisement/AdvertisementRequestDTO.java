package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.advertisement;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.Category;

import java.math.BigDecimal;

public record AdvertisementRequestDTO(@NotNull(message = "Name cannot be null")
                                      @Size(min = 3, max = 255, message = "Name must be from 3 to 255")
                                      @Pattern(regexp = "^[a-zA-Z0-9 !.,£$%^&*(){}:;'#`~_-]*$", message = "Name allows letter,numbers and following symbols !.,£$%^&*(){}:;'#`~_-")
                                      String name,
                                      @Pattern(
                                              regexp = "^(|https?:\\/\\/(?:[a-zA-Z0-9\\-._~!$&'()*+,;=:@\\/]|%[0-9A-F]{2})+)$",
                                              message = "Must be a valid HTTP/HTTPS URL or empty"
                                      )
                                      String imageURL,
                                      @NotNull(message = "Location cannot be null")
                                      @Size(min = 3, max = 255, message = "Location must be from 3 to 255")
                                      @Pattern(regexp = "^[a-zA-Z0-9 !.,£$%^&*(){}:;'#`~_-]*$", message = "Location allows letter,numbers and following symbols !.,£$%^&*(){}:;'#`~_-")
                                      String location,
                                      @NotNull(message = "Description cannot be null")
                                      @Size(min = 3, max = 1000, message = "Description must be from 3 to 255")
                                      @Pattern(regexp = "^[a-zA-Z0-9 !.,£$%^&*(){}:;'#`~_-]*$", message = "Description allows letter,numbers and following symbols !.,£$%^&*(){}:;'#`~_-")
                                      String description,
                                      @NotNull(message = "Price cannot be null")
                                      @Positive(message = "Price must be positive")
                                      BigDecimal price,
                                      String category) {
}
