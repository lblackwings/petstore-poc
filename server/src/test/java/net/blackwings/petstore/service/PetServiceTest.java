package net.blackwings.petstore.service;

import net.blackwings.petstore.AbstractServiceTest;
import net.blackwings.petstore.domain.Pet;
import net.blackwings.petstore.dto.business.BasicPet;
import net.blackwings.petstore.repository.PetRepository;
import net.blackwings.petstore.service.impl.PetServiceImpl;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.mockito.Mockito.*;

/**
 * PetService unit test
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 11/01/2016.
 */
public class PetServiceTest extends AbstractServiceTest {

    @InjectMocks
    private PetService service = new PetServiceImpl();

    @Mock
    private PetRepository petRepository;

    @Override
    public void noMoreInteractions() {
        verifyNoMoreInteractions(petRepository);
    }

    /**
     * Pet for unit test
     *
     * @return
     */
    private Pet getPet() {
        Pet pet = new Pet();
        pet.setId(1L);
        pet.setName("Guizmo");
        pet.setStatus("available");
        return pet;
    }

    /**
     * BasicPet for unit test
     *
     * @return
     */
    private BasicPet getBasicPet() {
        BasicPet basicPet = new BasicPet();
        basicPet.setId(1L);
        basicPet.setName("Guizmo");
        basicPet.setStatus("available");
        return basicPet;
    }

    @Test
    public void testSearchById() {
        service.searchById(1L);
        verify(petRepository).findOne(1L);
        noMoreInteractions();
    }

    @Test
    public void testCreate() {
        Pet newPet = getPet();
        newPet.setId(null);
        when(petRepository.save(newPet)).thenReturn(getPet());
        service.create(getBasicPet());
        verify(petRepository).save(newPet);
        noMoreInteractions();
    }
}
