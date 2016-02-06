package net.blackwings.petstore.converter.business.impl;

import net.blackwings.petstore.converter.business.UserConverter;
import net.blackwings.petstore.domain.security.User;
import net.blackwings.petstore.dto.business.BasicUser;

/**
 * Default Implementation of UserConverter. <br/>
 *
 * @author Michael BERNAGOU, Sfeir Benelux
 * @version 1.0, 19/10/2015
 */
public class UserConverterImpl implements UserConverter {


    @Override
    public User convertToDomainObject(BasicUser dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        user.setEmail(dto.getEmail());
        user.setPermissions(dto.getPermissions());
        return user;
    }

    @Override
    public BasicUser convertToDataTransferObject(User dom) {
        BasicUser basicUser = new BasicUser();
        basicUser.setUsername(dom.getUsername());
        basicUser.setFirstname(dom.getFirstname());
        basicUser.setLastname(dom.getLastname());
        basicUser.setEmail(dom.getEmail());
        basicUser.setPermissions(dom.getPermissions());
        return basicUser;
    }
}
