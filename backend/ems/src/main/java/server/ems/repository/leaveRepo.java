package server.ems.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import server.ems.models.leaveModel;

public interface leaveRepo extends MongoRepository<leaveModel, String> {
    Optional<leaveModel> findByEmployeeMail(String employeeMail);
    Optional<leaveModel> findById(String id);
}