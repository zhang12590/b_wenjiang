webpackJsonp([17],{IDM2:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("Xxa5"),s=n.n(a),r=n("exGp"),i=n.n(r),o={data:[{children:[],id:"root",is_function:"N",label:"root",pid:null,routing:""}],errmsg:"成功",errno:"0"},l={name:"ATheme",data:function(){return{searchInput:"",tableData:[],jurisdictionData:[],addFormVisible:!1,formLabelWidth:"120px",form:{name:"",permissions:[]},fixFormVisible:!1,form1:{name:"",roleId:"",permissions:[]},selectIds:[]}},watch:{},created:function(){this.getRoleFn(),this.getJurisdictionFn()},methods:{addBtnFn:function(){this.addFormVisible=!0},addSureFn:function(){var e=[];this.$refs.tree.getCheckedNodes().forEach(function(t,n){"root"!=t.id&&e.push(t.id)});var t={name:this.form.name.replace(/(^\s*)|(\s*$)/g,""),permission_ids:e,user_id:sessionStorage.user_id};""!=t.name?this.addFn(t):this.$message({type:"warning",message:"请补全信息!"})},handleEdit:function(e,t){this.fixFormVisible=!0,this.form1.name=t.name,this.form1.roleId=t.id;var n=this;setTimeout(function(){n.$refs.tree1.setCheckedNodes(t.permissions)},200)},fixSureFn:function(){var e=[];this.$refs.tree1.getCheckedNodes().forEach(function(t,n){"root"!=t.id&&e.push(t.id)});var t={id:this.form1.roleId,name:this.form1.name.replace(/(^\s*)|(\s*$)/g,""),permission_ids:e,user_id:sessionStorage.user_id};""!=t.name?this.fixFn(t):this.$message({type:"warning",message:"请补全信息!"})},clearBtnFn:function(){var e=this;this.selectIds.length?this.$confirm("确定删除所选角色","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t={id_list:e.selectIds,user_id:sessionStorage.user_id};e.deleteSingleFn(t)}).catch(function(){e.$message({type:"info",message:"已取消删除"})}):this.$message({type:"warning",message:"未选择角色!"})},handleDelete:function(e,t){var n=this;this.$confirm("确定删除角色："+t.name,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e={id_list:[t.id],user_id:sessionStorage.user_id};n.deleteSingleFn(e)}).catch(function(){n.$message({type:"info",message:"已取消删除"})})},getRoleFn:function(){var e=this;return i()(s.a.mark(function t(){var n,a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={},t.prev=1,t.next=4,e.$api.unsplash.getRoles(n);case 4:"0"==(a=t.sent).errno?e.tableData=e.addSequence(a.data):e.$message({type:"warning",message:"获取角色失败"}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1);case 11:case"end":return t.stop()}},t,e,[[1,8]])}))()},getJurisdictionFn:function(){var e=this;return i()(s.a.mark(function t(){var n,a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={},t.prev=1,t.next=4,e.$api.unsplash.getJurisdictions(n);case 4:"0"==(a=t.sent).errno?(o.data[0].children=a.data.slice(),e.jurisdictionData=o.data):e.$message({type:"warning",message:"获取权限失败"}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1);case 11:case"end":return t.stop()}},t,e,[[1,8]])}))()},addFn:function(e){var t=this;return i()(s.a.mark(function n(){return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$api.unsplash.postAddRole(e);case 3:"0"==n.sent.errno?(t.addFormVisible=!1,t.$message({type:"success",message:"增加角色成功"}),t.getRoleFn()):t.$message({type:"warning",message:"增加角色失败"}),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(0);case 11:case"end":return n.stop()}},n,t,[[0,8]])}))()},fixFn:function(e){var t=this;return i()(s.a.mark(function n(){return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$api.unsplash.postfixRole(e);case 3:"0"==n.sent.errno?(t.fixFormVisible=!1,t.$message({type:"success",message:"修改角色成功"}),t.getRoleFn()):t.$message({type:"warning",message:"修改角色失败"}),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0);case 10:case"end":return n.stop()}},n,t,[[0,7]])}))()},deleteSingleFn:function(e){var t=this;return i()(s.a.mark(function n(){return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$api.unsplash.postClearRole(e);case 3:"0"==n.sent.errno?(t.$message({type:"success",message:"删除成功!"}),t.selectIds=[],t.getRoleFn()):t.myAlert("服务器错误","警告",t),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0);case 10:case"end":return n.stop()}},n,t,[[0,7]])}))()},handleSelectionChange:function(e,t){this.selectIds=[];for(var n=0;n<e.length;n++)this.selectIds.push(e[n].id)},selectAllFn:function(e){this.selectIds=[];for(var t=0;t<e.length;t++)this.selectIds.push(e[t].id)},headerCellStyle:function(e){e.row,e.column;var t=e.rowIndex;e.columnIndex;if(t>-1)return{"text-align":"center"}},cellStyle:function(e){e.row,e.column,e.rowIndex;if(e.columnIndex>=0)return{"text-align":"center"}},myAlert:function(e,t,n){n.$alert(e,t,{confirmButtonText:"确定",callback:function(e){}})},addSequence:function(e){for(var t=0;t<e.length;t++)e[t].index=t+1;return e}}},c={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"role"},[n("el-row",{staticClass:"functionalArea",attrs:{gutter:20}},[n("el-col",{attrs:{span:6}},[n("el-button-group",[n("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.addBtnFn}}),e._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-share"}}),e._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-delete"},on:{click:e.clearBtnFn}})],1)],1),e._v(" "),n("el-col",{attrs:{span:6,offset:12}},[n("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:e.searchInput,callback:function(t){e.searchInput=t},expression:"searchInput"}},[n("template",{slot:"append"},[n("el-button",{attrs:{type:"success",plain:""}},[e._v("搜索")])],1)],2)],1)],1),e._v(" "),n("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"header-cell-style":e.headerCellStyle,"cell-style":e.cellStyle},on:{select:e.handleSelectionChange,"select-all":e.selectAllFn}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),n("el-table-column",{attrs:{label:"序号",width:"60"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.index))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"角色",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作","min-width":"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),n("el-dialog",{attrs:{title:"添加角色",visible:e.addFormVisible,width:"800px"},on:{"update:visible":function(t){e.addFormVisible=t}}},[n("el-form",{attrs:{model:e.form}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"角色","label-width":e.formLabelWidth}},[n("el-input",{attrs:{placeholder:"请输入角色",autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"权限树","label-width":e.formLabelWidth}},[n("el-tree",{ref:"tree",attrs:{data:e.jurisdictionData,"node-key":"id","show-checkbox":"","default-expand-all":!1,"expand-on-click-node":!1}})],1)],1)],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.addFormVisible=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.addSureFn}},[e._v("确 定")])],1)],1),e._v(" "),n("el-dialog",{attrs:{title:"编辑角色",visible:e.fixFormVisible,width:"800px"},on:{"update:visible":function(t){e.fixFormVisible=t}}},[n("el-form",{attrs:{model:e.form1}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"角色","label-width":e.formLabelWidth}},[n("el-input",{attrs:{placeholder:"请输入角色",autocomplete:"off"},model:{value:e.form1.name,callback:function(t){e.$set(e.form1,"name",t)},expression:"form1.name"}})],1)],1),e._v(" "),n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"权限树","label-width":e.formLabelWidth}},[n("el-tree",{ref:"tree1",attrs:{data:e.jurisdictionData,"node-key":"id","show-checkbox":"","default-expand-all":!1,"expand-on-click-node":!1}})],1)],1)],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.fixFormVisible=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.fixSureFn}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var u=n("VU/8")(l,c,!1,function(e){n("L2iV")},null,null);t.default=u.exports},L2iV:function(e,t){}});
//# sourceMappingURL=17.cb9240bf0c3c7dc4f9c8.js.map