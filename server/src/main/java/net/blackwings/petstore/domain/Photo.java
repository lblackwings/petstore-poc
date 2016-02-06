package net.blackwings.petstore.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

/**
 * Photo definition
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 03/01/2016.
 */
@Entity
@Getter
@Setter
@EqualsAndHashCode(of = {"id"})
@ToString
@Table(name = "PHOTO_URL")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_PHOTO")
    @SequenceGenerator(name = "SEQ_PHOTO", sequenceName = "SEQ_PHOTO", allocationSize=1)
    private Long id;

    @Column(name = "URL", nullable = false, length = 500)
    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PET_ID")
    @JsonBackReference
    private Pet pet;
}
