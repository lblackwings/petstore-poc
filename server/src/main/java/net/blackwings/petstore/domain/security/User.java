package net.blackwings.petstore.domain.security;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

/**
 * User
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 04/01/2016.
 */
@Getter
@Setter
@Entity
@EqualsAndHashCode(of = {"id"})
@ToString
@Table(name = "USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_USERS")
    @SequenceGenerator(name = "SEQ_USERS", sequenceName = "SEQ_USERS", allocationSize=1)
    private Long id;

    @Column(name = "USERNAME", nullable = false, length = 100)
    private String username;

    @Column(name = "PASSWORD", nullable = false, length = 100)
    private String password;

    @Column(name = "ENABLED")
    private boolean enabled;

    @Column(name = "FIRSTNAME", nullable = false, length = 50)
    private String firstname;

    @Column(name = "LASTNAME", nullable = false, length = 50)
    private String lastname;

    @Column(name = "EMAIL", nullable = false, length = 100)
    private String email;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JoinTable(name = "USER_PERM", joinColumns = @JoinColumn(name="USER_ID"), inverseJoinColumns = @JoinColumn(name="PERM_ID"))
    private List<Permission> permissions;
}
