package com.myorg.entities;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6780372201766326925L;
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Column(nullable = false)
	private String name;
	private Integer mrp;
	
	private BigDecimal cpPerUnit;
	@Column(name="unit_per_carton")
	private Integer unitsPerCarton;
	
	private BigDecimal spPerCarton;
	private BigDecimal spPerUnit;
	
	private Integer gstTaxRate;
	private String comment;
	@Column(insertable = false)
	private BigDecimal stocksInUnit;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getMrp() {
		return mrp;
	}
	public void setMrp(Integer mrp) {
		this.mrp = mrp;
	}
	public BigDecimal getCpPerUnit() {
		return cpPerUnit;
	}
	public void setCpPerUnit(BigDecimal cpPerUnit) {
		this.cpPerUnit = cpPerUnit;
	}
	public Integer getUnitsPerCarton() {
		return unitsPerCarton;
	}
	public void setUnitsPerCarton(Integer unitsPerCarton) {
		this.unitsPerCarton = unitsPerCarton;
	}
	public BigDecimal getSpPerCarton() {
		return spPerCarton;
	}
	public void setSpPerCarton(BigDecimal spPerCarton) {
		this.spPerCarton = spPerCarton;
	}
	public BigDecimal getSpPerUnit() {
		return spPerUnit;
	}
	public void setSpPerUnit(BigDecimal spPerUnit) {
		this.spPerUnit = spPerUnit;
	}
	public Integer getGstTaxRate() {
		return gstTaxRate;
	}
	public void setGstTaxRate(Integer gstTaxRate) {
		this.gstTaxRate = gstTaxRate;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public BigDecimal getStocksInUnit() {
		return stocksInUnit;
	}
	public void setStocksInUnit(BigDecimal stocksInUnit) {
		this.stocksInUnit = stocksInUnit;
	}
	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", mrp=" + mrp + ", cpPerUnit=" + cpPerUnit
				+ ", unitsPerCarton=" + unitsPerCarton + ", spPerCarton=" + spPerCarton + ", spPerUnit=" + spPerUnit
				+ ", gstTaxRate=" + gstTaxRate + ", comment=" + comment + ", stocksInUnits=" + stocksInUnit + "]";
	}
	
	
	

}
