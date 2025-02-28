package org.worm.bookhunt.club;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.worm.bookhunt.config.JwtService;

import java.util.List;

@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {
    private final ClubService clubService;
    private final JwtService jwtService;

    @GetMapping("/clubs")
    public ResponseEntity<List<Club>> getUserClubs(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7); // Remove "Bearer " prefix
        String userName = jwtService.extractUsername(token);

        List<Club> clubs = clubService.getUserClubs(userName);
        return ResponseEntity.ok(clubs);
    }
}
