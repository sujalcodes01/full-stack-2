package com.experiment.restapi;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PostControllerTest {
    @Autowired MockMvc mockMvc;

    @Test
    void createsAValidPost() throws Exception {
        mockMvc.perform(post("/api/posts").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"REST APIs\",\"content\":\"Experiment post\",\"author\":\"Student\"}"))
                .andExpect(status().isCreated()).andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.title").value("REST APIs"));
    }

    @Test
    void rejectsAnInvalidPost() throws Exception {
        mockMvc.perform(post("/api/posts").contentType(MediaType.APPLICATION_JSON).content("{}"))
                .andExpect(status().isBadRequest()).andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.data.title").exists());
    }
}
