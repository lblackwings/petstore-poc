package net.blackwings.petstore.service.impl;

import net.blackwings.petstore.domain.Category;
import net.blackwings.petstore.domain.Pet;
import net.blackwings.petstore.domain.Photo;
import net.blackwings.petstore.domain.Tag;
import net.blackwings.petstore.dto.business.BasicPet;
import net.blackwings.petstore.repository.CategoryRepository;
import net.blackwings.petstore.repository.PetRepository;
import net.blackwings.petstore.repository.PhotoRepository;
import net.blackwings.petstore.repository.TagRepository;
import net.blackwings.petstore.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * The Pet service implementation
 *
 * @author Michael BERNAGOU
 * @date 04/01/2016.
 */
@Service
public class PetServiceImpl implements PetService {

    @Autowired
    PetRepository petRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    PhotoRepository photoRepository;

    @Override
    public Pet create(BasicPet newPet) {
        Pet pet = new Pet();
        pet.setName(newPet.getName());
        pet.setStatus(newPet.getStatus());

        if (!CollectionUtils.isEmpty(newPet.getCategories())) {
            List<Category> categories = new ArrayList<>();
            for (Category cat : newPet.getCategories()) {
                if (cat.getId() != null) {
                    categories.add(categoryRepository.findOne(cat.getId()));
                } else {
                    categories.add(categoryRepository.save(cat));
                }
            }
            pet.setCategories(categories);
        }

        if (!CollectionUtils.isEmpty(newPet.getTags())){
            List<Tag> tags = new ArrayList<>();
            for (Tag tag : newPet.getTags()) {
                if (tag.getId() != null) {
                    tags.add(tagRepository.findOne(tag.getId()));
                } else {
                    tags.add(tagRepository.save(tag));
                }
            }
            pet.setTags(tags);
        }

        Pet savedPet = petRepository.save(pet);

        if (!CollectionUtils.isEmpty(newPet.getPhotos())) {
            List<Photo> photos = new ArrayList<>();
            for (Photo photo : newPet.getPhotos()) {
                photo.setPet(savedPet);
                if (photo.getId() != null) {
                    Photo savedPhoto = photoRepository.findOne(photo.getId());
                    savedPhoto.setUrl(photo.getUrl());
                } else {
                    photos.add(photoRepository.save(photo));
                }
            }
            pet.setPhotos(photos);
        }

        return savedPet;
    }

    @Override
    public void delete(long id) {
        petRepository.delete(id);
    }

    @Override
    public Pet searchById(long id) {
        return petRepository.findOne(id);
    }
}
