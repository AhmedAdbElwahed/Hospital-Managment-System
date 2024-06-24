package org.hms.medica.doctor.repo;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.doctor.model.QDoctor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class QDoctorRepository {

    private final EntityManager entityManager;

    public List<Doctor> findDoctorByFullName(String fullName) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        QDoctor doctor = QDoctor.doctor;
        log.info("full name: {}", doctor.firstname.concat(" " + doctor.lastname));
        return queryFactory.selectFrom(doctor)
                .where(doctor.firstname.concat(" ").concat(doctor.lastname).likeIgnoreCase("%" + fullName + "%"))
                .fetch();
    }
}
