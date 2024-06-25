package org.hms.medica.medication.model.repository;

import org.hms.medica.medication.model.Medication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicationRepository extends JpaRepository<Medication, Long> {}
