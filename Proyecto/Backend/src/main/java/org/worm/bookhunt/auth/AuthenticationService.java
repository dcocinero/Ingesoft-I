package org.worm.bookhunt.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.worm.bookhunt.auth.exceptions.InvalidCredentialsException;
import org.worm.bookhunt.auth.exceptions.UserAlreadyExistsException;
import org.worm.bookhunt.user.Role;
import org.worm.bookhunt.user.User;
import org.worm.bookhunt.user.UserRepository;
import org.worm.bookhunt.config.JwtService;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse register(RegisterRequest request) {
        try {
            if (repository.findByUsername(request.getUsername()).isPresent()) {
                throw new RuntimeException("Username already exists");
            } else if (repository.findByEmail(request.getEmail()).isPresent()) {
                throw new RuntimeException("Email already exists");

            }
            var user = User.builder()
                    .username(request.getUsername())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.USER)
                    .build();
            repository.save(user);
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        } catch (UserAlreadyExistsException e) {
            throw new RuntimeException("User already exists");
        }

    }

    public AuthenticationResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
            var user = repository.findByUsername(request.getUsername()).orElseThrow();
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        } catch (AuthenticationException e) {
            throw new InvalidCredentialsException("Invalid username or password");
        }
    }
}
