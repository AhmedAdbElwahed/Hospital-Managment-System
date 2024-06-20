package org.hms.medica.config.web;

import org.hms.medica.baseEntity.impl.AuditingAwareImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class WebConfig {
  @Bean
  public AuditorAware<String> auditorAware() {
    return new AuditingAwareImpl();
  }
}
