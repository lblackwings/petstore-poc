package net.blackwings.petstore.dto.business;

import lombok.Getter;
import lombok.Setter;
import net.blackwings.petstore.domain.security.Permission;
import net.blackwings.petstore.dto.common.DTO;

import java.util.List;

/**
 * DTO for User
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 05/01/2016.
 */
@Getter
@Setter
public class BasicUser implements DTO {
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private List<Permission> permissions;
}
