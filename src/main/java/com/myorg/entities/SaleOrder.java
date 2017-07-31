package com.myorg.entities;


import com.fasterxml.jackson.annotation.JacksonAnnotation;
import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class SaleOrder implements Serializable {
    @EmbeddedId
    private PK pk;

    @Embeddable
    public static class PK implements Serializable {
        private String id;
        @ManyToOne @JoinColumn(name = "product_id")
        private Product product;
        @ManyToOne @JoinColumn(name = "customer_id")
        private Person customer;

        public PK() {
        }

        public PK(String id, Product product, Person customer) {
            this.id = id;
            this.product = product;
            this.customer = customer;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public Product getProduct() {
            return product;
        }

        public void setProduct(Product product) {
            this.product = product;
        }

        public Person getCustomer() {
            return customer;
        }

        public void setCustomer(Person customer) {
            this.customer = customer;
        }
    }

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date orderDate;

    private BigDecimal quantity;
    private BigDecimal gstTaxPerUnit;
    private BigDecimal discountPerUnit;
    private BigDecimal finalPricePerUnit;
    private String comment;

    public PK getPk() {
        return pk;
    }

    public void setPk(PK pk) {
        this.pk = pk;
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
                "pk=" + pk +
                ", orderDate=" + orderDate +
                ", quantity=" + quantity +
                ", gstTaxPerUnit=" + gstTaxPerUnit +
                ", discountPerUnit=" + discountPerUnit +
                ", finalPricePerUnit=" + finalPricePerUnit +
                ", comment='" + comment + '\'' +
                '}';
    }
}

