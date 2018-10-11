//请求路径
var baseUrl = contextpath + "aros/xzfy/controller/CasebaseinfoController/";
var urls = {
	gridUrl:baseUrl + "queryTextProductionList.do",                // 查询案件列表
	editUrl:baseUrl + "textProductionEdit.do"                      // 打开文书列表页面
};

var panel_ctl_handles = [{
	panelname:"#textProductionPanel", 		// 要折叠的面板id
	gridname:"#textProductionDataGrid",  	// 刷新操作函数
	buttonid:"#openclose"	 			    // 折叠按钮id
}];

// 默认加载
$(function() {
	$('#textProductionPanel').panel('close');
	comboboxFuncByCondFilter(menuid, "admtype", "ADMINLEVEL", "code", "name");	//行政管理类型
	comboboxFuncByCondFilter(menuid, "casetype", "B_CASEBASEINFO_CASETYPE", "code", "name");	//申请复议事项类型
	comboboxFuncByCondFilter(menuid, "deftype", "B_CASEBASEINFO_DEFTYPE", "code", "name");	//被申请人类型

	$("#opttype").combobox({
		valueField : "value",
		textField : "text",
		editable : false,
		data : [{text : "未处理", value : "1", selected:true}, {text : "已处理", value : "2"}],
		onSelect : function(record) {
			textProductionQuery();
			switch (record.value) {
			case '1':
				$('#sendBtn').linkbutton('enable');
				$('#returnBtn').linkbutton('enable');
				break;
			case '2':
				$('#sendBtn').linkbutton('disable');
				$('#returnBtn').linkbutton('disable');
				break;
			default:
				break;
			}
		}
	});
	
	//加载Grid数据
	loadTextProductioGrid(urls.gridUrl);
	var icons = {iconCls:"icon-clear"};
	$("#opttype").textbox("addClearBtn", icons);
	$("#appname").textbox("addClearBtn", icons);
	$("#defname").textbox("addClearBtn", icons);
	$("#admtype").textbox("addClearBtn", icons);
	$("#casetype").textbox("addClearBtn", icons);
	$("#deftype").textbox("addClearBtn", icons);
});

var xzfyDataGrid;
function showReload(){
	xzfyDataGrid.datagrid('reload'); 
}

//加载可项目grid列表
function loadTextProductioGrid(url) {
	xzfyDataGrid = $("#textProductionDataGrid").datagrid({
		fit:true,
		stripe:true,
		singleSelect:true,
		rownumbers:true,
		pagination:true,
		remoteSort:false,
		multiSort:true,
		pageSize:30,
		queryParams:{
			menuid:menuid,
			nodeid:nodeid,
			firstNode:true,
			lastNode:false
		},
		url:url,
		loadMsg:"正在加载，请稍候......",
		toolbar:"#toolbar_center",
		showFooter:true,
		onDblClickRow:function (rowIndex, rowData) {  
			openEditOrReview(rowData);
        },
        onClickRow:function(rowIndex,rowData){
        	viewTime();
        	viewFlow();
        },
		columns:[[ 
		  {field:"caseid", checkbox:true},
		  {field:"csaecode", title:"案件编号", halign:"center", width:120, sortable:true},
		  {field:"receivedate", title:"收文日期", halign:"center", width:80, sortable:true},
		  {field:"appname", title:"申请人", halign:"center", width:200, sortable:true},
		  {field:"apptypeMc", title:"申请人类型", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"idtypeMc", title:"证件类型", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"idcode", title:"证件号码", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"phone", title:"联系电话", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"address", title:"通讯地址", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"postcode", title:"邮政编码", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"deftypeMc", title:"被申请人类型", width:150, sortable:true},
		  {field:"defname", title:"被申请人", halign:"center", width:250, sortable:true},
		  {field:"depttype", title:"被申请人机构类型", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"defidtype", title:"被申请人证件类型", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"defidcode", title:"被申请人证件号码", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"defphone", title:"被申请人联系电话", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"defaddress", title:"被申请人通讯地址", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"defpostcode", title:"被申请人邮政编码", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"noticeddate", title:"接受告知日期", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"actnoticeddate", title:"实际接受告知日期", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"admtypeMc", title:"行政管理类型", halign:"center", width:100, sortable:true},
		  {field:"casetypeMc", title:"申请复议事项", halign:"center", width:100, sortable:true},
		  {field:"ifcompensationMc", title:"是否附带行政赔偿", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"amount", title:"赔偿金额", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"appcase", title:"申请事项", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"factreason", title:"事实和理由", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"annex", title:"附件", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"appdate", title:"申请日期", halign:"center", width:80, sortable:true, hidden:true},
		  {field:"operator", title:"操作人", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"optdate", title:"操作日期", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"protype", title:"流程类型", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"opttype", title:"处理标志", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"nodeid", title:"节点编号", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"lasttime", title:"数据最后更新时间", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"userid", title:"用户ID", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"oldprotype", title:"原流程类型", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"mobile", title:"联系手机", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"mailaddress", title:"邮寄地址", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"email", title:"邮箱", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"defmobile", title:"被申请人联系手机", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"defmailaddress", title:"被申请人邮寄地址", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"defemail", title:"被申请人邮箱", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"receiveway", title:"收文方式", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"expresscom", title:"递送公司", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"couriernum", title:"递送单号", halign:"center", width:200, sortable:true, hidden:true},
		  {field:"datasourceMc", title:"数据来源", halign:"center", width:80, sortable:true},
		  {field:"delaydays", title:"延期天数", halign:"center", width:100, sortable:true, hidden:true},
		  {field:"region", title:"行政区", halign:"center", width:100, sortable:true, hidden:true},
		  {field:"intro", title:"案件简介", halign:"center", width:100, sortable:true, hidden:true},
		  {field:"isgreat", title:"是否重大案件备案", halign:"center", width:100, sortable:true, hidden:true} 
        ]]
	});
}

