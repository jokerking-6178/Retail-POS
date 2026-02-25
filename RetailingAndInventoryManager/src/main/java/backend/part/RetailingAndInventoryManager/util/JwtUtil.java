package backend.part.RetailingAndInventoryManager.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret.key}")
    private String SECRET_KEY;

    // ✅ NEW: Generate SecretKey from string
    private SecretKey getSigningKey() {
        byte[] keyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    // ✅ UPDATED: New JJWT 0.12.3 syntax
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .claims(claims)  // Changed from setClaims
                .subject(subject)  // Changed from setSubject
                .issuedAt(new Date(System.currentTimeMillis()))  // Changed from setIssuedAt
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))  // 10hrs
                .signWith(getSigningKey())  // ✅ Updated signing method
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // ✅ UPDATED: New JJWT 0.12.3 parser syntax
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())  // Changed from setSigningKey
                .build()
                .parseSignedClaims(token)  // Changed from parseClaimsJws
                .getPayload();  // Changed from getBody
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}