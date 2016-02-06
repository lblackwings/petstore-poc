package net.blackwings.petstore.domain.security;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

/**
 * Permission
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 04/01/2016.
 */
@Getter
@Setter
@Entity
@EqualsAndHashCode(of = {"id"})
@ToString
@Table(name = "PERMISSION")
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_PERM")
    @SequenceGenerator(name = "SEQ_PERM", sequenceName = "SEQ_PERM", allocationSize=1)
    private Long id;

    @Column(name = "NAME")
    private String name;
}
