package org.hms.medica.labtest.repo;

import org.hms.medica.labtest.model.LabTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabTestRepository extends JpaRepository<LabTest, Long> {
}
