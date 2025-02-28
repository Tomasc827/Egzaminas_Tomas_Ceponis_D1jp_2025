package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.category;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CategoryRequestDTO(@NotNull(message = "Category cannot be null")
                                 @Size(min = 3,max = 255, message = "Category must be from 3 to 255 characters")
                                 @Pattern(regexp = "^[a-zA-Z0-9 -]*$",message = "Category only allows letters,numbers and hyphens")
                                 String name) {
}
