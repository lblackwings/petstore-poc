package net.blackwings.petstore.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

/**
 * Tag for pet
 *
 * @author Michael BERNAGOU, Sfeir Benelux
 * @date 04/01/2016.
 */
@Getter
@Setter
@Entity
@EqualsAndHashCode(of = {"id"})
@ToString
@Table(name = "TAG")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_CAT")
    @SequenceGenerator(name = "SEQ_CAT", sequenceName = "SEQ_CAT", allocationSize=1)
    private Long id;

    @Column(name="NAME", nullable = false, length = 100)
    private String tag;
}
