package net.blackwings.petstore.service;

import net.blackwings.petstore.domain.Pet;
import net.blackwings.petstore.dto.business.BasicPet;

/**
 * Pet Serice definition
 *
 * @author Michael BERNBAGOU, Sfeir Benelux
 * @date 04/01/2016.
 */
public interface PetService {

    /**
     * Create a pet in the store
     * @param newPet The new pet
     * @return The newly created pet
     */
    Pet create(BasicPet newPet);

    /**
     * Delete a pet from the store
     * @param id The pet id to delete
     */
    void delete(long id);

    /**
     * Find a pet by its unique id
     * @param id The id of the pet to find
     * @return The found pet, null otherwise
     */
    Pet searchById(long id);
}
