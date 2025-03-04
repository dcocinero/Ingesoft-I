package org.worm.bookhunt.auth;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTests {

    @Autowired
    private MockMvc mockMvc;

    /*@Test
    void testRegister() throws Exception {
        String userJson = "{\"username\":\"testuser5\", \"password\":\"password123\", \"email\":\"testuser@example.com\"}";

        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isOk());
    }*/

    /*@Test
    void testLogin() throws Exception {
        String loginJson = "{\"username\":\"testuser\", \"password\":\"password123\"}";

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                .andExpect(status().isOk());
    }

    @Test
    void testRegisterWithEmptyParams() throws Exception {
        String emptyUserJson = "{\"username\":\"\", \"email\":\"\", \"password\":\"\" }";

        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(emptyUserJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testLoginWithEmptyParams() throws Exception {
        String emptyLoginJson = "{\"username\":\"\", \"password\":\"\"}";

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(emptyLoginJson))
                .andExpect(status().isForbidden());
    }*/

    /*@Test
    void testRegisterDuplicateUser() throws Exception {
        String userJson = "{\"username\":\"testuser1\", \"password\":\"password123\", \"email\":\"testuser1@example.com\"}";

        // Register the first user
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isOk());

        // Attempt to register the same user again
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isConflict())
                .andExpect(result -> assertInstanceOf(RuntimeException.class, result.getResolvedException()))
                .andExpect(result -> assertEquals("Username already exists", Objects.requireNonNull(result.getResolvedException()).getMessage()));
    }*/
}