package net.blackwings.petstore.repository;

import net.blackwings.petstore.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Category repository
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 06/01/2016.
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
