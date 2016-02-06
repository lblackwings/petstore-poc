package net.blackwings.petstore.service.security.impl;

import net.blackwings.petstore.domain.security.User;
import net.blackwings.petstore.repository.security.UserRepository;
import net.blackwings.petstore.service.security.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * User service implementation
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 05/01/2016.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User getCurrentUser(String username) {
        return userRepository.findByUsername(username);
    }
}
