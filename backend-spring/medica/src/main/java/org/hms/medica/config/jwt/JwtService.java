package org.hms.medica.config.jwt;


import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.user.impl.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.header.Header;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;

@Service
@Slf4j
public class JwtService {

    @Value("${jwt.secret.key}")
    private String secretKey;

    @Value("${jwt.secret.expiration-time}")
    private Long jwtExpirationTime;

    @Value("${jwt.secret.refresh-token.expiration-time}")
    private Long jwtRefreshExpirationTime;

    public String generateJwtToken(Map<String, Object> extraClaims, UserDetails user) {
        return buildToken(extraClaims, user, jwtExpirationTime);
    }

    public String generateJwtToken(UserDetailsImpl userDetails) {
        Map<String, Object> extraClaim = new HashMap<>();
        extraClaim.put("role", userDetails.getAuthorities().stream().findFirst().orElseThrow(
                ()-> new RuntimeException("Role Not Found")
        ).getAuthority());
        extraClaim.put("username", userDetails.getFullName());
        return buildToken(extraClaim, userDetails, jwtExpirationTime);
    }

    public String generateJwtRefreshToken(UserDetails userDetails) {

        return buildToken(new HashMap<>(), userDetails, jwtRefreshExpirationTime);
    }

    private String buildToken(Map<String, Object> extraClaims, UserDetails user, Long expirationTime) {
        return Jwts.
                builder()
                .claims(extraClaims)
                .subject(user.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(new Date().getTime() + expirationTime))
                .signWith(getPrivateKey())
                .compact();
    }






    public Boolean validateJwtToken(String jwtToken, UserDetails userDetails) {
        try {
            String username = extractUsername(jwtToken);
            return (Objects.equals(username, userDetails.getUsername()) && !isTokenExpired(jwtToken));
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println("hello from Expired Jwt");
            log.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }

    private boolean isTokenExpired(String jwtToken) {
        return getExpirationTime(jwtToken).before(new Date());
    }

    private Date getExpirationTime(String jwtToken) {
        return extractClaim(jwtToken, Claims::getExpiration);
    }

    public String extractUsername(String jwtToken) {
        return extractClaim(jwtToken, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaims(String token){
        Claims claims = null;
        try {
           claims  = Jwts.parser()
                    .verifyWith(getPrivateKey())
                    .build().parseSignedClaims(token)
                    .getPayload();
        }catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
            throw new MalformedJwtException("Invalid JWT token: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
            throw new ExpiredJwtException(null, claims, "JWT token is expired: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
            throw new UnsupportedJwtException("JWT token is unsupported: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
            throw new IllegalArgumentException("JWT claims string is empty: " + e.getMessage());
        }
        return claims;
    }

    private SecretKey getPrivateKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
