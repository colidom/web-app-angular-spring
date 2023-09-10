package com.bolsadeideas.springboot.backend.apirest.models.services;

import java.util.List;

import com.bolsadeideas.springboot.backend.apirest.models.entity.Customer;

public interface ICustomerService {

	public List<Customer> findAll();
}
