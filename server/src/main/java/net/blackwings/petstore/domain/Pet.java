package net.blackwings.petstore.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * The Pet definition
 *
 * @author Michael BERNAGOU
 * @date 04/01/2016.
 */
@Getter
@Setter
@Entity
@EqualsAndHashCode(of = {"id"})
@ToString
@Table(name = "PET")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_PET")
    @SequenceGenerator(name = "SEQ_PET", sequenceName = "SEQ_PET", allocationSize=1)
    private Long id;

    @Column(name="NAME", nullable = false, length = 255)
    @NotNull
    private String name;

    @Column(name="STATUS", nullable = false, length = 50)
    @NotNull
    private String status;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "PET_CATEGORY", joinColumns = @JoinColumn(name="PET_ID"), inverseJoinColumns = @JoinColumn(name="CAT_ID"))
    private List<Category> categories;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "PET_TAG", joinColumns = @JoinColumn(name="PET_ID"), inverseJoinColumns = @JoinColumn(name="TAG_ID"))
    private List<Tag> tags;

    @OneToMany(mappedBy = "pet", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Photo> photos;
}
