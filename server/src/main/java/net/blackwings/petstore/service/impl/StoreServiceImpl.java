package net.blackwings.petstore.service.impl;

import net.blackwings.petstore.domain.Category;
import net.blackwings.petstore.domain.Tag;
import net.blackwings.petstore.repository.CategoryRepository;
import net.blackwings.petstore.repository.TagRepository;
import net.blackwings.petstore.service.StoreService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Store service implementation
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 06/01/2016.
 */
@Service
public class StoreServiceImpl implements StoreService {
    private static final Logger LOGGER = LoggerFactory.getLogger(StoreServiceImpl.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TagRepository tagRepository;

    @Override
    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public List<Tag> findAllTags() {
        return tagRepository.findAll();
    }

    @Override
    public List<String> findAllStatus() {
        List<String> status = new ArrayList<>();
        status.add("available");
        status.add("pending");
        status.add("sold");
        return status;
    }
}
