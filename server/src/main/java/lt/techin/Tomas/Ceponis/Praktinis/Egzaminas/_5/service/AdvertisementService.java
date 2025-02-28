package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.service;


import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.advertisement.AdvertisementMapper;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.advertisement.AdvertisementRequestDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.advertisement.AdvertisementResponseDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.exception.NotFoundException;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.Advertisement;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.Category;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.User;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.repository.AdvertisementRepository;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.repository.CategoryRepository;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdvertisementService {
  private final AdvertisementRepository advertisementRepository;
  private final UserRepository userRepository;
  private final CategoryRepository categoryRepository;

  public AdvertisementService(
          AdvertisementRepository advertisementRepository,
          UserRepository userRepository,
          CategoryRepository categoryRepository) {
    this.advertisementRepository = advertisementRepository;
    this.userRepository = userRepository;
    this.categoryRepository = categoryRepository;
  }

  public AdvertisementResponseDTO createEntity(AdvertisementRequestDTO dto) {
    Advertisement advertisement = AdvertisementMapper.toEntity(dto);

    if (advertisement.getImageURL() == null || advertisement.getImageURL().isEmpty()) {
      advertisement.setImageURL("https://thb-space-01.sgp1.cdn.digitaloceanspaces.com/thb-bucket-dev/attachment/arcfile_8ad469be-a86c-4788-902e-156cdd435881.jpg");
    }
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    Category category = categoryRepository.findByName(dto.category()).orElseThrow(() -> new NotFoundException("Category not found"));

    User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new NotFoundException("User not found"));

    advertisement.setUser(user);
    advertisement.setCreatedAt(LocalDateTime.now());
    advertisement.setCategory(category);

    advertisementRepository.save(advertisement);

    return AdvertisementMapper.toDTO(advertisement);
  }


  public List<AdvertisementResponseDTO> getAdvertisementsByUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new NotFoundException("User not found"));
    return advertisementRepository.findByUserId(user.getId()).stream()
            .map(AdvertisementMapper::toDTO)
            .collect(Collectors.toList());
  }


  public List<AdvertisementResponseDTO> getAdvertisementsByCategory(Long categoryId) {
    return advertisementRepository.findByCategoryId(categoryId).stream()
            .map(AdvertisementMapper::toDTO)
            .collect(Collectors.toList());
  }


  public Page<AdvertisementResponseDTO> getAllSortedPaged(Pageable pageable, String name) {
    if (name == null || name.isEmpty()) {
      return advertisementRepository.findAll(pageable).map(AdvertisementMapper::toDTO);
    }
    return advertisementRepository.findByNameContaining(name, pageable).map(AdvertisementMapper::toDTO);
  }

  public void deleteEntity(long id) {
    advertisementRepository.delete(advertisementRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Advertisement not found")));
  }

  public AdvertisementResponseDTO getOneEntity(long id) {
    return AdvertisementMapper.toDTO(advertisementRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Advertisement not found")));
  }

  public AdvertisementResponseDTO updateEntity(AdvertisementRequestDTO dto, long id) {
    Advertisement advertisement = advertisementRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Advertisement not found"));

    advertisement.setName(dto.name());
    advertisement.setImageURL(dto.imageURL());
    advertisement.setDescription(dto.description());
    advertisement.setLocation(dto.location());
    advertisement.setPrice(dto.price());

    advertisementRepository.save(advertisement);
    return AdvertisementMapper.toDTO(advertisement);
  }
}
