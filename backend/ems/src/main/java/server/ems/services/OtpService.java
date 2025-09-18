package server.ems.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.redis.core.StringRedisTemplate;
import java.util.concurrent.TimeUnit;

@Service
public class OtpService {
    
    @Autowired
    private StringRedisTemplate redisTemplate;
    
    public String generateOTP(String email) {

        
        int otp = (int)(Math.random() * 900000) + 100000;
        String optStr = String.valueOf(otp);
        redisTemplate.opsForValue().set(email, optStr);
        redisTemplate.expire(email, 5, TimeUnit.MINUTES);
        return optStr;
    }
}
