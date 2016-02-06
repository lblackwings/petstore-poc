package net.blackwings.petstore.converter;


import net.blackwings.petstore.dto.common.DTO;

/**
 * Basic Converter: JSON Object <-> DOM<br/>
 *
 * @author Rodrigue BOULEAU, Sfeir Benelux
 * @version 1.0, 29 Aug 2014
 */
public interface BasicConverter<D, J extends DTO> {

    /**
     * Convert a DTO to a DOM.
     *
     * @param dto DTO object.
     * @return Domain object.
     */
    D convertToDomainObject(J dto);

    /**
     * Convert a DOM to a DTO.
     *
     * @param dom Domain Object
     * @return DTO.
     */
    J convertToDataTransferObject(D dom);
}
