package com.bolsadeideas.springboot.backend.apirest.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bolsadeideas.springboot.backend.apirest.models.entity.Customer;
import com.bolsadeideas.springboot.backend.apirest.models.entity.Region;

public interface ICustomerDao extends JpaRepository<Customer, Long>{

	@Query("from Region")
	public List<Region> findAllRegions();
	
}
