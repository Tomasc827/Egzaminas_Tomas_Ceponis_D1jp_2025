package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.advertisement;

import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.category.CategoryResponseDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.Category;

import java.math.BigDecimal;
import java.util.List;

public record AdvertisementResponseDTO(long id, String name, String imageURL,
                                       CategoryResponseDTO category, String location,
                                       String description, BigDecimal price, long usersId) {
}
