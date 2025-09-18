package server.ems.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import lombok.Data;
import server.ems.models.userModel;
import server.ems.repository.userRepo;
import server.ems.services.OtpService;
import server.ems.services.emailService;
import server.ems.utils.jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/auth")
public class authController {
    
    @Autowired
    private userRepo userRepository;

    @Autowired
    private jwt jwtUtil;

    @Autowired
    private OtpService otpService;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest req){
        if(userRepository.findByEmail(req.getEmail()).isPresent()){
            return ResponseEntity.badRequest().body("User already exists");
        }
        String otp = otpService.generateOTP(req.getEmail());

        emailService.sendIndividualMail(req.getEmail(), "Your OTP Code", "Your OTP code is: " + otp + ". It is valid for 5 minutes.");
        return ResponseEntity.status(HttpStatus.CREATED).body("OTP sent to email");
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody String otp, @RequestBody String email, @RequestBody String password) {
        String storedOtp = otpService.redisTemplate.opsForValue().get(email);
        if (storedOtp == null || !storedOtp.equals(otp)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired OTP");
        }
        userModel entity = new userModel();
        entity.setEmail(email);
        entity.setPassword(encoder.encode(password));
        userRepository.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }
    

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        userModel user = userRepository.findByEmail(req.getEmail()).orElse(null);
        System.out.println(req.getEmail() + " " + req.getPassword());
        if (user != null && encoder.matches(req.getPassword(), user.getPassword())) {
            String token = jwtUtil.generateToken(user.getEmail());
            return ResponseEntity.status(HttpStatus.OK).body(new AuthResponse(token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }
}


@Data
class AuthRequest{
    private String email;
    private String password;
}

@Data
class AuthResponse{
    private final String token;
}