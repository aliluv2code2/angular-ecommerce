package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:4200")// we add this to make a match between the from part and the back end  part
public interface ProductRepository extends JpaRepository<Product, Long> { //long it's for our primary key type
	Page<Product>findByCategoryId(@RequestParam("id") Long id, Pageable pageable);// here we added Pageable pageable to handel for us the pagination 
	// this method we don't need to make it beacause the REST JpaRepository provide it for us for freeand it's like
	// SELECT * from product where category_id =?
	Page<Product>findByNameContaining(@RequestParam("name") String name, Pageable pageable);//we added for search text
	// and it's exactly like SELECT * from Product p where p.name like concat('%', :name ,'%') 
	
}
