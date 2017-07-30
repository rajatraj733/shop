package com.myorg.dao;

import com.myorg.entities.PurchaseOrder;
import org.springframework.data.repository.CrudRepository;

public interface PurchaseOrderRepository extends CrudRepository<PurchaseOrder, PurchaseOrder.PK> {

    public Integer countByPk_Id(String orderId);

    public Integer deleteAllByPk_Id(String orderId);

}
