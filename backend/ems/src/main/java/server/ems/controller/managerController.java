package server.ems.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import server.ems.dto.LeaveRequestDTO;
import server.ems.repository.leaveRepo;
import server.ems.services.emailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/manager")
public class managerController {
    @Autowired
    private emailService emailService;

    @Autowired
    private leaveRepo leaveRepo;

    @GetMapping("/leave")
    public ResponseEntity<?> getAllLeaveRequests() {
        var leaves = leaveRepo.findAll();
        return ResponseEntity.ok().body(leaves);
    }

    @PutMapping("/leave/{id}")
    public ResponseEntity<?> updateLeaveRequest(@PathVariable String id, @RequestBody LeaveRequestDTO leaveRequest) {
        var leaveOpt = leaveRepo.findById(id);
        if (leaveOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Leave request not found");
        }
        var leave = leaveOpt.get();
        leave.setStatus(leaveRequest.getStatus());
        leaveRepo.save(leave);

        emailService.sendIndividualMail(leave.getEmployeeMail(), "Leave Request Update", 
            "Your leave request from " + leave.getStartDate() + " to " + leave.getEndDate() + " has been " + leave.getStatus() + ".");
        return ResponseEntity.ok().body("Leave request updated");
    }
    
}