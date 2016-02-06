package net.blackwings.petstore.converter.business;

import net.blackwings.petstore.converter.BasicConverter;
import net.blackwings.petstore.domain.security.User;
import net.blackwings.petstore.dto.business.BasicUser;

/**
 * User converter definition
 *
 * @author Michael Bernagou, Sfeir benelux
 * @date 05/01/2016.
 */
public interface UserConverter extends BasicConverter<User, BasicUser> {
}
