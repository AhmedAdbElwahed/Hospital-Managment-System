package org.hms.medica.patient.repo;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.patient.model.QPatient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class QPatientRepository {

        private final EntityManager entityManager;

        public Page<Patient> findPatientByFullName(String fullName, Pageable pageable) {
                JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
                QPatient patient = QPatient.patient;
                log.info("full name: {}", patient.firstname.concat(" " + patient.lastname));

                Long total = queryFactory.select(patient.count())
                                .from(patient)
                                .where(patient.firstname.concat(" ").concat(patient.lastname)
                                                .likeIgnoreCase("%" + fullName + "%"))
                                .fetchOne();

                var query = queryFactory.selectFrom(patient)
                                .where(patient.firstname.concat(" ").concat(patient.lastname)
                                                .likeIgnoreCase("%" + fullName + "%"));

                if (pageable.isPaged()) {
                        query.offset(pageable.getOffset())
                                        .limit(pageable.getPageSize());
                }

                List<Patient> content = query.fetch();

                return new PageImpl<>(content, pageable, total != null ? total : 0L);
        }

        public Page<Patient> findTodayPatients(LocalDateTime localDateTime, Pageable pageable) {
                JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
                QPatient patient = QPatient.patient;

                Long total = queryFactory.select(patient.count())
                                .from(patient)
                                .where(patient.createdDate.between(localDateTime.minusDays(1L),
                                                localDateTime.plusDays(1L)))
                                .fetchOne();

                var query = queryFactory.selectFrom(patient)
                                .where(patient.createdDate.between(localDateTime.minusDays(1L),
                                                localDateTime.plusDays(1L)));

                if (pageable.isPaged()) {
                        query.offset(pageable.getOffset())
                                        .limit(pageable.getPageSize());
                }

                List<Patient> content = query.fetch();

                return new PageImpl<>(content, pageable, total != null ? total : 0L);
        }

        public Page<Patient> findNewPatients(Pageable pageable) {
                JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
                QPatient patient = QPatient.patient;
                var now = LocalDateTime.now();

                Long total = queryFactory.select(patient.count())
                                .from(patient)
                                .where(patient.createdDate.after(now.minusDays(5L)))
                                .fetchOne();

                var query = queryFactory.selectFrom(patient)
                                .where(patient.createdDate.after(now.minusDays(5L)));

                if (pageable.isPaged()) {
                        query.offset(pageable.getOffset())
                                        .limit(pageable.getPageSize());
                }

                List<Patient> content = query.fetch();

                return new PageImpl<>(content, pageable, total != null ? total : 0L);
        }

        public Page<Patient> findOldPatient(Pageable pageable) {
                JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
                QPatient patient = QPatient.patient;
                var oldDate = LocalDateTime.now().minusDays(5L);

                Long total = queryFactory.select(patient.count())
                                .from(patient)
                                .where(patient.createdDate.before(oldDate))
                                .fetchOne();

                var query = queryFactory.selectFrom(patient)
                                .where(patient.createdDate.before(oldDate));

                if (pageable.isPaged()) {
                        query.offset(pageable.getOffset())
                                        .limit(pageable.getPageSize());
                }

                List<Patient> content = query.fetch();

                return new PageImpl<>(content, pageable, total != null ? total : 0L);
        }

        public Page<Patient> findRecentPatients(Pageable pageable) {
                JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
                QPatient patient = QPatient.patient;

                Long total = queryFactory.select(patient.count())
                                .from(patient)
                                .fetchOne();

                var query = queryFactory.selectFrom(patient);

                if (pageable.isPaged()) {
                        query.offset(pageable.getOffset())
                                        .limit(pageable.getPageSize());
                }

                List<Patient> content = query.fetch();

                return new PageImpl<>(content, pageable, total != null ? total : 0L);
        }

}
