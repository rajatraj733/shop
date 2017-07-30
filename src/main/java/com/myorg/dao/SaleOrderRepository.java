package com.myorg.dao;

import com.myorg.entities.SaleOrder;
import com.myorg.entities.SaleOrderId;
import org.springframework.data.repository.CrudRepository;

public interface SaleOrderRepository extends CrudRepository<SaleOrder, SaleOrderId>{
}
