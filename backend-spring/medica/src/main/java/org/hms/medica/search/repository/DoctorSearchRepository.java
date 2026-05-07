package org.hms.medica.search.repository;

import org.hms.medica.search.model.DoctorIndex;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorSearchRepository extends ElasticsearchRepository<DoctorIndex, String> {
    List<DoctorIndex> findByFirstnameContainingOrLastnameContainingOrSpecialtyContainingOrLicenseNumberContaining(
            String firstname, String lastname, String specialty, String licenseNumber);
}
