package com.myorg.entities;

import javax.persistence.Embeddable;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

public class SaleOrderId implements Serializable {
    private String id;

//    @ManyToOne @JoinColumn(name="product_id")
    private Integer productId;
//    @ManyToOne @JoinColumn(name="customer_id")
    private Integer customerId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }
}
