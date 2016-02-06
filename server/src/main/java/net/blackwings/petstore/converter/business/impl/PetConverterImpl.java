package net.blackwings.petstore.converter.business.impl;

import net.blackwings.petstore.converter.business.PetConverter;
import net.blackwings.petstore.domain.Pet;
import net.blackwings.petstore.dto.business.BasicPet;

/**
 * Default Implementation of PetConverter. <br/>
 *
 * @author Michael BERNAGOU, Sfeir Benelux
 * @version 1.0, 19/10/2015
 */
public class PetConverterImpl implements PetConverter {


    @Override
    public Pet convertToDomainObject(BasicPet dto) {
        Pet pet = new Pet();
        pet.setId(dto.getId());
        pet.setName(dto.getName());
        pet.setStatus(dto.getStatus());
        pet.setCategories(dto.getCategories());
        pet.setTags(dto.getTags());
        pet.setPhotos(dto.getPhotos());
        return pet;
    }

    @Override
    public BasicPet convertToDataTransferObject(Pet dom) {
        if (dom == null) {
            return null;
        }
        BasicPet basicPet = new BasicPet();
        basicPet.setId(dom.getId());
        basicPet.setName(dom.getName());
        basicPet.setStatus(dom.getStatus());
        basicPet.setCategories(dom.getCategories());
        basicPet.setTags(dom.getTags());
        basicPet.setPhotos(dom.getPhotos());
        return basicPet;
    }
}
