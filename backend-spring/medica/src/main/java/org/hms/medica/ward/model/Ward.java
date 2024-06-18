package org.hms.medica.ward.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.checkerframework.common.aliasing.qual.Unique;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.patient.model.Patient;
import org.hms.medica.ward.exception.WardIsFullException;

import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Unique
    private String name;
    private String phoneNumber;
    private String email;
    private int numOfBeds;
    private int numOfNurses;
    private boolean isMale;
    private boolean isFemale;
    private boolean isLock;
    private boolean isActive;
    // I am not sure what does this mean
    // I think this is time the patient would stay at the ward <-- Omar
    private float duration;

    @OneToMany(mappedBy = "ward", fetch = FetchType.LAZY)
    private Set<Patient> patients = new HashSet<>();

    @OneToMany(mappedBy = "ward", fetch = FetchType.LAZY)
    private Set<Doctor> doctors = new HashSet<>();

    public void addPatient(Patient patient) {
        if (patients.size() >= numOfBeds)
            throw new WardIsFullException(getName());
        patients.add(patient);
    }

    public void addDoctor(Doctor doctor) {
        doctors.add(doctor);
    }
}