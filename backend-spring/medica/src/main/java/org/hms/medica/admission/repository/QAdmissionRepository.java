package org.hms.medica.admission.repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.hms.medica.admission.model.QAdmission;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class QAdmissionRepository {

    private final EntityManager entityManager;

    public List<Tuple> findAdmissionTrends(LocalDate startDate) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        QAdmission admission = QAdmission.admission;
        return queryFactory.select(admission.admissionDate, admission.count())
                .from(admission)
                .where(admission.admissionDate.goe(startDate))
                .groupBy(admission.admissionDate)
                .orderBy(admission.admissionDate.asc())
                .fetch();
    }
}
