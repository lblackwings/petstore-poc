package net.blackwings.petstore.converter.business;

import net.blackwings.petstore.converter.BasicConverter;
import net.blackwings.petstore.domain.Pet;
import net.blackwings.petstore.dto.business.BasicPet;

/**
 * Pet converter definition
 *
 * @author Michael Bernagou, Sfeir benelux
 * @date 04/01/2016.
 */
public interface PetConverter extends BasicConverter<Pet, BasicPet> {
}
