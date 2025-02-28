package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.category;

import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.Category;

public class CategoryMapper {

  public static CategoryResponseDTO toDTO(Category category) {
    return new CategoryResponseDTO(category.getId(),
            category.getName(),
            category.getUser().getId());
  }
}
