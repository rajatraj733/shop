package com.myorg.services;


import com.myorg.dao.SaleOrderRepository;
import com.myorg.entities.SaleOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class SaleOrderService {
    private SaleOrderRepository saleOrdRepo;
    private EntityManagerFactory entityManagerFactory;

    @Autowired
    public SaleOrderService(SaleOrderRepository saleOrdRepo, EntityManagerFactory entityManagerFactory) {
        this.saleOrdRepo = saleOrdRepo;
        this.entityManagerFactory = entityManagerFactory;
    }

    public Iterable<SaleOrder> getAllOrders() {
        return saleOrdRepo.findAll();
    }

    public Iterable<SaleOrder> addOrders(List<SaleOrder> orders) {
        EntityManager entityManager = entityManagerFactory.createEntityManager();

        List<SaleOrder> resOrders = new ArrayList<>();
        if(StringUtils.isEmpty(orders.get(0).getId()))
        {
            String orderId = "RS"+new SimpleDateFormat("yMMddhhmmss").format(new Date());
            for(SaleOrder order: orders) {
                order.setId(orderId);
            }
        }
        entityManager.merge(orders);
//        for(SaleOrder order: orders) {
//            resOrders.add(saleOrdRepo.save(order));
//        }
        return orders;
//        return resOrders;
    }




}
