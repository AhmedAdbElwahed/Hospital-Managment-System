package org.hms.medica.auth.dto;

import jakarta.persistence.*;
import org.hms.medica.constants.BloodType;
import org.hms.medica.constants.MaritalStatus;
import org.hms.medica.user.dto.UserRequestDto;

public class PatientRegisterRequest extends UserRequestDto {
  private String insurancePolicyNumber;
  private BloodType bloodType;
  private MaritalStatus maritalStatus;
  private String nationality;
  
}
