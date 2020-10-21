package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "countries", path = "countries") // path = "countries" is to help when we are searching in the  localhost 
																				 // so we write http://localhost:8080/api/countries
public interface CountryRepository extends JpaRepository<Country, Integer> { // Country it;s the entity class
																			 // and Integer it's the primary key in the class
}
