package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.repository;

import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.Advertisement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {
  Page<Advertisement> findByNameContaining(String name, Pageable pageable);

  List<Advertisement> findByUserId(Long userId);

  List<Advertisement> findByCategoryId(Long categoryId);
}