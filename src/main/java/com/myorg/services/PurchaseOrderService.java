package com.myorg.services;


import com.myorg.dao.PurchaseOrderRepository;
import com.myorg.entities.PurchaseOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class PurchaseOrderService {
    private PurchaseOrderRepository purOrdRep;
    private EntityManagerFactory entityManagerFactory;
    @Autowired
    public PurchaseOrderService(PurchaseOrderRepository purOrdRepo, EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
        this.purOrdRep = purOrdRepo;
    }

    public Iterable<PurchaseOrder> getAllOrders() {
        return purOrdRep.findAll();
    }



    public Iterable<PurchaseOrder> addOrders(List<PurchaseOrder> orders) throws Exception {
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        EntityTransaction entityTransaction = entityManager.getTransaction();
        entityTransaction.begin();
        try {
            if (StringUtils.isEmpty(orders.get(0).getPk().getId())) {
                String orderId = "self" + new SimpleDateFormat("yyMMddHHmmss").format(new Date());
                for (PurchaseOrder order : orders) {
                    order.getPk().setId(orderId);
                }
            }
            System.out.println(orders.get(0).getPk().getProduct());
            Iterable<PurchaseOrder> savedOrders =  purOrdRep.save(orders);
            entityTransaction.commit();
            return savedOrders;

        } catch (Exception e) {
            entityTransaction.rollback();
            throw new Exception("Order rolled back -- " + e.getMessage());
        }
    }


    public PurchaseOrder updateSingleOrder(PurchaseOrder order) throws Exception {
        if(purOrdRep.exists(order.getPk()))
            return purOrdRep.save(order);
        else
            throw new Exception("Order does not exist");
    }
    public void deleteSingleOrder(PurchaseOrder order) throws Exception {
        if(purOrdRep.exists(order.getPk()))
            purOrdRep.delete(order);
        else
            throw new Exception("Order does not exist");
    }

    public void deleteOrderByOrderId(String orderId) throws Exception {
        if(purOrdRep.countByPk_Id(orderId) > 0) {
            purOrdRep.deleteAllByPk_Id(orderId);
        } else {
            throw new Exception("Orders with orderId "+orderId+ " do not exist");
        }
    }

}
