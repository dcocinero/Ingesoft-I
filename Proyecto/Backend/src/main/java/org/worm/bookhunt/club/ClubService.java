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

    public List<Club> getPopularClubs() {
        List<Club> clubs = clubRepository.findAll();
        clubs.sort((c1, c2) -> Integer.compare(c2.getMembers().size(), c1.getMembers().size()));
        return clubs.stream().limit(5).collect(Collectors.toList());
    }

    public List<Club> getUserClubs(String userName) {
        return clubRepository.findAll().stream()
                .filter(club -> club.getMembers().contains(userName))
                .collect(Collectors.toList());
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
