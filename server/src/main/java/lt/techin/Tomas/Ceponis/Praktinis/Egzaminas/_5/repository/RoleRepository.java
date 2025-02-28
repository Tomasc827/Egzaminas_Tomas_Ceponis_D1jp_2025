package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.repository;

import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Role findByName(String name);
    
}
