package net.blackwings.petstore.dto.business;

import lombok.Getter;
import lombok.Setter;
import net.blackwings.petstore.domain.Category;
import net.blackwings.petstore.dto.common.DTO;

import java.util.List;

/**
 * Wrapper for all List
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 11/01/2016.
 */
@Getter
@Setter
public class ListsDto implements DTO {
    private List<Category> categories;
    private List<String> status;
}
