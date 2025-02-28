package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.controller;

import jakarta.validation.Valid;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.advertisement.AdvertisementRequestDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.advertisement.AdvertisementResponseDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.category.CategoryRequestDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.category.CategoryResponseDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.service.CategoryService;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.util.WebUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/api")
public class CategoryController {

  private final CategoryService categoryService;

  public CategoryController(CategoryService categoryService) {
    this.categoryService = categoryService;
  }

  @PostMapping("/advertisement/{advertisementId}/set-category")
  public ResponseEntity<CategoryResponseDTO> setCategory(@Valid @RequestBody CategoryRequestDTO dto, @PathVariable Long advertisementId) {
    CategoryResponseDTO responseDTO = categoryService.setCategory(dto, advertisementId);
    URI location = WebUtil.createLocation("/{id}", responseDTO.id());
    return ResponseEntity.created(location).body(responseDTO);
  }

  @PostMapping("/categories/add")
  public ResponseEntity<CategoryResponseDTO> addCategory(@Valid @RequestBody CategoryRequestDTO dto) {
    CategoryResponseDTO responseDTO = categoryService.addCategory(dto);
    URI location = WebUtil.createLocation("/{id}", responseDTO.id());
    return ResponseEntity.created(location).body(responseDTO);
  }

  @GetMapping("/categories/all")
  public ResponseEntity<List<CategoryResponseDTO>> getAllCategories() {
    return ResponseEntity.ok().body(categoryService.findAllCategories());
  }

  @GetMapping("/categories/my")
  public ResponseEntity<List<CategoryResponseDTO>> getAllCategoriesUser() {
    return ResponseEntity.ok().body(categoryService.getCategoriesByUser());
  }

  @DeleteMapping("/categories/delete/{id}")
  public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
    categoryService.deleteCategory(id);

    return ResponseEntity.noContent().build();
  }

  @PutMapping("/categories/update/{id}")
  public ResponseEntity<CategoryResponseDTO> updateEntity(@Valid @RequestBody CategoryRequestDTO dto, @PathVariable Long id) {
    return ResponseEntity.ok().body(categoryService.updateEntity(dto, id));
  }

}
