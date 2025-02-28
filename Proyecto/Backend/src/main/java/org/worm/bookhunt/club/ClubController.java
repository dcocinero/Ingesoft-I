package org.worm.bookhunt.club;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.worm.bookhunt.config.JwtService;


@RestController
@RequestMapping("/clubs")
@RequiredArgsConstructor
public class ClubController {
    private final ClubService clubService;
    private final JwtService jwtService;

    @PostMapping("/{clubId}/join")
    public ResponseEntity<String> joinClub(@PathVariable String clubId, @RequestParam String userId, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7); // Remove "Bearer " prefix
        String tokenUserId = jwtService.extractUsername(token);

        if (!tokenUserId.equals(userId)) {
            return ResponseEntity.status(403).body("User ID does not match token");
        }

        clubService.addUserToClub(clubId, userId);
        return ResponseEntity.ok("User joined the club successfully");
    }
}