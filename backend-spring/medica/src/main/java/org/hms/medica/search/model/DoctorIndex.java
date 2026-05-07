package org.hms.medica.search.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(indexName = "doctor")
public class DoctorIndex {

    @Id
    private String id;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String firstname;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String lastname;

    @Field(type = FieldType.Keyword)
    private String email;

    @Field(type = FieldType.Keyword)
    private String phone;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String specialty;

    @Field(type = FieldType.Keyword)
    private String licenseNumber;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String education;
}
