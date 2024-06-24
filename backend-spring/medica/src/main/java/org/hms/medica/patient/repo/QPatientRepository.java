package org.hms.medica.patient.repo;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.patient.model.QPatient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class QPatientRepository {

    private final EntityManager entityManager;

    public List<Patient> findPatientByFullName(String fullName) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        QPatient patient = QPatient.patient;
        log.info("full name: {}", patient.firstname.concat(" " + patient.lastname));
        return queryFactory.selectFrom(patient)
                .where(patient.firstname.concat(" ").concat(patient.lastname).likeIgnoreCase("%" + fullName + "%"))
                .fetch();
    }

}
