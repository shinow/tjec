var baseUrl = contextpath + "aros/wyInfoManage/controller/ContentbaseinfoController/";
var urls = {
		showPersonListUrl: baseUrl + "showPersonList.do",
		unselectedUserTree: baseUrl + "queryUnselectedUser.do",
		selectedUserTree: baseUrl + "querySelectedUser.do"
	};

var editor;
$(function()
{
	//初始化编码器
	editor = KindEditor.create($('#contentEdit'), {
		resizeType : 1,
		allowPreviewEmoticons : false,
		allowImageUpload : false,
		items : [
			'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
			'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
			'insertunorderedlist', '|', 'emoticons']//, 'image', 'link']
	});
	var contypenum = $("#contype").val();
	if (contypenum == '02'){
		comboboxFuncByCondFilter("1", "type", "FLFG_TYPE", "code", "name");
	}else if (contypenum == '03'){
		comboboxFuncByCondFilter("1", "type", "DXAL_TYPE", "code", "name");
	}
});

//选择接收人
var userCode;
function choisePerson()
{
	$('#showPreson').show().dialog({
		title: '选择接收人',
		iconCls: 'icon-view',
		width: 680,
		height: 450,
		href: urls.showPersonListUrl, 
		modal:true,
		resizable: true,
		onLoad: function() {
			// 角色选择用户
			doInit($("#centraltab"), parent.$.modalDialog.handler.find("#receiveuserid").val());
			var cpanel = $('#centraltab').layout('panel', 'center');
			//适用于主页面
			cpanel.panel({
				onResize : function(w, h) {
					if (h)
					{
						var button_height = 0;
						var display_btns = cpanel.find("a:visible");
						display_btns.each(function(i)
						{
							button_height += 30;
						});
						$('#space_holder').height((h - button_height) / 2);
					}
				}
			});
			//适用于弹出框
			var total_height = cpanel.panel('options').height;
			var button_height = 0;
			var display_btns = cpanel.find("a:visible");
			display_btns.each(function(i)
			{
				button_height += 30;
			});
			$('#space_holder').height((total_height - button_height) / 2);
		},buttons: funcOperButtons()
	});
}

//接收人页面加载数据
function doInit(jq, userid)
{
	var	param = {
		userid: userid
	};
	jq.find("#lgrid").datagrid({
		url: urls.unselectedUserTree,
		queryParams: param,
		title: '可选用户列表',
		sortName: 'usercode',
		remoteSort: false,
		sortOrder: 'asc',
		toolbar: $('#tb'),
		idField : 'userid',
		columns: [[
            {field:'userid', checkbox:true},
            {field:'usercode', title:'用户编码', width:85}, 
            {field:'username', title:'用户名称', width:110}, 
            {field:'orgname', title:'机构名称', width:160}
        ]],
		fit: true,
		border: false,
		rownumbers: true,
		pagination: false,
		pageSize: 100,
		onDblClickRow: function(index, row) {
			dblClickChoiseUser(grid_left, grid_right, index, row);
		}
	});

	jq.find("#rgrid").datagrid({
		url: urls.selectedUserTree,
		queryParams: param,
		title: '已选用户列表',
		sortName: 'usercode',
		remoteSort: false,
		sortOrder: 'asc',
		idField : 'userid',
		columns: [[ 
		    {field:'userid', checkbox:true},
		    {field:'usercode', title:'用户编码', width:85}, 
		    {field:'username', title:'用户名称', width:110}, 
		    {field:'orgname', title:'机构名称', width:160}
	    ]],
		fit: true,
		border: false,
		rownumbers: true,
		pagination: false,
		pageSize: 100,
		onDblClickRow: function(index, row)
		{
			dblClickChoiseUser(grid_right, grid_left, index, row);
		}
	});
	
	jq.find(".datagrid-pager > table").hide();
	var grid_left = jq.find("#lgrid");
	var grid_right = jq.find("#rgrid");
	
	// 初始化添加按钮
	jq.find('#addBtn').linkbutton({
		onClick : function(index)
		{
			choiseUser(grid_left, grid_right);
		}
	});

	jq.find("#delBtn").linkbutton({
		onClick : function() {
			choiseUser(grid_right, grid_left);
		}
	});
}

function dblClickChoiseUser(grid_main, grid_sub, index, row)
{
	grid_sub.datagrid('appendRow', row);
	grid_main.datagrid('deleteRow', index);
}

//已选和未选用户操作
function choiseUser(grid_main, grid_sub)
{
	var rows = grid_main.datagrid("getSelections");
	if (rows.length < 1)
	{
		easyui_warn("请选择接收人！", null);
		return;
	}
		
	//删除数据时，datagrid会自动变更index,多行删除时，需要把删除的row放在一个数组，然后进行删除
	var oldRows = new Array();
	for (var i=0; i<rows.length; i++)
	{
		grid_sub.datagrid('appendRow',rows[i]);
		oldRows.push(rows[i]);
	}
	
	for (var i=0; i<oldRows.length; i++)
	{
		grid_main.datagrid('deleteRow', grid_main.datagrid('getRowIndex', oldRows[i]));
	}
}

//将选中的接收人赋值给textbox文本框中
function setValReceive()
{
	//获取已选择的用户，把接收人信息赋值到textarea中
	var selRowAry = $("#centraltab").find("#rgrid").datagrid('getData').rows;
	
	var usernameStr="";
	var useridStr="";
	for(var j=0;j<selRowAry.length;j++)
	{	
		var selRow = selRowAry[j];

		//拼接接收人姓名,编码
		if(j !=0)
		{
			usernameStr += ",";
			useridStr += ",";
		}
		usernameStr += selRow.username;
		useridStr += selRow.userid;
	}
	$("#receiveusername").textbox('setValue',usernameStr);
	$("#receiveuserid").val(useridStr);
}

function funcOperButtons()
{
	buttons= [
	{
		text : "确定",
		iconCls : "icon-redo",
		handler : function() {
			setValReceive();
			$('#showPreson').dialog('close');
			
		}
	},
	{
		text : "关闭",
		iconCls : "icon-cancel",
		handler : function() {
			$('#showPreson').dialog('close');
		}
	}];
	
	return buttons;
}

//点解查询
function doQuery(dialog)
{
	//获取已选择的用户
	var selVal = dialog.find("#selVal").val();
	var type = dialog.find("#type").combobox('getValue');
	
	//查询参数获取
	var param = {
			type: type,
			selVal: selVal
		};	

	$("#centraltab").find("#lgrid").datagrid("load", param);
}