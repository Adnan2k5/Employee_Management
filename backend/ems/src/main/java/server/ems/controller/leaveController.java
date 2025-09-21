package server.ems.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import lombok.Data;
import server.ems.models.leaveModel;
import server.ems.models.userModel;
import server.ems.repository.userRepo;
import server.ems.repository.leaveRepo;
import server.ems.services.emailService;

@RestController
@RequestMapping("/api/employee")
public class leaveController {
    @Autowired
    private emailService emailService;
    @Autowired
    private userRepo userRepository;

    @Autowired
    private leaveRepo leaveRepository;

    @PostMapping("/submitLeave")
    public ResponseEntity<?> createLeaveRequest(@RequestBody LeaveRequest req){
        userModel user = userRepository.findByEmail(req.getEmployeeMail()).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        leaveModel leave = new leaveModel();
        leave.setEmployeeId(user.getId());
        leave.setEmployeeMail(user.getEmail());
        leave.setStartDate(req.getStartDate());
        leave.setEndDate(req.getEndDate());
        leave.setReason(req.getReason());
        leave.setStatus("Pending");
        leaveRepository.save(leave);

        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("MMM dd, yyyy");
        
        String formattedStartDate = LocalDate.parse(req.getStartDate().substring(0, 10)).format(outputFormatter);
        String formattedEndDate = LocalDate.parse(req.getEndDate().substring(0, 10)).format(outputFormatter);
        
        String to = user.getEmail();
        String subject = "Leave Request Submitted";
        String body;
        if ("single".equals(req.getType()) || req.getStartDate().substring(0, 10).equals(req.getEndDate().substring(0, 10))) {
            body = "Your leave request on " + formattedStartDate + " has been submitted.";
        } else {
            body = "Your leave request from " + formattedStartDate + " to " + formattedEndDate + " has been submitted.";
        }
        emailService.sendIndividualMail(to, subject, body);
        return ResponseEntity.status(HttpStatus.OK).body("Leave request submitted successfully");
    }
}


@Data
class LeaveRequest{
    private String employeeMail;
    private String startDate;
    private String endDate;
    private String reason;
    private String status;
    private String type; // "single" for one day, "range" for multiple dates
}
