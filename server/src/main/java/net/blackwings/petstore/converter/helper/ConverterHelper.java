package net.blackwings.petstore.converter.helper;

import net.blackwings.petstore.converter.BasicConverter;
import net.blackwings.petstore.converter.business.impl.PetConverterImpl;
import net.blackwings.petstore.converter.business.impl.UserConverterImpl;
import net.blackwings.petstore.domain.Pet;
import net.blackwings.petstore.domain.security.User;
import net.blackwings.petstore.dto.common.DTO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Helper for every Converters.<br/>
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @version 1.0, 01/10/2015
 */
public final class ConverterHelper {

    private static final Map<Class, BasicConverter<?, ?>> CONVERTERS = new HashMap<>();

    /**
     * Stores all Converters of the Application.
     */
    static {

        CONVERTERS.put( Pet.class , new PetConverterImpl() );
        CONVERTERS.put( User.class , new UserConverterImpl() );
    }

    /**
     * Default Constructor.
     */
    private ConverterHelper() {
    }

    /**
     * Return the Converter for a DOM.
     *
     * @param clazz Domain Class
     * @return Converter inherits from BasicConverter
     */
    @SuppressWarnings("unchecked")
    public static <D, C extends BasicConverter<D, ? extends DTO>> C getConverter(Class<D> clazz) {
        return (C) CONVERTERS.get(clazz);
    }

    /**
     * Convert a list of Domain into a List of DTO.
     *
     * If no Converter exists, an empty list is returned.
     *
     * @param dtoClazz DTO Class
     * @param domClazz Domain Object Class.
     * @param doms     List of Domain Object to be converted.
     * @return List of DTO.
     */
    @SuppressWarnings("unchecked")
    public static <D, J> List<J> convertToBasic(Class<J> dtoClazz, Class<D> domClazz, List<D> doms) {
        if(doms == null)
            return new ArrayList<>(0);

        BasicConverter<D, ?> converter = (BasicConverter<D, ?>) CONVERTERS.get(domClazz);
        if (converter == null) {
            return new ArrayList<>(0);
        }
        List<J> dtos = new ArrayList<>(doms.size());
        for (D dom : doms) {
            dtos.add(dtoClazz.cast(converter.convertToDataTransferObject(dom)));
        }
        return dtos;
    }


    /**
     * Convert a list of DTO into a List of Domain.
     *
     * If no Converter exists, an empty list is returned.
     *
     * @param domClazz Domain Class
     * @param dtos     DTOs to be converted
     * @param <D>      Class of Domain
     * @param <J>      Class of DTO
     * @return List of Domain objects.
     */
    @SuppressWarnings("unchecked")
    public static <D, J extends DTO> List<D> convertToDomain(Class<D> domClazz, List<J> dtos) {
        BasicConverter<D, J> converter = (BasicConverter<D, J>) CONVERTERS.get(domClazz);
        if (converter == null) {
            return new ArrayList<>(0);
        }
        List<D> doms = new ArrayList<>(dtos.size());
        for (J dto : dtos) {
            doms.add(domClazz.cast(converter.convertToDomainObject(dto)));
        }
        return doms;
    }
}
