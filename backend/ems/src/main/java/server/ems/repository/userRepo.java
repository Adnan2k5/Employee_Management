package server.ems.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import server.ems.models.userModel;

public interface userRepo extends MongoRepository<userModel, String> {
    Optional<userModel> findByEmail(String email);
}