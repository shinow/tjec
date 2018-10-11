package com.wfzcx.aros.wyInfoManage.po;
// Generated 2016-9-20 17:19:28 by Hibernate Tools 3.4.0.CR1

import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * BContentuserrelainfo generated by hbm2java
 */
@Entity
@Table(name = "B_CONTENTUSERRELAINFO")
public class BContentuserrelainfo implements java.io.Serializable {

	private String id;
	private String conid;
	private BigDecimal userid;

	public BContentuserrelainfo() {
	}

	public BContentuserrelainfo(String id) {
		this.id = id;
	}

	public BContentuserrelainfo(String id, String conid, BigDecimal userid) {
		this.id = id;
		this.conid = conid;
		this.userid = userid;
	}

	@Id
	@GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")	
	@Column(name = "ID", unique = true, nullable = false, length = 32)
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Column(name = "CONID", length = 32)
	public String getConid() {
		return this.conid;
	}

	public void setConid(String conid) {
		this.conid = conid;
	}

	@Column(name = "USERID", scale = 0)
	public BigDecimal getUserid() {
		return this.userid;
	}

	public void setUserid(BigDecimal userid) {
		this.userid = userid;
	}

}
