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
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;

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
    public ResponseEntity<?> verify(@RequestBody AuthRequest req, HttpServletResponse response) {
        String storedOtp = otpService.redisTemplate.opsForValue().get(req.getEmail());
        if (storedOtp == null || !storedOtp.equals(req.getOtp())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired OTP");
        }
        userModel entity = new userModel();
        entity.setEmail(req.getEmail());
        entity.setPassword(encoder.encode(req.getPassword()));
        entity.setName(req.getName());
        entity.setRole("employee");
        userRepository.save(entity);

        String token = jwtUtil.generateToken(entity.getEmail());
        Cookie cookie = new Cookie("access-token", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60 * 60);
        response.addCookie(cookie);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }
    

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req, HttpServletResponse response) {
        userModel user = userRepository.findByEmail(req.getEmail()).orElse(null);
        if (user != null && encoder.matches(req.getPassword(), user.getPassword())) {
            String token = jwtUtil.generateToken(user.getEmail());
            Cookie cookie = new Cookie("access-token", token);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(24 * 60 * 60 * 60);
            response.addCookie(cookie);
            return ResponseEntity.status(HttpStatus.OK).body("Login successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }

    @GetMapping("/validate")
    public ResponseEntity<?> verifyJwtToken(@CookieValue(value = "access-token", required = false) String token) {
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login required");
        }
        try{
            String email = jwtUtil.extractEmail(token);
            userModel user = userRepository.findByEmail(email).orElse(null);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }
            UserResponse userResponse = new UserResponse();

            userResponse.setId(user.getId());
            userResponse.setEmail(user.getEmail());
            userResponse.setRole(user.getRole());
            userResponse.setName(user.getName());
            return ResponseEntity.ok(userResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }
}


@Data
class AuthRequest{
    private String email;
    private String password;
    private String otp;
    private String name;
}

@Data
class AuthResponse{
    private final String token;
}

@Data
class UserResponse{
    private String id;
    private String email;
    private String role;
    private String name;
}