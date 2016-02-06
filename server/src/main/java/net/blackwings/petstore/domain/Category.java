package net.blackwings.petstore.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

/**
 * Category for a Pet
 *
 * @author Michael BERNAGOU, Sfeir Benelux
 * @date 04/01/2016.
 */
@Getter
@Setter
@Entity
@EqualsAndHashCode(of = {"id"})
@ToString
@Table(name = "CATEGORY")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_CAT")
    @SequenceGenerator(name = "SEQ_CAT", sequenceName = "SEQ_CAT", allocationSize=1)
    private Long id;

    @Column(name="NAME", nullable = false, length = 100)
    private String category;
}
