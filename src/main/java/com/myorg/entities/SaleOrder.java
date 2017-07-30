package com.myorg.entities;


import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@IdClass(SaleOrderId.class)
public class SaleOrder implements Serializable {

    @Id
    private String id;

    @Id
    @ManyToOne @JoinColumn(name = "product_id")
    private Product productId;
    @Id @ManyToOne @JoinColumn(name = "customer_id")
    private Person customerId;

    @Temporal(TemporalType.DATE)
    private Date orderDate;

    private BigDecimal quantity;
    private BigDecimal gstTaxPerUnit;
    private BigDecimal discountPerUnit;
    private BigDecimal finalPricePerUnit;
    private String comment;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Product getProduct() {
        return productId;
    }

    public void setProduct(Product product) {
        this.productId = product;
    }

    public Person getCustomer() {
        return customerId;
    }

    public void setCustomer(Person customer) {
        this.customerId = customer;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getGstTaxPerUnit() {
        return gstTaxPerUnit;
    }

    public void setGstTaxPerUnit(BigDecimal gstTaxPerUnit) {
        this.gstTaxPerUnit = gstTaxPerUnit;
    }

    public BigDecimal getDiscountPerUnit() {
        return discountPerUnit;
    }

    public void setDiscountPerUnit(BigDecimal discountPerUnit) {
        this.discountPerUnit = discountPerUnit;
    }

    public BigDecimal getFinalPricePerUnit() {
        return finalPricePerUnit;
    }

    public void setFinalPricePerUnit(BigDecimal finalPricePerUnit) {
        this.finalPricePerUnit = finalPricePerUnit;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public String toString() {
        return "SaleOrder{" +
                "id='" + id + '\'' +
                ", product=" + productId +
                ", customer=" + customerId +
                ", orderDate=" + orderDate +
                ", quantity=" + quantity +
                ", gstTaxPerUnit=" + gstTaxPerUnit +
                ", discountPerUnit=" + discountPerUnit +
                ", finalPricePerUnit=" + finalPricePerUnit +
                ", comment='" + comment + '\'' +
                '}';
    }
}

