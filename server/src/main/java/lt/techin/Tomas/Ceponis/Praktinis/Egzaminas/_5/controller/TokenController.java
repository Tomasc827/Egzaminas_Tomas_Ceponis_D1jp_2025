package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.controller;


import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.User;
import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/token")
public class TokenController {

    private final JwtEncoder jwtEncoder;
    private final UserRepository userRepository;

    public TokenController(JwtEncoder jwtEncoder, UserRepository userRepository) {
        this.jwtEncoder = jwtEncoder;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<String> token(Authentication authentication) {
        Instant currentTime = Instant.now();
        long plusSeconds = 360000L;

        User user =
                userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException(
                        "User Not Found"));

        String scope = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(currentTime)
                .expiresAt(currentTime.plusSeconds(plusSeconds))
                .subject(authentication.getName())
                .claim("scope",scope)
                .claim("userId",user.getId())
                .build();

        return ResponseEntity.ok().body(jwtEncoder.encode(JwtEncoderParameters.from(jwtClaimsSet)).getTokenValue());
    }
}
