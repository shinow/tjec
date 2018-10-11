package com.wfzcx.aros.xzfy.po;
// Generated 2016-11-22 10:48:41 by Hibernate Tools 5.2.0.Beta1

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * BNoticedeliveryrelainfo generated by hbm2java
 */
@Entity
@Table(name = "B_NOTICEDELIVERYRELAINFO")
public class BNoticedeliveryrelainfo implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;
	private String tempid;
	private String contents;
	private String buildtime;
	private String operator;
	private String opttime;

	public BNoticedeliveryrelainfo() {
	}

	public BNoticedeliveryrelainfo(String id) {
		this.id = id;
	}

	public BNoticedeliveryrelainfo(String id, String tempid, String contents, String buildtime, String operator,
			String opttime) {
		this.id = id;
		this.tempid = tempid;
		this.contents = contents;
		this.buildtime = buildtime;
		this.operator = operator;
		this.opttime = opttime;
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

	@Column(name = "TEMPID", length = 32)
	public String getTempid() {
		return this.tempid;
	}

	public void setTempid(String tempid) {
		this.tempid = tempid;
	}

	@Column(name = "CONTENTS")
	public String getContents() {
		return this.contents;
	}

	public void setContents(String contents) {
		this.contents = contents;
	}

	@Column(name = "BUILDTIME", length = 20)
	public String getBuildtime() {
		return this.buildtime;
	}

	public void setBuildtime(String buildtime) {
		this.buildtime = buildtime;
	}

	@Column(name = "OPERATOR", length = 20)
	public String getOperator() {
		return this.operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	@Column(name = "OPTTIME", length = 20)
	public String getOpttime() {
		return this.opttime;
	}

	public void setOpttime(String opttime) {
		this.opttime = opttime;
	}

}