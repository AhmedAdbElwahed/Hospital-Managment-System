package org.hms.medica.billservice.repo;

import org.hms.medica.billservice.model.BillService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillServiceRepository extends JpaRepository<BillService, Long> {
}
