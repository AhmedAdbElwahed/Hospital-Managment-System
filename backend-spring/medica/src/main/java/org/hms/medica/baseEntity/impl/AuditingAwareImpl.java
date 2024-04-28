package org.hms.medica.baseEntity.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Slf4j
@Component
public class AuditingAwareImpl implements AuditorAware<String> {
  @Override
  public Optional<String> getCurrentAuditor() {

    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    log.info(email);
    return Optional.of(email);
  }
}