/**
 * 条件查询
 */
function textProductionQuery(){
	var param = {
		opttype:$("#opttype").combobox('getValue'),
		appname:$("#appname").val(),
		defname:$("#defname").val(),
		menuid:menuid,
		admtype:$("#admtype").combobox('getValue'),
		casetype:$("#casetype").combobox('getValue'),
		deftype:$("#deftype").combobox('getValue'),
		nodeid:nodeid,
		firstNode:true,
		lastNode:false
	};
	
	xzfyDataGrid.datagrid("load", param);
}

function openEditOrReview(row)
{
	if (nodeid == row.nodeid)
	{
		openTextProductioDialog(row);
	}
	else
	{
		xzfyTextProductionDetail();
	}
}

/**
 * 打开行政复议处理页面
 * @param row
 */
function openTextProductioDialog(row) {
	parent.$.modalDialog({
		title: "文书制作",
		width: 1000,
		height: 600,
		queryParams: {
			 caseid: row.caseid,
			 protype: row.protype,
			 nodeid: row.nodeid
		},
		href: urls.editUrl,
		onDestroy: function() {
			showReload();
		},
		buttons: [{
			text: "关闭",
			iconCls: "icon-cancel",
			handler: function() {
				parent.$.modalDialog.handler.dialog("close");
			}
		}]
	});
}

/**
 * 将案件发送给其他用户
 */
