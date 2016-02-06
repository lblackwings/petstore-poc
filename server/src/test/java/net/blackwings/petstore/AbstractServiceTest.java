package net.blackwings.petstore;


import org.junit.Before;
import org.mockito.MockitoAnnotations;

/**
 * Abstract class used for every Service test (Mockito tests). <br/>
 * This class initialize every mocks used for testing.
 *
 * @author Romain CHIVOT, Sfeir Benelux
 * @version 01/12/2014
 */
public abstract class AbstractServiceTest {


    public abstract void noMoreInteractions();

    @Before
    public void setUp() {
        // Before every test, initialize Mockitos's mocks
        MockitoAnnotations.initMocks(this);
    }

    protected void mockSecurity() {

    }



}
