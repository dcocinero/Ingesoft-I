package org.worm.bookhunt.club;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ClubControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testRemoveUserFromClub() throws Exception {
        String token = "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0dXNlcjE1NTU1NTU1NSIsImlhdCI6MTc0MDcwNzg1OCwiZXhwIj" +
                "oxNzQwNzQzODU4fQ.QMKIpeHrEtct6mSABJeYLKeTfuWEkgYasNt1mj3jMl_aiufQq4Ydz9vRAhfnWke5";
        String clubId = "67c0fc8b11d9dd000959316d";
        String userId = "testuser155555555";

        mockMvc.perform(MockMvcRequestBuilders.delete("/clubs/{clubId}/remove", clubId)
                        .param("userId", userId)
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void testRemoveUserFromClubUserNotInClub() throws Exception {
        String token = "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0dXNlcjE1NTU1NTU1NSIsImlhdCI6MTc0MDcwNzg1OCwiZXhwIj" +
                "oxNzQwNzQzODU4fQ.QMKIpeHrEtct6mSABJeYLKeTfuWEkgYasNt1mj3jMl_aiufQq4Ydz9vRAhfnWke5";
        String clubId = "67c0fc8b11d9dd000959316d";
        String userId = "testuser155555555";

        // First remove attempt
        mockMvc.perform(MockMvcRequestBuilders.delete("/clubs/{clubId}/remove", clubId)
                        .param("userId", userId)
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        // Second remove attempt
        mockMvc.perform(MockMvcRequestBuilders.delete("/clubs/{clubId}/remove", clubId)
                        .param("userId", userId)
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    void testJoinClub() throws Exception {
        String token = "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0dXNlcjE1NTU1NTU1NSIsImlhdCI6MTc0MDkzODIyNiwiZXhwIjoxNzQwOTc0MjI2fQ.eY8AgpgmBjeWwiZrVQUorXlY8eboIKnkp0GJL2GoZiPmj4oXxEOYmzB_U6IgiYz0";
        String clubId = "67c105c5f7fe2157cb7434c0";
        String userId = "testuser155555555";

        mockMvc.perform(MockMvcRequestBuilders.post("/clubs/{clubId}/join", clubId)
                        .param("userId", userId)
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void testJoinClubUserAlreadyInClub() throws Exception {
        String token = "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0dXNlcjE1NTU1NTU1NSIsImlhdCI6MTc0MDcwNzg1OCwiZXhwIj" +
                "oxNzQwNzQzODU4fQ.QMKIpeHrEtct6mSABJeYLKeTfuWEkgYasNt1mj3jMl_aiufQq4Ydz9vRAhfnWke5";
        String clubId = "67c0fc8b11d9dd000959316d";
        String userId = "testuser155555555";

        // First join attempt
        mockMvc.perform(MockMvcRequestBuilders.post("/clubs/{clubId}/join", clubId)
                        .param("userId", userId)
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        // Second join attempt
        mockMvc.perform(MockMvcRequestBuilders.post("/clubs/{clubId}/join", clubId)
                        .param("userId", userId)
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isConflict());
    }
}