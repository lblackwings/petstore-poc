package net.blackwings.petstore.service;

import net.blackwings.petstore.domain.Category;
import net.blackwings.petstore.domain.Tag;

import java.util.List;

/**
 * Store service definition
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 06/01/2016.
 */
public interface StoreService {

    /**
     * Find all pet categories
     * @return The list of all categories
     */
    List<Category> findAllCategories();

    /**
     * Find all tags
     * @return The list of all tags
     */
    List<Tag> findAllTags();

    /**
     * Find all status
     * @return The list of status
     */
    List<String> findAllStatus();
}