function sendToOther(){
	var selectRow = xzfyDataGrid.datagrid("getChecked");
	if(selectRow == null || selectRow.length == 0 || selectRow.length > 1){
		easyui_warn("请选择一条复议申请", null);
		return;
	}
	parent.$.modalDialog({
		title:"选择转送人",
		width:900,
		height:600,
		href:urls.sendUrl,
		onLoad:function(){
			var mdDialog = parent.$.modalDialog.handler;
			var sessionId = parent.$.modalDialog.handler.find('#sessionId').val();
			var row = xzfyDataGrid.datagrid("getSelections")[0];
			//所有机构列表
			openMechanismDataGrid(mdDialog, row.nodeid);
		},
		buttons:[{
			id:"saveBtn",
			text:"选择",
			iconCls:"icon-save",
			handler:function() {
				var mdDialog = parent.$.modalDialog.handler;
				var row = xzfyDataGrid.datagrid("getSelections")[0];
				saveSend(row.caseid);
			}
		},{
			text:"关闭",
			iconCls:"icon-cancel",
			handler:function() {
				parent.$.modalDialog.handler.dialog("close");
			}
		}]
	});
}
var code;
//可选委员列表
function openMechanismDataGrid(mdDialog, nodeid) {
	userDataGrid = mdDialog.find("#mechanismTable").datagrid({
		fit:true,
		stripe:true,
		singleSelect:true,
		height:400,
		title: '机构列表',
		rownumbers:true,
		pagination:true,
		remoteSort:false,
		multiSort:true,
		queryParams:{
			menuid:menuid,
			nodeid:nodeid,
			firstNode:true,
			lastNode:false
		},
		pageSize : 30,
		url : urls.queryUserUrl,
		loadMsg : "正在加载，请稍候......",
		toolbar : "#toolbar_user",
		showFooter : true,
		columns : [ [ {
			field : "code",
			checkbox : true
		},
		{
			field : "orgcodeMc",
			title : "机构名称",
			halign : 'center',
			width : 220,
			fixed : true,
			sortable:true
		}
		] ],
		onSelect : function(rowIndex, rowData) {
			loadRoleDataGrid(rowData);
		},
		onLoadSuccess : function(data) {
			userDataGrid.datagrid('selectRow', 0);
		},
        onLoadError : function() {
			
		}
	});
}

/**
 * 加载表字段定义数据表格
 */
function loadRoleDataGrid(rowData) {
	var code=rowData.code;
	var mdDialog = parent.$.modalDialog.handler;
	personalDataGrid = mdDialog.find("#personalTable").datagrid({
		fit : true,
		border : false,
		singleSelect : true,
		title: '人员列表',
		rownumbers:true,
		pagination:true,
		remoteSort:false,
		multiSort:true,
		queryParams:{
			menuid:menuid,
			code:code
		},
		url : urls.findRoleUrl,
		loadMsg : "正在加载，请稍候......",
		columns : [ [ {
			field : "userid",
			checkbox : true
		}, {
			field : "usercode",
			title : "用户编码",
			halign : 'center',
			width : 100
		},{  
			field : "username",
			title : "用户名称",
			halign : 'center',
			fixed : true,
			width : 120,
			sortable:true
		},{  
			field : "createtime",
			title : "创建日期",
			halign : 'center',
			width :150
		}
		] ],
		onLoadError : function() {
		}
	});
}

/**
 * 保存转发信息
 * @param caseid
 * @param userid
 */
function saveSend(caseid){
	var selectRow = personalDataGrid.datagrid("getChecked");
	if(selectRow == null || selectRow.length == 0 || selectRow.length > 1){
		easyui_warn("请选择一位用户信息  !", null);
		return;
	}
	
	var row = personalDataGrid.datagrid("getSelections")[0];
	parent.$.messager.confirm("发送转发", "确认要转发他人处理？", function(r) {
		if (r) {
			$.post(urls.saveSendUrl, {
				menuid:menuid,
				activityId:activityId,
				caseid:caseid,
				userid:row.userid 
			}, function(result) {
				if (result.success) {
					xzfyDataGrid.datagrid("reload");
					parent.$.modalDialog.handler.dialog("close");
				} else {
					parent.$.messager.alert("错误", result.title, "error");
				}
			}, "json");
		}
	});
}

/**
 * 相似案件管理
 */
function similarCaseManagement(){
	var selectRow = xzfyDataGrid.datagrid("getChecked");
	if(selectRow == null || selectRow.length == 0 || selectRow.length > 1){
		easyui_warn("请选择一条复议案件 !", null);
		return;
	}
	var row = xzfyDataGrid.datagrid("getSelections")[0];
	var deftype=row.deftype;
	var admtype=row.admtype;
	var casetype=row.casetype;
	window.open('similcaseManagement_init.do?deftype='+deftype+'&admtype='+admtype+'&casetype='+casetype,'newwindow','width='+(window.screen.availWidth-10)+',height='+(window.screen.availHeight-60)+',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no') 
	
}
