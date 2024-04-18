package org.hms.medica.appointment.model;

import com.fasterxml.jackson.databind.ser.Serializers;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hms.medica.baseEntity.BaseEntity;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.patient.model.Patient;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Appointment extends BaseEntity {

    private String appointmentStatus;
    private float appointmentDuration;
    private LocalDateTime appointmentDate;
    private String reasonForVisit;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
}