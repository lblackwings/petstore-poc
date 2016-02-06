package net.blackwings.petstore.configuration;

import net.blackwings.petstore.security.AjaxAuthenticationFailureHandler;
import net.blackwings.petstore.security.AjaxAuthenticationSuccessHandler;
import net.blackwings.petstore.security.AjaxLogoutSuccessHandler;
import net.blackwings.petstore.security.Http401UnauthorizedEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import javax.sql.DataSource;

/**
 * Configuration for security
 *
 * @author Michael BERNAGOU, Sfeir Benelux
 * @date 03/01/2016.
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(Ordered.LOWEST_PRECEDENCE - 6)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private AjaxAuthenticationSuccessHandler ajaxAuthenticationSuccessHandler;

    @Autowired
    private AjaxAuthenticationFailureHandler ajaxAuthenticationFailureHandler;

    @Autowired
    private AjaxLogoutSuccessHandler ajaxLogoutSuccessHandler;

    @Autowired
    private Http401UnauthorizedEntryPoint authenticationEntryPoint;

    @Autowired
    DataSource dataSource;

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
            .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint)
            .and()
            .formLogin()
                .loginProcessingUrl("/petstore/authentication")
                .usernameParameter("username").passwordParameter("password")
                .successHandler(ajaxAuthenticationSuccessHandler)
                .failureHandler(ajaxAuthenticationFailureHandler)
                .permitAll()
            .and()
            .logout()
                .logoutUrl("/petstore/logout")
                .logoutSuccessHandler(ajaxLogoutSuccessHandler)
                .deleteCookies("JSESSIONID")
                .permitAll()
            .and()
            .authorizeRequests()
                .antMatchers("/*").permitAll()
                .antMatchers("/console/**").permitAll()
                .antMatchers("/petstore/**").authenticated()
            .and()
            .csrf().disable()
            .headers().frameOptions().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication()
            .dataSource(dataSource)
            .usersByUsernameQuery("select username, password, enabled from users where username = ?")
            .authoritiesByUsernameQuery("select username, permission.name as role from permission, users, user_perm where users.id = user_perm.user_id and permission.id = user_perm.perm_id and users.username = ? ");
    }
}
