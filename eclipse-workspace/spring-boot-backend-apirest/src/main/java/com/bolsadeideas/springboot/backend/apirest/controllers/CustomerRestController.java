package com.bolsadeideas.springboot.backend.apirest.controllers;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bolsadeideas.springboot.backend.apirest.models.entity.Customer;
import com.bolsadeideas.springboot.backend.apirest.models.entity.Region;
import com.bolsadeideas.springboot.backend.apirest.models.services.ICustomerService;
import com.bolsadeideas.springboot.backend.apirest.models.services.UploadFileServiceImpl;

import jakarta.validation.Valid;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api")
public class CustomerRestController {

	@Autowired
	private ICustomerService customerService;

	@Autowired
	private UploadFileServiceImpl uploadService;

	@GetMapping("/customers")
	public List<Customer> index() {
		return customerService.findAll();
	}

	@GetMapping("/customers/page/{page}")
	public Page<Customer> index(@PathVariable Integer page) {
		Pageable pageable = PageRequest.of(page, 5);
		return customerService.findAll(pageable);
	}

	@GetMapping("/customers/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {

		Customer customer = null;
		Map<String, Object> response = new HashMap<>();

		try {
			customer = customerService.findById(id);
		} catch (DataAccessException e) {
			response.put("message", "Error when querying in the database");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if (customer == null) {
			response.put("message", "Customer ID: ".concat(id.toString().concat(" does not exists in the database!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<Customer>(customer, HttpStatus.OK);
	}

	@PostMapping("/customers")
	public ResponseEntity<?> create(@Valid @RequestBody Customer customer, BindingResult result) {

		Customer newCustomer = null;
		Map<String, Object> response = new HashMap<>();

		if (result.hasErrors()) {
			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "Field '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());

			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		try {
			newCustomer = customerService.save(customer);
		} catch (DataAccessException e) {
			response.put("message", "Error when inserting value into database");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("message", "Customer successfully created!");
		response.put("customer", newCustomer);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	@PutMapping("/customers/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Customer customer, BindingResult result,
			@PathVariable Long id) {

		Customer currentCustomer = customerService.findById(id);
		Customer updatedCustomer = null;

		Map<String, Object> response = new HashMap<>();

		if (result.hasErrors()) {
			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "Field '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());

			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		if (currentCustomer == null) {
			response.put("message", "Error when editing. Customer ID: "
					.concat(id.toString().concat(" does not exists in the database!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		try {
			currentCustomer.setName(customer.getName());
			currentCustomer.setSurname(customer.getSurname());
			currentCustomer.setEmail(customer.getEmail());
			currentCustomer.setCreatedAt(customer.getCreatedAt());
			currentCustomer.setRegion(customer.getRegion());

			updatedCustomer = customerService.save(currentCustomer);
		} catch (DataAccessException e) {
			response.put("message", "Error when updating the value into database");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("message", "Customer successfully updated!");
		response.put("customer", updatedCustomer);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	@DeleteMapping("/customers/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {

		Customer deleteCustomer = null;
		Map<String, Object> response = new HashMap<>();

		try {
			deleteCustomer = customerService.findById(id);

			String previousPictureName = deleteCustomer.getPicture();

			uploadService.delete(previousPictureName);

			customerService.delete(id);
		} catch (DataAccessException e) {
			response.put("message", "Error when deleting the client from the database");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("message", "Customer ID: ".concat(id.toString().concat(" successfully deleted!")));
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

	@PostMapping("/customers/upload")
	public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id) {
		Map<String, Object> response = new HashMap<>();

		Customer customer = customerService.findById(id);

		if (!file.isEmpty()) {
			String fileName = null;
			try {
				fileName = uploadService.copy(file);
			} catch (IOException e) {
				response.put("customer", "Error uploading image to server");
				response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}

			String previousPictureName = customer.getPicture();

			uploadService.delete(previousPictureName);
			customer.setPicture(fileName);
			customerService.save(customer);

			response.put("customer", customer);
			response.put("message", "You have successfully uploaded the image: " + fileName);
		}

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	@GetMapping("/uploads/img/{pictureName:.+}")
	public ResponseEntity<Resource> showPicture(@PathVariable String pictureName) {
		Resource resource = null;

		try {
			resource = uploadService.load(pictureName);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}

		HttpHeaders header = new HttpHeaders();
		header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"");

		return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
	}

	@GetMapping("/customers/regions")
	public List<Region> listRegions() {
		return customerService.findAllRegions();
	}
}
