package com.myorg.entities;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;

import javax.persistence.*;

@Entity
//@IdClass(PurchaseOrder.PK.class)
public class PurchaseOrder implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 5719293375910030625L;
	
//	@Id
//	private String id;
//	@Id
//	@ManyToOne
//	@JoinColumn(name = "product_id")
//	private Product product;
//	@Id
//	@ManyToOne
//	@JoinColumn(name="supplier_id")
//	private Person supplier;

    @EmbeddedId PK pk;

	@Embeddable
	public static class PK implements Serializable {
		private String id;
		@ManyToOne @JoinColumn(name = "product_id")
		private Product product;
		@ManyToOne @JoinColumn(name = "supplier_id")
		private Person supplier;

		public PK(String id, Product product, Person supplier) {
		    this.id = id;
		    this.product = product;
		    this.supplier = supplier;
        }

        public PK() {}

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

		public Person getSupplier() {
			return supplier;
		}

		public void setSupplier(Person supplier) {
			this.supplier = supplier;
		}
	}
	@Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyy-MM-dd")
	private Date orderDate;
	private BigDecimal quantity;
	private BigDecimal pricePerUnit;
	private BigDecimal gstTaxPerUnit;
	private BigDecimal invoicePricePerUnit;
	private String comment;

	public PurchaseOrder() {}
	/*public String getId() {
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
	public Person getSupplier() {
		return supplier;
	}
	public void setSupplier(Person supplier) {
		this.supplier = supplier;
	}*/

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
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public BigDecimal getQuantity() {
		return quantity;
	}
	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}
	public BigDecimal getPricePerUnit() {
		return pricePerUnit;
	}
	public void setPricePerUnit(BigDecimal pricePerUnit) {
		this.pricePerUnit = pricePerUnit;
	}
	public BigDecimal getGstTaxPerUnit() {
		return gstTaxPerUnit;
	}
	public void setGstTaxPerUnit(BigDecimal gstTaxPerUnit) {
		this.gstTaxPerUnit = gstTaxPerUnit;
	}
	public BigDecimal getInvoicePricePerUnit() {
		return invoicePricePerUnit;
	}
	public void setInvoicePricePerUnit(BigDecimal invoicePricePerUnit) {
		this.invoicePricePerUnit = invoicePricePerUnit;
	}
	/*@Override
	public String toString() {
		return "PurchaseOrder [id=" + id + ", product=" + product + ", supplier=" + supplier + ", orderDate="
				+ orderDate + ", quantity=" + quantity + ", pricePerUnit=" + pricePerUnit + ", gstTaxPerUnit="
				+ gstTaxPerUnit + ", invoicePricePerUnit=" + invoicePricePerUnit + ", comment=" + comment + "]";
	}*/

    @Override
    public String toString() {
        return "PurchaseOrder{" +
                "pk=" + pk +
                ", orderDate=" + orderDate +
                ", quantity=" + quantity +
                ", pricePerUnit=" + pricePerUnit +
                ", gstTaxPerUnit=" + gstTaxPerUnit +
                ", invoicePricePerUnit=" + invoicePricePerUnit +
                ", comment='" + comment + '\'' +
                '}';
    }
}
