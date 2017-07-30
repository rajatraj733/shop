package com.myorg.controllers;

import com.myorg.entities.Product;
import com.myorg.services.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/product")
public class ProductController {
    private static Logger logger = LoggerFactory.getLogger(ProductController.class);
    private ProductService prodService;

    @Autowired
    ProductController(ProductService prodService) {
        this.prodService = prodService;
    }


    @RequestMapping(value = "/add.action", method = RequestMethod.POST)
    public Product addProduct(@RequestBody Product prod) {
        return prodService.addProduct(prod);
    }

    @RequestMapping(value = "/getAll.action")
    public Iterable<Product> getAllProducts() {
        return prodService.getAllProducts();
    }

    @RequestMapping(value = "/update.action", method = RequestMethod.POST)
    public Product updateProduct(@RequestBody Product prod) throws Exception {
        return prodService.updateProduct(prod);
    }

    @RequestMapping(value = "/delete.action", method = RequestMethod.POST)
    public boolean deleteProduct(@RequestBody Product prod) throws Exception {
        prodService.deleteProduct(prod);
        return true;
    }


}
