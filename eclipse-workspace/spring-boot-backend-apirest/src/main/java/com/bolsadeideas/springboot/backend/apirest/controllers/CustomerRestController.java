package com.bolsadeideas.springboot.backend.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bolsadeideas.springboot.backend.apirest.models.entity.Customer;
import com.bolsadeideas.springboot.backend.apirest.models.services.ICustomerService;

@CrossOrigin(origins= {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class CustomerRestController {
	
	@Autowired
	private ICustomerService customerService;
	
	@GetMapping("/customers")
	public List<Customer> index() {
		return customerService.findAll();
	}
	
	@GetMapping("/customers/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Customer show(@PathVariable Long id) {
		return customerService.findById(id);
	}
	
	@PostMapping("/customers")
	@ResponseStatus(HttpStatus.CREATED)
	public Customer create(@RequestBody Customer customer) {
		return customerService.save(customer);
	}
	
	@PutMapping("/customers/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Customer update(@RequestBody Customer customer, @PathVariable Long id) {
		Customer currentCustomer = customerService.findById(id);
		currentCustomer.setName(customer.getName());
		currentCustomer.setSurname(customer.getSurname());
		currentCustomer.setEmail(customer.getEmail());
		
		return customerService.save(currentCustomer);
	}
	
	@DeleteMapping("/customers/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		customerService.delete(id);
	}
}
