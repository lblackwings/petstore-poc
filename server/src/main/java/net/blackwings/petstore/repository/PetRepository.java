package net.blackwings.petstore.repository;

import net.blackwings.petstore.domain.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Pet repository
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 07/01/2016.
 */
public interface PetRepository extends JpaRepository<Pet, Long> {
}
