package org.hms.medica.config.startup;

import lombok.RequiredArgsConstructor;
import org.hms.medica.auth.model.Privilege;
import org.hms.medica.auth.model.Role;
import org.hms.medica.auth.reop.PrivilegeRepository;
import org.hms.medica.auth.reop.RoleRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

    boolean alreadySetup = false;
    private final RoleRepository roleRepository;
    private final PrivilegeRepository privilegeRepository;


    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (alreadySetup) return;
        Privilege readAppointentPrivilege
                = createPrivilegeIfNotFound("READ_APPOINTMENT");
        Privilege writeAppointentPrivilege
                = createPrivilegeIfNotFound("WRITE_APPOINTMENT");
        Privilege updateAppointentPrivilege
                = createPrivilegeIfNotFound("UPDATE_APPOINTMENT");
        Privilege deleteAppointentPrivilege
                = createPrivilegeIfNotFound("DELETE_APPOINTMENT");


        Privilege readDoctorPrivilege
                = createPrivilegeIfNotFound("READ_DOCTOR");
        Privilege writeDoctorPrivilege
                = createPrivilegeIfNotFound("WRITE_DOCTOR");
        Privilege updateDoctorPrivilege
                = createPrivilegeIfNotFound("UPDATE_DOCTOR");
        Privilege deleteDoctorPrivilege
                = createPrivilegeIfNotFound("DELETE_DOCTOR");

        Privilege readPatientPrivilege
                = createPrivilegeIfNotFound("READ_DOCTOR");
        Privilege writePatientPrivilege
                = createPrivilegeIfNotFound("WRITE_DOCTOR");
        Privilege updatePatientPrivilege
                = createPrivilegeIfNotFound("UPDATE_DOCTOR");
        Privilege deletePatientPrivilege
                = createPrivilegeIfNotFound("DELETE_DOCTOR");
        List<Privilege> AdminPrivileges = Arrays.asList(
                writePatientPrivilege,
                writeDoctorPrivilege,
                writeAppointentPrivilege,
                readDoctorPrivilege,
                readPatientPrivilege,
                readAppointentPrivilege,
                updateDoctorPrivilege,
                updatePatientPrivilege,
                updateAppointentPrivilege,
                deleteDoctorPrivilege,
                deletePatientPrivilege,
                deleteAppointentPrivilege
                );


        List<Privilege> doctorPrivileges = Arrays.asList(
                readAppointentPrivilege,
                readDoctorPrivilege,
                updateDoctorPrivilege,
                readPatientPrivilege,
                updateAppointentPrivilege,
                writeAppointentPrivilege,
                deleteAppointentPrivilege
                );

        List<Privilege> patientPrivileges = Arrays.asList(
                readPatientPrivilege,
                updatePatientPrivilege,
                writePatientPrivilege,
                readAppointentPrivilege,
                writeAppointentPrivilege,
                deleteAppointentPrivilege);
        createRoleIfNotFound("ROLE_ADMIN", AdminPrivileges);
        createRoleIfNotFound("ROLE_DOCTOR", doctorPrivileges);
        createRoleIfNotFound("ROLE_PATIENT", patientPrivileges);
//        createRoleIfNotFound("ROLE_USER", null);

        alreadySetup = true;
    }

    Privilege createPrivilegeIfNotFound(String name) {
        Privilege privilege = privilegeRepository.getPrivilegeByName(name).orElse(null);
        if (privilege == null) {
            privilege = new Privilege();
            privilege.setName(name);
            privilegeRepository.save(privilege);
        }
        return privilege;
    }

    Role createRoleIfNotFound(
            String name, Collection<Privilege> privileges) {
        Role role = roleRepository.getRoleByName(name).orElse(null);
        if (role == null) {
            role = new Role();
            role.setName(name);
            role.setPrivileges(privileges);
            roleRepository.save(role);
        }
        return role;
    }



}
