package org.hms.medica.doctor.repo;

import java.util.Optional;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import org.hms.medica.doctor.model.Doctor;
import org.hms.medica.doctor.model.QDoctor;
import org.hms.medica.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository
    extends JpaRepository<Doctor, Long>,
        QuerydslPredicateExecutor<Doctor>,
        QuerydslBinderCustomizer<QDoctor> {

  Optional<User> getDoctorByFirstname(String name);

  Optional<Doctor> getDoctorByEmail(String email);

  List<Doctor>
      findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCaseOrSpecialtyContainingIgnoreCase(
          String firstName, String lastName, String specialty);

  @Override
  default void customize(QuerydslBindings bindings, QDoctor doctor) {
    bindings
        .bind(String.class)
        .first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
  }
}
