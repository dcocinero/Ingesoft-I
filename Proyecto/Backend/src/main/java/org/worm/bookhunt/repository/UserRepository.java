package org.worm.bookhunt.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.worm.bookhunt.model.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
