package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.repository;

import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
