package org.hms.medica;

import org.hms.medica.exception.handler.RestResponseEntityExceptionHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.data.elasticsearch.autoconfigure.DataElasticsearchAutoConfiguration;
import org.springframework.boot.data.elasticsearch.autoconfigure.DataElasticsearchRepositoriesAutoConfiguration;
import org.springframework.boot.elasticsearch.autoconfigure.ElasticsearchClientAutoConfiguration;
import org.springframework.boot.elasticsearch.autoconfigure.ElasticsearchRestClientAutoConfiguration;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication(exclude = {
        ElasticsearchClientAutoConfiguration.class,
        ElasticsearchRestClientAutoConfiguration.class,
        DataElasticsearchAutoConfiguration.class,
        DataElasticsearchRepositoriesAutoConfiguration.class
})
@EnableAsync
@Import(RestResponseEntityExceptionHandler.class)
public class MedicaApplication {

  public static void main(String[] args) {
    SpringApplication.run(MedicaApplication.class, args);
  }
}
