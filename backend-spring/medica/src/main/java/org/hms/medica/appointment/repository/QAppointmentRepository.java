package org.hms.medica.appointment.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hms.medica.appointment.model.Appointment;
import org.hms.medica.appointment.model.QAppointment;
import org.hms.medica.constants.AppointmentStatus;
import org.hms.medica.doctor.model.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class QAppointmentRepository {

        private final EntityManager entityManager;

        public Page<Appointment> findTodayAppointments(LocalDateTime localDateTime, Pageable pageable) {
                JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
                QAppointment appointment = QAppointment.appointment;

                Long total = queryFactory.select(appointment.count())
                                .from(appointment)
                                .where(appointment.createdDate.between(localDateTime.minusDays(1L),
                                                localDateTime.plusDays(1L)))
                                .fetchOne();

                var query = queryFactory.selectFrom(appointment)
                                .where(appointment.createdDate.between(localDateTime.minusDays(1L),
                                                localDateTime.plusDays(1L)));

                if (pageable.isPaged()) {
                        query.offset(pageable.getOffset())
                                        .limit(pageable.getPageSize());
                }

                List<Appointment> content = query.fetch();

                return new PageImpl<>(content, pageable, total != null ? total : 0L);
        }

        public Page<Appointment> findAppointmentsByStatus(AppointmentStatus status, Pageable pageable) {
                JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
                QAppointment appointment = QAppointment.appointment;

                Long total = queryFactory.select(appointment.count())
                                .from(appointment)
                                .where(appointment.appointmentStatus.eq(status))
                                .fetchOne();

                var query = queryFactory.selectFrom(appointment)
                                .where(appointment.appointmentStatus.eq(status));

                if (pageable.isPaged()) {
                        query.offset(pageable.getOffset())
                                        .limit(pageable.getPageSize());
                }

                List<Appointment> content = query.fetch();

                return new PageImpl<>(content, pageable, total != null ? total : 0L);
        }

        public Appointment findAppointmentAtStartTimeAndDoctor(LocalTime startTime, Doctor doctor) {
                JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
                QAppointment appointment = QAppointment.appointment;
                var now = LocalDateTime.now();
                return queryFactory.selectFrom(appointment)
                                .where(appointment.startTime.eq(startTime)
                                                .and(appointment.doctor.eq(doctor))
                                                .and(appointment.createdDate.between(now.minusDays(1L),
                                                                now.plusDays(1L))))
                                .fetchFirst();
        }
}
