package com.myorg.services;

import com.myorg.dao.ProductRepository;
import com.myorg.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    private ProductRepository prodRepo;

    @Autowired
    ProductService(ProductRepository prodRepo) {
        this.prodRepo = prodRepo;
    }

    public Product addProduct(Product prod) {
        return prodRepo.save(prod);
    }

    public Iterable<Product> getAllProducts() {
        return prodRepo.findAll();
    }

    public Product updateProduct(Product prod) throws Exception {
        if (prodRepo.exists(prod.getId()))
            return prodRepo.save(prod);
        else
            throw new Exception("Product does not exist");
    }


    public void deleteProduct(Product prod) throws Exception {
        if (prodRepo.exists(prod.getId()))
            prodRepo.delete(prod.getId());
        else
            throw new Exception("Product does not exist");

    }
}
