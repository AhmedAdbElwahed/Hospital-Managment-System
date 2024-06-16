package org.hms.medica;

import org.hms.medica.exption.handler.RestResponseEntityExceptionHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@Import(RestResponseEntityExceptionHandler.class)
public class MedicaApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedicaApplication.class, args);
	}


}
