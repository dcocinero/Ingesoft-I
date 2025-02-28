package org.worm.bookhunt.club;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.worm.bookhunt.user.User;
import org.worm.bookhunt.user.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClubService {
    private final ClubRepository clubRepository;
    private final UserRepository userRepository;

    public void addUserToClub(String clubId, String userName) {
        Optional<Club> clubOptional = clubRepository.findById(clubId);
        Optional<User> userOptional = userRepository.findByUsername(userName);

        if (clubOptional.isPresent() && userOptional.isPresent()) {
            Club club = clubOptional.get();
            User user = userOptional.get();

            if (!club.getMembers().contains(userName)) {
                club.getMembers().add(userName);
                clubRepository.save(club);

                user.getClubs().add(clubId);
                userRepository.save(user);
            }
        } else {
            throw new IllegalArgumentException("Club or User not found");
        }
    }

    public void removeUserFromClub(String clubId, String userName) {
        Optional<Club> clubOptional = clubRepository.findById(clubId);
        Optional<User> userOptional = userRepository.findByUsername(userName);

        if (clubOptional.isPresent() && userOptional.isPresent()) {
            Club club = clubOptional.get();
            User user = userOptional.get();

            if (club.getMembers().contains(userName)) {
                club.getMembers().remove(userName);
                clubRepository.save(club);

                user.getClubs().remove(clubId);
                userRepository.save(user);
            }
        } else {
            throw new IllegalArgumentException("Club or User not found");
        }
    }
}
