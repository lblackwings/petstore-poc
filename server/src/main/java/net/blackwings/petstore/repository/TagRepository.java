package net.blackwings.petstore.repository;

import net.blackwings.petstore.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Tag repository
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 06/01/2016.
 */
public interface TagRepository extends JpaRepository<Tag, Long> {
}
