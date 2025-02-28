package lt.techin.Tomas.Ceponis.Praktinis.Egzaminas._5.util;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

public class WebUtil {

    public static URI createLocation(String path, Long id) {
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path(path)
                .buildAndExpand(id)
                .toUri();
    }
}
