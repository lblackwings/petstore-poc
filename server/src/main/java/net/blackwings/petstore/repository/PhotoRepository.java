package net.blackwings.petstore.repository;

import net.blackwings.petstore.domain.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Photo repository
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 07/01/2016.
 */
public interface PhotoRepository extends JpaRepository<Photo, Long> {
}
