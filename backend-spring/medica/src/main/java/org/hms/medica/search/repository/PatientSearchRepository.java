package org.hms.medica.search.repository;

import org.hms.medica.search.model.PatientIndex;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientSearchRepository extends ElasticsearchRepository<PatientIndex, String> {
    Page<PatientIndex> findByFirstnameContainingOrLastnameContainingOrEmailContainingOrPhoneContaining(
            String firstname, String lastname, String email, String phone, Pageable pageable);
}
