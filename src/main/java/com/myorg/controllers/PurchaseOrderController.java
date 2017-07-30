package com.myorg.controllers;


import com.myorg.entities.PurchaseOrder;
import com.myorg.services.PurchaseOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/purchase-order")
public class PurchaseOrderController {
    private PurchaseOrderService purOrdService;


    @Autowired
    public PurchaseOrderController(PurchaseOrderService purOrdService) {
        this.purOrdService = purOrdService;
    }

    @RequestMapping(value = "/getAll.action")
    public Iterable<PurchaseOrder> getAllOrders() {
        return purOrdService.getAllOrders();
    }

    @RequestMapping(value="/add.action", method = RequestMethod.POST)
    public Iterable<PurchaseOrder> addPurchaseOrder(@RequestBody List<PurchaseOrder> orders) throws Exception {
        return purOrdService.addOrders(orders);
    }

    @RequestMapping(value="/update.action", method = RequestMethod.POST)
    public PurchaseOrder updatePurchaseOrder(@RequestBody PurchaseOrder order) throws Exception {
        return purOrdService.updateSingleOrder(order);
    }

    @RequestMapping(value="/deleteSingleOrder.action", method = RequestMethod.POST)
    public boolean deleteSingleOrder(@RequestBody PurchaseOrder order) throws Exception {
        purOrdService.deleteSingleOrder(order);
        return true;
    }
    @RequestMapping(value="/deleteByOrderId.action", method = RequestMethod.POST)
    public boolean deleteOrdersByOrderId(@RequestBody String orderId) throws Exception {
        purOrdService.deleteOrderByOrderId(orderId);
        return true;
    }



}
