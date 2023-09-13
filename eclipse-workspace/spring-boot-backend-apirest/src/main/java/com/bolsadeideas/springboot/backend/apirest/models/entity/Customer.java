package com.bolsadeideas.springboot.backend.apirest.models.entity;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="customers")
public class Customer implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	
	@Size(min=4, max=15, message = "el tamaño tiene que estar entre 4 y 15")
	@Column(nullable=false)
	@NotEmpty(message = "no puede estar vacío")
	private String name;
	
	@NotEmpty(message = "no puede estar vacío")
	private String surname;
	
	@NotEmpty(message = "no puede estar vacío")
	@Email(message = "no es un email correcto")
	@Column(nullable=false, unique=true)
	private String email;
	private String birthDate;

	@NotNull(message = "no puede estar vacío")
	@Column(name="created_at")
	@Temporal(TemporalType.DATE)
	private Date createdAt;

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getBirthDate() {
		return birthDate;
	}
	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
}
