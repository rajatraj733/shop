package com.myorg.dao;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.myorg.entities.Product;

import java.math.BigDecimal;

public interface ProductRepository extends CrudRepository<Product, Integer> {
    @Query("Update Product p SET p.stocksInUnit = p.stocksInUnit + ?2 where p.id = ?1")
    @Modifying
    public void addStocks(Integer id, BigDecimal quantity);
}
