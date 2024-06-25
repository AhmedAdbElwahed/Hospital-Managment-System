package org.hms.medica.patient.repo;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.patient.model.QPatient;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    public List<Patient> findTodayPatients(LocalDateTime localDateTime) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        QPatient patient = QPatient.patient;
        return queryFactory.selectFrom(patient)
                .where(patient.createdDate.between(localDateTime.minusDays(1L), localDateTime.plusDays(1L)))
                .fetch();
    }

    public List<Patient> findNewPatients() {
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        QPatient patient = QPatient.patient;
        var now = LocalDateTime.now();
        return queryFactory.selectFrom(patient)
                .where(patient.createdDate.after(now.minusDays(5L)))
                .fetch();
    }

    public List<Patient> findOldPatient() {
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        QPatient patient = QPatient.patient;
        var oldDate = LocalDateTime.now().minusDays(5L);
        return queryFactory.selectFrom(patient)
                .where(patient.createdDate.before(oldDate))
                .fetch();
    }

    public List<Patient> findRecentPatients() {
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        QPatient patient = QPatient.patient;
        return queryFactory.selectFrom(patient)
                .stream().limit(5)
                .toList();
    }

}
