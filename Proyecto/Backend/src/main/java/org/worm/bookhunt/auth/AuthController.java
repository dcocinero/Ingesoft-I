package org.worm.bookhunt.auth;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.worm.bookhunt.auth.exceptions.InvalidCredentialsException;
import org.worm.bookhunt.auth.exceptions.UserAlreadyExistsException;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> registerUser(@Valid @RequestBody RegisterRequest request) {
        try{
            return ResponseEntity.ok(authenticationService.register(request));
        } catch (UserAlreadyExistsException e){
            return ResponseEntity.badRequest().build(); // TODO return exception message whe user already exists and email already exists and handle it in the front end
        }

    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginUser(@RequestBody LoginRequest request) {
        try{
            return ResponseEntity.ok(authenticationService.login(request));
        } catch (InvalidCredentialsException e){
            return ResponseEntity.badRequest().build();
        }

    }
}
