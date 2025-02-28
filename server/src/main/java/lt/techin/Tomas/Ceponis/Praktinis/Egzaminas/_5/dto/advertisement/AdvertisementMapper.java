package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.advertisement;

import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.category.CategoryResponseDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.Advertisement;

public class AdvertisementMapper {

  public static Advertisement toEntity(AdvertisementRequestDTO dto) {
    Advertisement advertisement = new Advertisement();
    advertisement.setName(dto.name().toLowerCase());
    advertisement.setImageURL(dto.imageURL());
    advertisement.setLocation(dto.location());
    advertisement.setDescription(dto.description());
    advertisement.setPrice(dto.price());
    return advertisement;
  }

  public static AdvertisementResponseDTO toDTO(Advertisement advertisement) {
    CategoryResponseDTO categoryDTO = null;
    if (advertisement.getCategory() != null) {
      categoryDTO = new CategoryResponseDTO(
              advertisement.getCategory().getId(),
              advertisement.getCategory().getName(),
              advertisement.getCategory().getUser().getId()
      );
    }

    return new AdvertisementResponseDTO(
            advertisement.getId(),
            advertisement.getName(),
            advertisement.getImageURL(),
            categoryDTO,
            advertisement.getLocation(),
            advertisement.getDescription(),
            advertisement.getPrice(),
            advertisement.getUser().getId()
    );
  }
}
