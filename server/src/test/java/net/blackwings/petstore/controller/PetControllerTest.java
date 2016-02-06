package net.blackwings.petstore.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.blackwings.petstore.AbstractWebIntegrationTest;
import net.blackwings.petstore.dto.business.ListsDto;
import org.junit.Assert;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Test on PetController
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 11/01/2016.
 */
public class PetControllerTest extends AbstractWebIntegrationTest {
    private static final String CONTROLLER_URL = "/petstore/pet";

    /*@Test*/
    public void testGetLists() throws Exception {
        MvcResult mvcResult = this.mockMvc.perform(get( CONTROLLER_URL + "/create/init" ).contentType(MediaType.APPLICATION_JSON ) )
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON + ";charset=UTF-8"))
            .andReturn();

        ObjectMapper objectMapper = new ObjectMapper();
        String responseBody = mvcResult.getResponse().getContentAsString();
        ListsDto dto = objectMapper.readValue(responseBody, new TypeReference<ListsDto>() {});
        Assert.assertEquals(5L , dto.getCategories().size());
        Assert.assertEquals(3L , dto.getStatus().size());
    }
}
