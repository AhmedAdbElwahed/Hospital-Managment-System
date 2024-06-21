package org.hms.medica;

import org.hms.medica.exception.handler.RestResponseEntityExceptionHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(RestResponseEntityExceptionHandler.class)
public class MedicaApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedicaApplication.class, args);
	}


}
