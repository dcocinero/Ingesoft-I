package org.worm.bookhunt.club;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ClubInitializer implements CommandLineRunner {

    private final ClubRepository clubRepository;

    @Override
    public void run(String... args) throws Exception {
        if (clubRepository.count() == 1) {
            Club club = new Club();
            club.setName("Romance Club");
            club.setDescription("This is the default club created at startup.");
            clubRepository.save(club);
        }
    }
}
