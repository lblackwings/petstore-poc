package net.blackwings.petstore.security;

import net.blackwings.petstore.enums.Action;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Utility class for Spring Security.
 */
public final class SecurityUtils {

    /**
     * Get the login of the current user.
     */
    public static String getCurrentLogin() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        if (authentication != null) {
            UserDetails springSecurityUser =
                    (UserDetails) securityContext
                            .getAuthentication().getPrincipal();

            return springSecurityUser.getUsername();
        }
        return null;
    }

    /**
     * Get the list of actions related to the Current User.
     */
    public static List<Action> getCurrentAuthorities() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Collection<? extends GrantedAuthority> authorities = securityContext.getAuthentication().getAuthorities();
        List<Action> result = new ArrayList<Action>(authorities.size());
        for (GrantedAuthority authority : authorities) {
            result.add(Action.valueOf(authority.getAuthority().substring(7)));
        }
        return result;
    }

    /**
     * Get the Current Session Id.
     */
    public static String getCurrentSessionId() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attr.getRequest().getSession().getId();
    }

    /**
     * @return the current user and its information
     */
    public static UserDetails getCurrentUser( ) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        UserDetails userDetails = null;
        Authentication authentication = securityContext.getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            userDetails = (UserDetails) authentication.getPrincipal();
        }
        return userDetails;
    }
}
