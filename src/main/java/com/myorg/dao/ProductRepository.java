package com.myorg.dao;

import org.springframework.data.repository.CrudRepository;

import com.myorg.entities.Product;

public interface ProductRepository extends CrudRepository<Product, Integer> {

}
