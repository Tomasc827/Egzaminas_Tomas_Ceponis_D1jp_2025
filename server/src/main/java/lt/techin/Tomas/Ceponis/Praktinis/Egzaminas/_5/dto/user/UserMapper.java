package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.dto.user;

import lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.model.User;

public class UserMapper {

    public static User toEntity(UserRequestDTO dto) {
        User user = new User();
        user.setEmail(dto.email().toLowerCase());
        user.setName(dto.name().toLowerCase());
        user.setPassword(dto.password());
        user.setImageURL(dto.imageURL());
        return user;
    }

    public static UserResponseDTO toDTO (User user) {
        return new UserResponseDTO(user.getId(),
                user.getName(),
                user.getImageURL());
    }
}
