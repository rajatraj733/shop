package com.myorg.controllers;


import com.myorg.entities.SaleOrder;
import com.myorg.services.SaleOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/sale-order")
public class SaleOrderController {

    private SaleOrderService saleOrderService;

    @Autowired
    public SaleOrderController(SaleOrderService saleOrderService) {
        this.saleOrderService = saleOrderService;
    }
    @RequestMapping("/getAll.action")
    public Iterable<SaleOrder> getAllOrders() {
        return saleOrderService.getAllOrders();
    }


    @RequestMapping(value = "/add.action", method = RequestMethod.POST)
    public Iterable<SaleOrder> addOrders(@RequestBody List<SaleOrder> orders) {
        return saleOrderService.addOrders(orders);
    }
}
