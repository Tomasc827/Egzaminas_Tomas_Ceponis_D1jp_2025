package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.service;

import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.user.UserMapper;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.user.UserRequestDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.user.UserResponseDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.exception.AlreadyExistsException;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.User;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.repository.RoleRepository;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    public UserResponseDTO createUser(UserRequestDTO dto) {
        if (userRepository.existsByEmail(dto.email())) {
            throw new AlreadyExistsException("Email '" + dto.email() + "' already exists");
        }
        User user = UserMapper.toEntity(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.getRoles().add(roleRepository.findByName("ROLE_USER"));
        if (user.getImageURL() == null || user.getImageURL().isEmpty()) {
            user.setImageURL("https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-color-icon.png");
        }

        userRepository.save(user);

        return UserMapper.toDTO(user);
    }

    public String getUserAvatar() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user =
                userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException(
                        "Email not found"));
        return user.getImageURL();
    }
}
