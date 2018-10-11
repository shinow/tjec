/************************************************************
 * 类名：WorkflowProcversion
 *
 * 类别：DaoImpl
 * 功能：工作流版本DaoImpl
 * 
 *   Ver     変更日               部门            担当者        変更内容
 * ──────────────────────────────────────────────
 *   V1.00  2014-07-15  CFIT-PG     HYF         初版
 *
 * Copyright (c) 2014 CFIT-Weifang Company All Rights Reserved.
 ************************************************************/

package com.jbf.workflow.dao.impl;

import org.springframework.stereotype.Repository;

import com.jbf.common.dao.impl.GenericDao;
import com.jbf.workflow.dao.SysWorkflowOpinionDao;
import com.jbf.workflow.po.SysWorkflowOpinion;

@Repository("com.jbf.workflow.dao.impl.SysWorkflowOpinionDaoImpl")
public class SysWorkflowOpinionDaoImpl extends
		GenericDao<SysWorkflowOpinion, Long> implements
		SysWorkflowOpinionDao {

}
