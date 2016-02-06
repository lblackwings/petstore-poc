package net.blackwings.petstore.dto.business;

import lombok.Getter;
import lombok.Setter;
import net.blackwings.petstore.domain.Category;
import net.blackwings.petstore.domain.Photo;
import net.blackwings.petstore.domain.Tag;
import net.blackwings.petstore.dto.common.DTO;

import java.util.List;

/**
 * A basic pet DTO
 *
 * @author Michael BERNAGOU, Sfeir Benelux
 * @date 04/01/2016.
 */

@Getter
@Setter
public class BasicPet implements DTO {
    private long id;
    private String name;
    private String status;
    private List<Category> categories;
    private List<Tag> tags;
    private List<Photo> photos;
}
