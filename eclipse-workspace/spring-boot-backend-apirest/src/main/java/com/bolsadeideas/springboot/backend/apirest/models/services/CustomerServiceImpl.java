package com.bolsadeideas.springboot.backend.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bolsadeideas.springboot.backend.apirest.models.dao.ICustomerDao;
import com.bolsadeideas.springboot.backend.apirest.models.entity.Customer;
import com.bolsadeideas.springboot.backend.apirest.models.entity.Region;

import jakarta.transaction.Transactional;

@Service
public class CustomerServiceImpl implements ICustomerService {

	@Autowired
	private ICustomerDao customerDao;

	@Override
	@Transactional()
	public List<Customer> findAll() {
		return (List<Customer>) customerDao.findAll();
	}

	@Override
	@Transactional()
	public Page<Customer> findAll(Pageable pageable) {
		return customerDao.findAll(pageable);
	}

	@Override
	@Transactional()
	public Customer findById(Long id) {
		return customerDao.findById(id).orElse(null);
	}

	@Override
	@Transactional()
	public Customer save(Customer customer) {
		return customerDao.save(customer);
	}

	@Override
	@Transactional()
	public void delete(Long id) {
		customerDao.deleteById(id);
	}

	@Transactional()
	public List<Region> findAllRegions() {
		return customerDao.findAllRegions();
	}

}
