webpackJsonp([14],{HrWV:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("mvHQ"),r=i.n(s),n=i("Xxa5"),a=i.n(n),o=i("exGp"),l=i.n(o),c={data:[{children:[],id:"root",is_function:"N",label:"root",pid:"root",routing:""}],errmsg:"成功",errno:"0"},u={name:"Jurisdiction",data:function(){return{jurisdictionData:[],searchVal:"",formLabelWidth:"120px",addFormVisible:!1,form:{discripe:"",label:"",pid:"",is_function:"",routing:""},fixFormVisible:!1,form1:{discripe:"",label:"",pid:"",is_function:"",routing:"",id:""},functionList:[{label:"菜单",val:"N"},{label:"功能",val:"Y"}],curJurisdiction:{}}},watch:{},created:function(){this.getJurisdictionFn()},methods:{append:function(t){this.addFormVisible=!0,this.form.pid=t.pid,this.curJurisdiction=t},fixed:function(t,e){this.fixFormVisible=!0,this.form1.pid=e.pid,this.curJurisdiction=e,this.form1.label=e.label,this.form1.discripe=e.discripe,this.form1.is_function=e.is_function,e.routing?this.form1.routing=e.routing:this.form1.routing="",this.form1.id=e.id},remove:function(t,e){var i=this,s={id_list:[e.id]};this.$confirm("此操作将删除该权限, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.clearFn(s)}).catch(function(){i.$message({type:"info",message:"已取消删除"})})},isDisabled:function(t,e){return"root"===t.label},renderContent:function(t,e){var i=this,s=e.node,r=e.data;e.store;return"root"==s.label?t("span",{class:"custom-tree-node"},[t("span",[s.label]),t("span",[t("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(){return i.append(r)}},class:"rootClass"},["Append"])])]):t("span",{class:"custom-tree-node"},[t("span",[s.label]),t("span",[t("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(){return i.append(r)}}},["Append"]),t("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(){return i.fixed(s,r)}}},["fixed"]),t("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(){return i.remove(s,r)}}},["Delete"])])])},addSureFn:function(){"root"===this.form.pid?this.form.pid=null:this.form.pid=this.curJurisdiction.id;var t={discripe:this.form.discripe.replace(/(^\s*)|(\s*$)/g,""),label:this.form.label.replace(/(^\s*)|(\s*$)/g,""),pid:this.form.pid,is_function:this.form.is_function,routing:this.form.routing};""!==t.discripe&&""!==t.label&&""!==t.is_function?"N"===t.is_function?this.addFn(t):t.routing.replace(/(^\s*)|(\s*$)/g,"")?this.addFn(t):this.$message({message:"路由不能为空",type:"warning"}):this.$message({type:"warning",message:"请补全信息!"})},fixSureFn:function(){var t={discripe:this.form1.discripe.replace(/(^\s*)|(\s*$)/g,""),label:this.form1.label.replace(/(^\s*)|(\s*$)/g,""),pid:this.form1.pid,is_function:this.form1.is_function,routing:this.form1.routing,id:this.form1.id};""!==t.discripe&&""!==t.label&&""!==t.is_function?"N"===t.is_function?this.fixFn(t):t.routing.replace(/(^\s*)|(\s*$)/g,"")?this.fixFn(t):this.$message({message:"路由不能为空",type:"warning"}):this.$message({type:"warning",message:"请补全信息!"})},addFn:function(t){var e=this;return l()(a.a.mark(function i(){return a.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,e.$api.unsplash.postAddJurisdiction(t);case 3:"0"===i.sent.errno?(e.addFormVisible=!1,e.$message({type:"success",message:"增加权限成功"}),e.getJurisdictionFn()):e.$message({type:"warning",message:"增加权限失败"}),i.next=11;break;case 8:i.prev=8,i.t0=i.catch(0);case 11:case"end":return i.stop()}},i,e,[[0,8]])}))()},fixFn:function(t){var e=this;return l()(a.a.mark(function i(){return a.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,e.$api.unsplash.postfixJurisdiction(t);case 3:"0"===i.sent.errno?(e.fixFormVisible=!1,e.$message({type:"success",message:"修改权限成功"}),e.getJurisdictionFn()):e.$message({type:"warning",message:"修改权限失败"}),i.next=11;break;case 8:i.prev=8,i.t0=i.catch(0);case 11:case"end":return i.stop()}},i,e,[[0,8]])}))()},getJurisdictionFn:function(){var t=this;return l()(a.a.mark(function e(){var i,s;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i={},e.prev=1,e.next=4,t.$api.unsplash.getJurisdictions(i);case 4:"0"===(s=e.sent).errno?(c.data[0].children=s.data.slice(),t.jurisdictionData=c.data,sessionStorage.tree=r()(t.jurisdictionData)):t.$message({type:"warning",message:"获取权限失败"}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1);case 11:case"end":return e.stop()}},e,t,[[1,8]])}))()},clearFn:function(t){var e=this;return l()(a.a.mark(function i(){return a.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,e.$api.unsplash.postClearJurisdiction(t);case 3:"0"==i.sent.errno?(e.$message({type:"success",message:"删除权限成功"}),e.getJurisdictionFn()):e.$message({type:"warning",message:"删除权限失败"}),i.next=11;break;case 8:i.prev=8,i.t0=i.catch(0);case 11:case"end":return i.stop()}},i,e,[[0,8]])}))()}}},f={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"jurisdiction"},[i("el-row",{staticClass:"functionalArea",attrs:{gutter:20}},[i("el-col",{attrs:{span:6,offset:18}},[i("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.searchVal,callback:function(e){t.searchVal=e},expression:"searchVal"}},[i("template",{slot:"append"},[i("el-button",{attrs:{type:"success",plain:""}},[t._v("搜索")])],1)],2)],1)],1),t._v(" "),i("div",{staticClass:"jurisdictionTitle"},[t._v("权限树")]),t._v(" "),i("div",{staticClass:"treeWarp"},[i("el-tree",{attrs:{data:t.jurisdictionData,"node-key":"id","default-expand-all":"","expand-on-click-node":!1,"render-content":t.renderContent}})],1),t._v(" "),i("el-dialog",{attrs:{title:"添加权限",visible:t.addFormVisible,width:"800px"},on:{"update:visible":function(e){t.addFormVisible=e}}},[i("el-form",{attrs:{model:t.form}},[i("el-row",{attrs:{gutter:20}},[i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"权限","label-width":t.formLabelWidth}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.label,callback:function(e){t.$set(t.form,"label",e)},expression:"form.label"}})],1)],1),t._v(" "),i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"标识符","label-width":t.formLabelWidth}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.discripe,callback:function(e){t.$set(t.form,"discripe",e)},expression:"form.discripe"}})],1)],1),t._v(" "),i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"作用","label-width":t.formLabelWidth}},[i("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择权限作用"},model:{value:t.form.is_function,callback:function(e){t.$set(t.form,"is_function",e)},expression:"form.is_function"}},t._l(t.functionList,function(t,e){return i("el-option",{key:e,attrs:{label:t.label,value:t.val}})}),1)],1)],1),t._v(" "),i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"路由","label-width":t.formLabelWidth}},[i("el-input",{attrs:{placeholder:"输入路由",autocomplete:"off"},model:{value:t.form.routing,callback:function(e){t.$set(t.form,"routing",e)},expression:"form.routing"}})],1)],1)],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.addFormVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.addSureFn}},[t._v("确 定")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"修改权限",visible:t.fixFormVisible,width:"800px"},on:{"update:visible":function(e){t.fixFormVisible=e}}},[i("el-form",{attrs:{model:t.form1}},[i("el-row",{attrs:{gutter:20}},[i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"权限","label-width":t.formLabelWidth}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:t.form1.label,callback:function(e){t.$set(t.form1,"label",e)},expression:"form1.label"}})],1)],1),t._v(" "),i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"标识符","label-width":t.formLabelWidth}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:t.form1.discripe,callback:function(e){t.$set(t.form1,"discripe",e)},expression:"form1.discripe"}})],1)],1),t._v(" "),i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"作用","label-width":t.formLabelWidth}},[i("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择权限作用"},model:{value:t.form1.is_function,callback:function(e){t.$set(t.form1,"is_function",e)},expression:"form1.is_function"}},t._l(t.functionList,function(t,e){return i("el-option",{key:e,attrs:{label:t.label,value:t.val}})}),1)],1)],1),t._v(" "),i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"路由","label-width":t.formLabelWidth}},[i("el-input",{attrs:{placeholder:"输入路由",autocomplete:"off"},model:{value:t.form1.routing,callback:function(e){t.$set(t.form1,"routing",e)},expression:"form1.routing"}})],1)],1)],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.fixFormVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.fixSureFn}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=i("VU/8")(u,f,!1,function(t){i("RqYn")},null,null);e.default=d.exports},RqYn:function(t,e){}});
//# sourceMappingURL=14.570fba62849ed9897612.js.map