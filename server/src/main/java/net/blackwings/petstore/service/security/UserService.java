package net.blackwings.petstore.service.security;

import net.blackwings.petstore.domain.security.User;

/**
 * User service
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 05/01/2016.
 */
public interface UserService {

    User getCurrentUser(String username);
}
