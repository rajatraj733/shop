package com.myorg.services;


import com.myorg.dao.ProductRepository;
import com.myorg.dao.PurchaseOrderRepository;
import com.myorg.entities.PurchaseOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManagerFactory;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class PurchaseOrderService {
    private PurchaseOrderRepository purOrdRep;
    private ProductRepository productRepository;
    @Autowired
    public PurchaseOrderService(PurchaseOrderRepository purOrdRepo, ProductRepository productRepository) {
        this.purOrdRep = purOrdRepo;
        this.productRepository = productRepository;
    }

    public Iterable<PurchaseOrder> getAllOrders() {
        return purOrdRep.findAll();
    }

    @Transactional
    public Iterable<PurchaseOrder> addOrders(List<PurchaseOrder> orders) throws Exception {
        if (StringUtils.isEmpty(orders.get(0).getPk().getId())) {
            String orderId = "self" + new SimpleDateFormat("yyMMddHHmmss").format(new Date());
            for (PurchaseOrder order : orders) {
                order.getPk().setId(orderId);
            }
        }
//        System.out.println(orders.get(0).getPk().getProduct());
        Iterable<PurchaseOrder> savedOrders = purOrdRep.save(orders);
        for(PurchaseOrder order: orders) {
            productRepository.addStocks(order.getPk().getProduct().getId(), order.getQuantity());
        }
        return savedOrders;


    }


    public PurchaseOrder updateSingleOrder(PurchaseOrder order) throws Exception {
        if (purOrdRep.exists(order.getPk()))
            return purOrdRep.save(order);
        else
            throw new Exception("Order does not exist");
    }

    public void deleteSingleOrder(PurchaseOrder order) throws Exception {
        if (purOrdRep.exists(order.getPk()))
            purOrdRep.delete(order);
        else
            throw new Exception("Order does not exist");
    }

    public void deleteOrderByOrderId(String orderId) throws Exception {
        if (purOrdRep.countByPk_Id(orderId) > 0) {
            purOrdRep.deleteAllByPk_Id(orderId);
        } else {
            throw new Exception("Orders with orderId " + orderId + " do not exist");
        }
    }

}
