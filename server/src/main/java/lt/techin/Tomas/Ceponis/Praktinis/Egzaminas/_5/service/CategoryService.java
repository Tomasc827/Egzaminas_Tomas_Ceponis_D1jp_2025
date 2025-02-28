package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.service;

import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.advertisement.AdvertisementMapper;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.advertisement.AdvertisementRequestDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.advertisement.AdvertisementResponseDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.category.CategoryMapper;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.category.CategoryRequestDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.category.CategoryResponseDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.exception.AlreadyExistsException;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.exception.NotFoundException;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.Category;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.Advertisement;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.User;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.repository.CategoryRepository;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.repository.AdvertisementRepository;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
  private final CategoryRepository categoryRepository;
  private final AdvertisementRepository advertisementRepository;
  private final UserRepository userRepository;

  public CategoryService(CategoryRepository categoryRepository, AdvertisementRepository advertisementRepository, UserRepository userRepository) {
    this.categoryRepository = categoryRepository;
    this.advertisementRepository = advertisementRepository;
    this.userRepository = userRepository;
  }


  public CategoryResponseDTO addCategory(CategoryRequestDTO dto) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new NotFoundException("User Not Found"));


    if (categoryRepository.existsByName(dto.name().toLowerCase())) {
      throw new AlreadyExistsException("Category with name '" + dto.name() + "' already exists");
    }


    Category category = new Category();
    category.setUser(user);
    category.setName(dto.name().toLowerCase());
    categoryRepository.save(category);

    return CategoryMapper.toDTO(category);
  }

  public List<CategoryResponseDTO> getCategoriesByUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new NotFoundException("User not found"));
    return categoryRepository.findByUserId(user.getId()).stream()
            .map(CategoryMapper::toDTO)
            .collect(Collectors.toList());
  }

  public CategoryResponseDTO setCategory(CategoryRequestDTO dto, Long advertisementId) {
    Advertisement advertisement = advertisementRepository.findById(advertisementId)
            .orElseThrow(() -> new NotFoundException("Advertisement not found"));

    Category category = categoryRepository.findByName(dto.name().toLowerCase())
            .orElse(null);

    if (category == null) {
      category = new Category();
      category.setName(dto.name().toLowerCase());
      category = categoryRepository.save(category);
    }

    advertisement.setCategory(category);
    advertisementRepository.save(advertisement);

    return CategoryMapper.toDTO(category);
  }

  public List<CategoryResponseDTO> findAllCategories() {
    return categoryRepository.findAll().stream().map(CategoryMapper::toDTO).toList();
  }

  public void deleteCategory(Long id) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new NotFoundException("User not found"));

    Category category = categoryRepository.findById(id).orElseThrow(() -> new NotFoundException("Category not found"));
    if (!category.getUser().getId().equals(user.getId())) {
      throw new IllegalArgumentException("Can only delete your categories");
    }

    List<Advertisement> advertisements = advertisementRepository.findByCategoryId(id);
    for (Advertisement ad : advertisements) {
      ad.setCategory(null);
      advertisementRepository.save(ad);
    }

    categoryRepository.delete(category);
  }

  public CategoryResponseDTO updateEntity(CategoryRequestDTO dto, long id) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new NotFoundException("User not found"));

    Category category = categoryRepository.findById(id).orElseThrow(() -> new NotFoundException("Category not found"));
    if (!category.getUser().getId().equals(user.getId())) {
      throw new IllegalArgumentException("Can only update your categories");
    }


    category.setName(dto.name());

    categoryRepository.save(category);
    return CategoryMapper.toDTO(category);
  }
}
