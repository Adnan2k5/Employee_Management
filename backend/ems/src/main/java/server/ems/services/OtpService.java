package server.ems.services;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class OtpService {

    public final StringRedisTemplate redisTemplate;

    public OtpService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public String generateOTP(String email) {
        int otp = (int) (Math.random() * 900000) + 100000;
        String otpStr = String.valueOf(otp);
        redisTemplate.opsForValue().set(email, otpStr, 5, TimeUnit.MINUTES);

        return otpStr;
    }

    public boolean validateOTP(String email, String otp) {
        String storedOtp = redisTemplate.opsForValue().get(email);

        if (storedOtp != null && storedOtp.equals(otp)) {
            redisTemplate.delete(email);
            return true;
        }
        return false;
    }
}
