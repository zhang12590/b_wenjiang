webpackJsonp([17],{"8QVX":function(e,t){},IDM2:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("Xxa5"),i=n.n(o),r=n("exGp"),s=n.n(r),a={data:[{children:[],id:"root",is_function:"N",label:"root",pid:null,routing:""}],errmsg:"成功",errno:"0"},l={data:[{children:[],id:"root",is_function:"N",label:"root",pid:null,routing:""}],errmsg:"成功",errno:"0"},c={name:"ATheme",data:function(){return{searchInput:"",tableData:[],jurisdictionData:[],jurisdictionData1:[],addFormVisible:!1,formLabelWidth:"120px",form:{name:"",permissions:[]},fixFormVisible:!1,form1:{name:"",roleId:"",permissions:[]},seeFormVisible:!1,selectIds:[]}},watch:{},created:function(){this.getRoleFn(),this.getJurisdictionFn(),this.getDisabledPermissionsFn()},methods:{addBtnFn:function(){this.addFormVisible=!0},addSureFn:function(){var e=this.$refs.tree.getCheckedNodes(),t=this.$refs.tree.getHalfCheckedNodes(),n=[],o=[],i=[];e.forEach(function(e,t){"root"!==e.id&&o.push(e.id)}),t.forEach(function(e,t){"root"!==e.id&&i.push(e.id)}),n=n.concat(o,i),console.log(1,o),console.log(2,i),console.log(3,n);var r={name:this.form.name.replace(/(^\s*)|(\s*$)/g,""),permission_ids:n,permission_check:o.join("-"),permission_half_check:i.join("-"),user_id:sessionStorage.user_id};""!==r.name?this.addFn(r):this.notifyFn("提示","请补全信息")},seeJurisdiction:function(e,t){this.seeFormVisible=!0,this.form1.name=t.name,this.form1.roleId=t.id;for(var n=this,o=t.permission_check.split("-"),i=[],r=0;r<o.length;r++)for(var s=0;s<t.permissions.length;s++)o[r]===t.permissions[s].id.toString()&&i.push(t.permissions[s]);setTimeout(function(){n.$refs.tree2.setCheckedNodes(i)},200)},handleEdit:function(e,t){console.log(e,t),this.fixFormVisible=!0,this.form1.name=t.name,this.form1.roleId=t.id;for(var n=this,o=t.permission_check.split("-"),i=[],r=0;r<o.length;r++)for(var s=0;s<t.permissions.length;s++)o[r]===t.permissions[s].id.toString()&&i.push(t.permissions[s]);setTimeout(function(){n.$refs.tree1.setCheckedNodes(i)},200)},fixSureFn:function(){var e=this.$refs.tree1.getCheckedNodes(),t=this.$refs.tree1.getHalfCheckedNodes(),n=[],o=[],i=[];e.forEach(function(e,t){"root"!==e.id&&o.push(e.id)}),t.forEach(function(e,t){"root"!==e.id&&i.push(e.id)}),n=n.concat(o,i),console.log(1,o),console.log(2,i),console.log(3,n);var r={id:this.form1.roleId,name:this.form1.name.replace(/(^\s*)|(\s*$)/g,""),permission_ids:n,permission_check:o.join("-"),permission_half_check:i.join("-"),user_id:sessionStorage.user_id};""!==r.name?this.fixFn(r):this.notifyFn("提示","请补全信息")},clearBtnFn:function(){var e=this;this.selectIds.length?this.$confirm("确定删除所选角色","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t={id_list:e.selectIds,user_id:sessionStorage.user_id};e.deleteSingleFn(t)}).catch(function(){e.notifyFn("提示","已取消删除")}):this.notifyFn("提示","未选择角色")},handleDelete:function(e,t){var n=this;console.log(t),this.$confirm("确定删除角色："+t.name,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e={id_list:[t.id],user_id:sessionStorage.user_id};n.deleteSingleFn(e)}).catch(function(){n.notifyFn("提示","已取消删除")})},getRoleFn:function(){var e=this;return s()(i.a.mark(function t(){var n,o;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={},t.prev=1,t.next=4,e.$api.unsplash.getRoles(n);case 4:"0"===(o=t.sent).errno?(e.tableData=e.addSequence(o.data),console.log(o.data)):(e.tableData=[],e.notifyFn("提示",o.errmsg)),t.next=13;break;case 8:t.prev=8,t.t0=t.catch(1),e.tableData=[],e.notifyFn("提示","服务器错误"),console.log(t.t0);case 13:case"end":return t.stop()}},t,e,[[1,8]])}))()},getJurisdictionFn:function(){var e=this;return s()(i.a.mark(function t(){var n,o;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={},t.prev=1,t.next=4,e.$api.unsplash.getJurisdictions(n);case 4:"0"===(o=t.sent).errno?(a.data[0].children=o.data.slice(),console.log("禁用的权限3",o.data),e.jurisdictionData=a.data):e.notifyFn("提示",o.errmsg),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(1),e.notifyFn("提示","服务器错误"),console.log(t.t0);case 12:case"end":return t.stop()}},t,e,[[1,8]])}))()},getDisabledPermissionsFn:function(){var e=this;return s()(i.a.mark(function t(){var n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$api.unsplash.getPermissions({});case 3:"0"===(n=t.sent).errno?(l.data[0].children=n.data.slice(),e.jurisdictionData1=l.data):e.notifyFn("提示",n.errmsg),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),e.notifyFn("提示","服务器错误"),console.log(t.t0);case 11:case"end":return t.stop()}},t,e,[[0,7]])}))()},addFn:function(e){var t=this;return s()(i.a.mark(function n(){var o;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$api.unsplash.postAddRole(e);case 3:o=n.sent,console.log(o),"0"===o.errno?(t.addFormVisible=!1,t.notifyFn("提示","增加角色成功","success"),t.getRoleFn()):t.notifyFn("提示",o.errmsg),n.next=12;break;case 8:n.prev=8,n.t0=n.catch(0),t.notifyFn("提示","服务器错误"),console.log(n.t0);case 12:case"end":return n.stop()}},n,t,[[0,8]])}))()},fixFn:function(e){var t=this;return s()(i.a.mark(function n(){var o;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$api.unsplash.postfixRole(e);case 3:"0"===(o=n.sent).errno?(t.fixFormVisible=!1,t.notifyFn("提示","修改角色成功","success"),t.getRoleFn()):t.notifyFn("提示",o.errmsg),n.next=11;break;case 7:n.prev=7,n.t0=n.catch(0),t.notifyFn("提示","服务器错误"),console.log(n.t0);case 11:case"end":return n.stop()}},n,t,[[0,7]])}))()},deleteSingleFn:function(e){var t=this;return s()(i.a.mark(function n(){var o;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$api.unsplash.postClearRole(e);case 3:"0"===(o=n.sent).errno?(t.notifyFn("提示","删除成功","success"),t.selectIds=[],t.getRoleFn()):t.notifyFn("提示",o.errmsg),n.next=11;break;case 7:n.prev=7,n.t0=n.catch(0),t.notifyFn("提示","服务器错误"),console.log(n.t0);case 11:case"end":return n.stop()}},n,t,[[0,7]])}))()},handleSelectionChange:function(e,t){console.log(e),this.selectIds=[];for(var n=0;n<e.length;n++)this.selectIds.push(e[n].id)},selectAllFn:function(e){console.log(e),this.selectIds=[];for(var t=0;t<e.length;t++)this.selectIds.push(e[t].id)},headerCellStyle:function(e){e.row,e.column;var t=e.rowIndex;e.columnIndex;if(t>-1)return{"text-align":"center"}},cellStyle:function(e){e.row,e.column,e.rowIndex;if(e.columnIndex>=0)return{"text-align":"center"}},myAlert:function(e,t,n){n.$alert(e,t,{confirmButtonText:"确定",callback:function(e){}})},addSequence:function(e){for(var t=0;t<e.length;t++)e[t].index=t+1;return e},notifyFn:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"warning";this.$notify({title:e,message:t,type:n,dangerouslyUseHTMLString:!0,duration:5e3,position:"top-right"})}}},d={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"role"},[n("el-row",{staticClass:"functionalArea",attrs:{gutter:20}},[n("el-col",{attrs:{span:6}},[n("el-button-group",[n("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.addBtnFn}}),e._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-share"}}),e._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-delete"},on:{click:e.clearBtnFn}})],1)],1),e._v(" "),n("el-col",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{span:6,offset:12}},[n("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:e.searchInput,callback:function(t){e.searchInput=t},expression:"searchInput"}},[n("template",{slot:"append"},[n("el-button",{attrs:{type:"success",plain:""}},[e._v("搜索")])],1)],2)],1)],1),e._v(" "),n("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"header-cell-style":e.headerCellStyle,"cell-style":e.cellStyle},on:{select:e.handleSelectionChange,"select-all":e.selectAllFn}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),n("el-table-column",{attrs:{label:"序号",width:"60"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.index))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"角色",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"权限",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",icon:"el-icon-view"},on:{click:function(n){return e.seeJurisdiction(t.$index,t.row)}}})]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作","min-width":"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),n("el-dialog",{attrs:{title:"添加角色",visible:e.addFormVisible,width:"800px"},on:{"update:visible":function(t){e.addFormVisible=t}}},[n("el-form",{attrs:{model:e.form}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"角色","label-width":e.formLabelWidth}},[n("el-input",{attrs:{placeholder:"请输入角色",autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"权限树","label-width":e.formLabelWidth}},[n("el-tree",{ref:"tree",attrs:{data:e.jurisdictionData,"node-key":"id","show-checkbox":"","default-expand-all":!1,"expand-on-click-node":!1}})],1)],1)],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.addFormVisible=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.addSureFn}},[e._v("确 定")])],1)],1),e._v(" "),n("el-dialog",{attrs:{title:"编辑角色",visible:e.fixFormVisible,width:"800px"},on:{"update:visible":function(t){e.fixFormVisible=t}}},[n("el-form",{attrs:{model:e.form1}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"角色","label-width":e.formLabelWidth}},[n("el-input",{attrs:{placeholder:"请输入角色",autocomplete:"off"},model:{value:e.form1.name,callback:function(t){e.$set(e.form1,"name",t)},expression:"form1.name"}})],1)],1),e._v(" "),n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"权限树","label-width":e.formLabelWidth}},[n("el-tree",{ref:"tree1",attrs:{data:e.jurisdictionData,"node-key":"id","show-checkbox":"","default-expand-all":!1,"expand-on-click-node":!1}})],1)],1)],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.fixFormVisible=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.fixSureFn}},[e._v("确 定")])],1)],1),e._v(" "),n("el-dialog",{attrs:{title:"查看角色",visible:e.seeFormVisible,width:"800px"},on:{"update:visible":function(t){e.seeFormVisible=t}}},[n("el-form",{attrs:{model:e.form1}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"角色","label-width":e.formLabelWidth}},[n("el-input",{attrs:{placeholder:"请输入角色",autocomplete:"off",disabled:""},model:{value:e.form1.name,callback:function(t){e.$set(e.form1,"name",t)},expression:"form1.name"}})],1)],1),e._v(" "),n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"权限树","label-width":e.formLabelWidth}},[n("el-tree",{ref:"tree2",attrs:{data:e.jurisdictionData1,"node-key":"id","show-checkbox":"","default-expand-all":!1,"expand-on-click-node":!1}})],1)],1)],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.seeFormVisible=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.seeFormVisible=!1}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var u=n("VU/8")(c,d,!1,function(e){n("8QVX")},null,null);t.default=u.exports}});
//# sourceMappingURL=17.14dd5f8ff5180bcde757.js.map