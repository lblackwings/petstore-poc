package net.blackwings.petstore.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.support.SQLErrorCodes;

/**
 * H2 configuration
 *
 * @author Michael Bernagou, Sfeir Benelux
 * @date 05/01/2016.
 */
@Configuration
public class DatabaseConfiguration {

    @Bean
    SQLErrorCodes H2() {
        SQLErrorCodes codes = new SQLErrorCodes();
        codes.setBadSqlGrammarCodes("42000","42001","42102","42111","42112","42121","42122","42132");
        codes.setDuplicateKeyCodes("23001","23505");
        codes.setDataIntegrityViolationCodes("22003","22012","22025","23000");
        codes.setDataAccessResourceFailureCodes("90046","90100","90117","90121","90126");
        codes.setCannotAcquireLockCodes("50200");
        return codes;
    }
}
