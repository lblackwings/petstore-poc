package net.blackwings.petstore.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.blackwings.petstore.converter.business.PetConverter;
import net.blackwings.petstore.converter.helper.ConverterHelper;
import net.blackwings.petstore.domain.Pet;
import net.blackwings.petstore.domain.PetFilter;
import net.blackwings.petstore.dto.business.BasicPet;
import net.blackwings.petstore.dto.business.ListsDto;
import net.blackwings.petstore.service.PetService;
import net.blackwings.petstore.service.StoreService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.List;

/**
 * Controller for Pet
 *
 * @author Michael BERNAGOU, Sfeir Benelux
 * @date 04/01/2016.
 */
@Api(description = "Pet Controller API")
@RestController
@RequestMapping("/petstore/pet")
public class PetController {
    private static final Logger LOGGER = LoggerFactory.getLogger(PetController.class);

    private static final PetConverter PET_CONVERTER = (PetConverter) ConverterHelper.getConverter(Pet.class);

    @Autowired
    private PetService petService;

    @Autowired
    private StoreService storeService;

    @Autowired
    private Docket petApi;

    @ApiOperation(value = "List of available categories and status")
    @PreAuthorize("hasRole('ADD')")
    @RequestMapping(value= "/create/init", method = RequestMethod.GET)
    public ListsDto getLists() {
        ListsDto dto = new ListsDto();
        dto.setCategories(storeService.findAllCategories());
        dto.setStatus(storeService.findAllStatus());
        return dto;
    }

    @ApiOperation(value = "Add a new pet")
    @PreAuthorize("hasRole('ADD')")
    @RequestMapping(method = RequestMethod.POST)
    public BasicPet create(@RequestBody BasicPet newPet) {
        LOGGER.info("# create pet " + newPet.getName());
        return PET_CONVERTER.convertToDataTransferObject(petService.create(newPet));
    }

    @ApiOperation(value = "Delete a pet via its ID")
    @PreAuthorize("hasRole('DELETE')")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable(value = "id") String id) {
        LOGGER.info("# delete pet " + id);
        petService.delete(new Long(id));
    }

    @ApiOperation(value = "Find a pet using its ID")
    @PreAuthorize("hasRole('SEARCH')")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public BasicPet findById(@PathVariable(value = "id") String id) {
        LOGGER.info("# findById pet " + id);
        return PET_CONVERTER.convertToDataTransferObject(petService.searchById(new Long(id)));
    }

    @ApiOperation(value = "Find pets using filter")
    @PreAuthorize("hasRole('SEARCH')")
    @RequestMapping(value = "/filter", method = RequestMethod.POST)
    public List<BasicPet> find(@RequestBody PetFilter filter) {
        LOGGER.info("# find " + filter);
        return null;
    }

}
