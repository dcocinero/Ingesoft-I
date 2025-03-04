package org.worm.bookhunt.club;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.worm.bookhunt.user.User;
import org.worm.bookhunt.user.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClubService {
    private final ClubRepository clubRepository;
    private final UserRepository userRepository;

    public List<Club> getUserClubs(String userName) {
        Optional<User> userOptional = userRepository.findByUsername(userName);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getClubs().stream()
                    .map(clubRepository::findById)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .collect(Collectors.toList());
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }

    public void addUserToClub(String clubId, String userName) {
        Optional<Club> clubOptional = clubRepository.findById(clubId);
        Optional<User> userOptional = userRepository.findByUsername(userName);

        if (clubOptional.isPresent() && userOptional.isPresent()) {
            if (clubOptional.get().getMembers().contains(userName)) {
                throw new IllegalArgumentException("User already in club");
            }
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
            if (!clubOptional.get().getMembers().contains(userName)) {
                throw new IllegalArgumentException("User not in club");
            }
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

    public Club getClubById(String club){
        return clubRepository.findById(club).orElseThrow(() -> new IllegalArgumentException("Club not found"));
    }
}
