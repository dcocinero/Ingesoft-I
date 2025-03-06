package org.worm.bookhunt.club;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.worm.bookhunt.chat.ChatMessage;
import org.worm.bookhunt.chat.ChatMessageRepository;
import org.worm.bookhunt.config.JwtService;

import java.util.List;


@RestController
@RequestMapping("/clubs")
@RequiredArgsConstructor
public class ClubController {
    private final ClubService clubService;
    private final JwtService jwtService;
    private final ChatMessageRepository chatMessageRepository;

    @GetMapping("/{clubId}/messages")
    public List<ChatMessage> getMessages(@PathVariable String clubId) {
        return chatMessageRepository.findByClubId(clubId);
    }

    @GetMapping("/{clubId}/home")
    public ResponseEntity<Club> getClubHome(@PathVariable String clubId, HttpServletRequest request) {
        try {
            Club club = clubService.getClubById(clubId);
            if (!clubService.isUserInClub(clubId, getUserName(request))) {
                return ResponseEntity.status(403).body(null);
            }
            return ResponseEntity.ok(club);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    @PostMapping("/{clubId}/join")
    public ResponseEntity<String> joinClub(@PathVariable String clubId, HttpServletRequest request) {
        clubService.addUserToClub(clubId, getUserName(request));
        return ResponseEntity.ok("User joined the club successfully");
    }

    @DeleteMapping("/{clubId}/remove")
    public ResponseEntity<String> removeUserFromClub(@PathVariable String clubId, HttpServletRequest request) {
        if (!clubService.isUserInClub(clubId, getUserName(request))) {
            return ResponseEntity.status(403).body(null);
        }
        clubService.removeUserFromClub(clubId, getUserName(request));
        return ResponseEntity.ok("User removed from the club successfully");
    }

    private String getUserName(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7); // Remove "Bearer " prefix
        return jwtService.extractUsername(token);
    }
}