package com.myorg.dao;

import com.myorg.entities.SaleOrder;
import org.springframework.data.repository.CrudRepository;

public interface SaleOrderRepository extends CrudRepository<SaleOrder, SaleOrder.PK>{
}
