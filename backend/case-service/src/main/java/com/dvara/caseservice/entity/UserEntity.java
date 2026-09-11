package com.dvara.caseservice.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    private String id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String name;
    private String role; // CITIZEN, ADVOCATE, CLERK, SCRUTINY_OFFICER, REGISTRAR, JUDGE, ADMIN
    private String barRegistrationNumber;
    private String court;
    private String designation;

    public UserEntity() {}

    public UserEntity(String id, String email, String password, String name, String role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getBarRegistrationNumber() { return barRegistrationNumber; }
    public void setBarRegistrationNumber(String barRegistrationNumber) { this.barRegistrationNumber = barRegistrationNumber; }

    public String getCourt() { return court; }
    public void setCourt(String court) { this.court = court; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
}
