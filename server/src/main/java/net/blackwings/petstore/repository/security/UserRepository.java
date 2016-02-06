package net.blackwings.petstore.repository.security;

import net.blackwings.petstore.domain.security.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * User Repository
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 04/01/2016.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
}
