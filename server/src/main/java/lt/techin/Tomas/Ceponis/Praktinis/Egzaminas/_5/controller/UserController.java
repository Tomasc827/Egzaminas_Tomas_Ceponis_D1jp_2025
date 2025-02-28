package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.controller;


import jakarta.validation.Valid;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.user.UserRequestDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.user.UserResponseDTO;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.service.UserService;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.util.WebUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserRequestDTO dto) {
        UserResponseDTO userResponseDTO = userService.createUser(dto);
        URI location = WebUtil.createLocation("/{id}", userResponseDTO.id());
        return ResponseEntity.created(location).body(userResponseDTO);
    }

    @GetMapping("/avatar")
    public ResponseEntity<String> getUserAvatar() {
        return ResponseEntity.ok(userService.getUserAvatar());
    }
}
