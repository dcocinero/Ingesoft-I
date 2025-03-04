package org.worm.bookhunt.club;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.hasSize;

@SpringBootTest
@AutoConfigureMockMvc
public class HomeControllerTests {

    @Autowired
    private MockMvc mockMvc;

    /*@Test
    void testGetUserClubs() throws Exception {
        String token = "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0dXNlcjE1NTU1NTU1NSIsImlhdCI6MTc0MDcwNzg1OCwiZXhwIj" +
                "oxNzQwNzQzODU4fQ.QMKIpeHrEtct6mSABJeYLKeTfuWEkgYasNt1mj3jMl_aiufQq4Ydz9vRAhfnWke5";

        mockMvc.perform(MockMvcRequestBuilders.get("/home/clubs")
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }*/

    /*@Test
    void testGetUserClubsWithInvalidToken() throws Exception {
        String invalidToken = "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImlhdCI6MTc0MDcwOTI0OSwiZXhwIjoxNzQ" +
                "wNzQ1MjQ5fQ.T2YI2o1wNachBDnwoYP6tD_Ho709wfy7YCNp_Hha9v-N9CU99HCv62ITYvKELqdS";

        mockMvc.perform(MockMvcRequestBuilders.get("/home/clubs")
                        .header("Authorization", invalidToken)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }*/
}