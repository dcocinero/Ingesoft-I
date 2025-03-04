package org.worm.bookhunt.club;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.worm.bookhunt.config.JwtService;

import java.util.List;


@RestController
@RequestMapping("/clubs")
@RequiredArgsConstructor
public class ClubController {
    private final ClubService clubService;
    private final JwtService jwtService;

    @GetMapping("/popular")
    public ResponseEntity<List<Club>> getPopularClubs() {
        List<Club> clubs = clubService.getPopularClubs();
        return ResponseEntity.ok(clubs);
    }

    @GetMapping("/{clubId}/home")
    public ResponseEntity<Club> getClubHome(@PathVariable String clubId) {
        Club club = clubService.getClubById(clubId);
        return ResponseEntity.ok(club);
    }

    @PostMapping("/{clubId}/join")
    public ResponseEntity<String> joinClub(@PathVariable String clubId, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7); // Remove "Bearer " prefix
        String tokenUserId = jwtService.extractUsername(token);

        clubService.addUserToClub(clubId, tokenUserId);
        return ResponseEntity.ok("User joined the club successfully");
    }

    @DeleteMapping("/{clubId}/remove")
    public ResponseEntity<String> removeUserFromClub(@PathVariable String clubId, @RequestParam String userId, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7); // Remove "Bearer " prefix
        String tokenUserId = jwtService.extractUsername(token);

        if (!tokenUserId.equals(userId)) {
            return ResponseEntity.status(403).body("User ID does not match token");
        }

        clubService.removeUserFromClub(clubId, userId);
        return ResponseEntity.ok("User removed from the club successfully");
    }
}