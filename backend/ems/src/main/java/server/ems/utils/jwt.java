package server.ems.utils;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.security.Keys;

@Service
public class jwt {
    private String secretKey = "secretKey123";
    private long expirationTime = 86400000;

    private Key getSignKey(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }

    public String generateToken(String email){
        return Jwts.builder()
                .setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSignKey())
                .compact();
    }
    public String extractEmail(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
