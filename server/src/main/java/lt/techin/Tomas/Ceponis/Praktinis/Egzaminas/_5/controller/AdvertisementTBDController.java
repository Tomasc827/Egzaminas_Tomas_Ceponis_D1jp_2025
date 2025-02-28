package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.controller;

import jakarta.validation.Valid;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.advertisement.AdvertisementRequestDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.advertisement.AdvertisementResponseDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.service.AdvertisementService;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.util.WebUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/entity")
public class AdvertisementTBDController {

  private final AdvertisementService advertisementService;

  public AdvertisementTBDController(AdvertisementService advertisementService) {
    this.advertisementService = advertisementService;
  }

  @PostMapping
  public ResponseEntity<AdvertisementResponseDTO> createEntity(@Valid @RequestBody AdvertisementRequestDTO dto) {
    AdvertisementResponseDTO responseDTO = advertisementService.createEntity(dto);

    URI location = WebUtil.createLocation("/{id}", responseDTO.id());
    return ResponseEntity.created(location).body(responseDTO);
  }

  @GetMapping("/all")
  public ResponseEntity<Page<AdvertisementResponseDTO>> getAllSortedPaged(@RequestParam(defaultValue = "desc") String direction,
                                                                          @RequestParam(defaultValue = "createdAt") String sortBy,
                                                                          @RequestParam(defaultValue = "0") short page,
                                                                          @RequestParam(defaultValue = "8") byte size,
                                                                          @RequestParam(required = false) String name) {
    Pageable pageable = PageRequest.of(page, size, direction.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);

    return ResponseEntity.ok().body(advertisementService.getAllSortedPaged(pageable, name));
  }

  @GetMapping("/{id}")
  public ResponseEntity<AdvertisementResponseDTO> getOneEntity(@PathVariable long id) {
    return ResponseEntity.ok().body(advertisementService.getOneEntity(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteEntity(@PathVariable long id) {
    advertisementService.deleteEntity(id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<AdvertisementResponseDTO> updateEntity(@Valid @RequestBody AdvertisementRequestDTO dto, @PathVariable long id) {
    return ResponseEntity.ok().body(advertisementService.updateEntity(dto, id));
  }

  @GetMapping("/my")
  public ResponseEntity<List<AdvertisementResponseDTO>> getAllUserAdds() {
    return ResponseEntity.ok().body(advertisementService.getAdvertisementsByUser());
  }

}
