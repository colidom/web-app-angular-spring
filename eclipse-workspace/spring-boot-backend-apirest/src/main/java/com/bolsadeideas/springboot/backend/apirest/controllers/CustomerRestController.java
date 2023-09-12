package com.bolsadeideas.springboot.backend.apirest.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	public ResponseEntity<?> show(@PathVariable Long id) {
		
		Customer customer = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			customer = customerService.findById(id);
		} catch(DataAccessException e) {
			response.put("message", "Error when querying in the database");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if(customer == null) {
			response.put("message", "Customer ID: ".concat(id.toString().concat(" does not exists in the database!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<Customer>(customer, HttpStatus.OK); 
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
		currentCustomer.setBirthDate(customer.getBirthDate());
		currentCustomer.setEmail(customer.getEmail());
		
		return customerService.save(currentCustomer);
	}
	
	@DeleteMapping("/customers/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		customerService.delete(id);
	}
}
