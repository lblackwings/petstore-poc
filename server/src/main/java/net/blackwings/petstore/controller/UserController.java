package net.blackwings.petstore.controller;

import net.blackwings.petstore.converter.business.UserConverter;
import net.blackwings.petstore.converter.helper.ConverterHelper;
import net.blackwings.petstore.domain.security.User;
import net.blackwings.petstore.dto.business.BasicUser;
import net.blackwings.petstore.security.SecurityUtils;
import net.blackwings.petstore.service.security.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

/**
 * User controller
 * Not expose to swagger
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 05/01/2016.
 */
@ApiIgnore
@RestController
public class UserController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private static final UserConverter USER_CONVERTER = (UserConverter) ConverterHelper.getConverter(User.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/petstore/user/current", method = RequestMethod.GET)
    public BasicUser getCurrentUser() {
        LOGGER.info(" User.getCurrentUser");
        User user = userService.getCurrentUser(SecurityUtils.getCurrentLogin());
        return USER_CONVERTER.convertToDataTransferObject(user);
    }
}
