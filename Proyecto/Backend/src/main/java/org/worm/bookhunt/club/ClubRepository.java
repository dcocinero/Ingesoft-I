package org.worm.bookhunt.club;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClubRepository extends MongoRepository<Club, String> {
    boolean existsByName(String clubName);
}