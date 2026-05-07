package org.hms.medica.doctor.repo;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.doctor.model.QDoctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class QDoctorRepository {

    private final EntityManager entityManager;

    public Page<Doctor> findDoctorByFullName(String fullName, Pageable pageable) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        QDoctor doctor = QDoctor.doctor;
        log.info("full name: {}", doctor.firstname.concat(" " + doctor.lastname));

        long total = queryFactory.select(doctor.count())
                .where(doctor.firstname.concat(" ").concat(doctor.lastname).likeIgnoreCase("%" + fullName + "%"))
                .fetchOne();

        List<Doctor> content = queryFactory.selectFrom(doctor)
                .where(doctor.firstname.concat(" ").concat(doctor.lastname).likeIgnoreCase("%" + fullName + "%"))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(content, pageable, total);
    }
}
