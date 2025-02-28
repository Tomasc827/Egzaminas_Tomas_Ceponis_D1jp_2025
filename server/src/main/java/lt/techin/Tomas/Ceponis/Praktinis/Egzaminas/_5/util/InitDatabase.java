package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.util;

import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.Role;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.User;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.repository.RoleRepository;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class InitDatabase {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public InitDatabase(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public CommandLineRunner init() {
        return args -> {
            if (roleRepository.count() == 0) {
                Role roleAdmin = new Role();
                roleAdmin.setName("ROLE_ADMIN");

                Role roleUser = new Role();
                roleUser.setName("ROLE_USER");

                roleRepository.save(roleAdmin);
                roleRepository.save(roleUser);
            }
            if (!userRepository.existsByEmail("admin@admin.com")) {
                User user = new User();
                user.setImageURL("https://www.wpeka.com/rgh/wp-content/uploads/2014/03/Changing-the-default-admin-user-in-WordPress1-460x575.jpg");
                user.setName("admin");
                user.setEmail("admin@admin.com");
                user.setPassword(passwordEncoder.encode("Something9!"));
                user.getRoles().add(roleRepository.findByName("ROLE_USER"));
                user.getRoles().add(roleRepository.findByName("ROLE_ADMIN"));

                User king = new User();
                king.setImageURL("https://toddmerrillstudio.com/wp-content/uploads/2021/02/6-800x800.jpg");
                king.setName("king");
                king.setEmail("some1@thing.com");
                king.setPassword(passwordEncoder.encode("Something9!"));
                king.getRoles().add(roleRepository.findByName("ROLE_USER"));

                User clown = new User();
                clown.setImageURL("https://images2.minutemediacdn.com/image/upload/c_fill,w_1200,ar_1:1,f_auto,q_auto,g_auto/shape/cover/sport/clown-4-104309a9de96b5c3b380947359b31f69.jpg");
                clown.setName("clown");
                clown.setEmail("some2@thing.com");
                clown.setPassword(passwordEncoder.encode("Something9!"));
                clown.getRoles().add(roleRepository.findByName("ROLE_USER"));

                userRepository.save(user);
                userRepository.save(king);
                userRepository.save(clown);

            }
        };
    }
}
