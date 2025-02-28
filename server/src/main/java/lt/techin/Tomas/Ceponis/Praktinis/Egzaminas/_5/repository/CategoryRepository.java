package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.repository;

import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.Category;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.Advertisement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
  Optional<Category> findByName(String name);

  boolean existsByName(String name);

  List<Category> findByUserId(Long userId);
}
