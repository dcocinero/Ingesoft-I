package org.worm.bookhunt.club;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.worm.bookhunt.user.User;
import org.worm.bookhunt.user.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClubService {
    private final ClubRepository clubRepository;
    private final UserRepository userRepository;

    public void addUserToClub(String clubId, String userId) {
        Optional<Club> clubOptional = clubRepository.findById(clubId);
        Optional<User> userOptional = userRepository.findById(userId);

        if (clubOptional.isPresent() && userOptional.isPresent()) {
            Club club = clubOptional.get();
            User user = userOptional.get();

            if (!club.getMembers().contains(userId)) {
                club.getMembers().add(userId);
                clubRepository.save(club);

                user.getClubs().add(clubId);
                userRepository.save(user);
            }
        } else {
            throw new IllegalArgumentException("Club or User not found");
        }
    }
}
