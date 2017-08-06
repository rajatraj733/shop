package com.myorg;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.myorg.dao.PersonRepository;
import com.myorg.dao.ProductRepository;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class ShopApplication {
	@Autowired
	PersonRepository personDao;
	@Autowired ProductRepository productDao;
	
	public static void main(String[] args) {
		SpringApplication.run(ShopApplication.class, args);
	}
	@PostConstruct
	public void run() {
//		System.out.println(personDao.findAll());
//		System.out.println(productDao.findAll());
	}
}
