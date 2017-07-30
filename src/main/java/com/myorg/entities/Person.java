package com.myorg.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity

public class Person implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3774668966243389020L;

	@Id
	@GeneratedValue
	private Integer id;
	
	@Column(nullable = false)
	private String name;
	
	
	private String address;
	@Column(unique = true, name = "mobile")
	private String mobileNo;

	private String gstin;
	private String identificationType;
	private String identificationNumber;
	
	private Boolean isCustomer;
	private Boolean isSupplier;
	private Integer balance;
	private String comment;
	
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
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getGstin() {
		return gstin;
	}

	public void setGstin(String gstin) {
		this.gstin = gstin;
	}

	public String getIdentificationType() {
		return identificationType;
	}
	public void setIdentificationType(String identificationType) {
		this.identificationType = identificationType;
	}
	
	public String getIdentificationNumber() {
		return identificationNumber;
	}
	public void setIdentificationNumber(String identificationNumber) {
		this.identificationNumber = identificationNumber;
	}
	public Boolean isCustomer() {
		return isCustomer;
	}
	public void setCustomer(Boolean isCustomer) {
		this.isCustomer = isCustomer;
	}
	public Boolean isSupplier() {
		return isSupplier;
	}
	public void setSupplier(Boolean isSupplier) {
		this.isSupplier = isSupplier;
	}
	public Integer getBalance() {
		return balance;
	}
	public void setBalance(Integer balance) {
		this.balance = balance;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	@Override
	public String toString() {
		return "Person [id=" + id + ", name=" + name + ", address=" + address + ", mobileNo=" + mobileNo
				+ ", identificationType=" + identificationType + ", identificationNumber=" + identificationNumber
				+ ", isCustomer=" + isCustomer + ", isSupplier=" + isSupplier + ", balance=" + balance + ", comment="
				+ comment + "]";
	}
	
	
	
	
	
}
