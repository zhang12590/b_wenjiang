webpackJsonp([16],{"O1+N":function(t,e){},tB7y:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("Xxa5"),i=n.n(o),l=n("exGp"),a=n.n(l),r=n("//Fk"),s=n.n(r),c={name:"ATheme",data:function(){return{searchInput:"",tableData:[],jurisdictionData:[],themeList:[],addFormVisible:!1,formLabelWidth:"120px",form:{location:"",subject_id:"",addr:""},fixFormVisible:!1,form1:{location:"",subject_id:"",addr:"",id:""},selectIds:[],notifyPromise:s.a.resolve()}},watch:{},created:function(){this.getThemeFn(),this.getWindowFn()},methods:{addBtnFn:function(){this.addFormVisible=!0},addSureFn:function(){var t={addr:this.form.addr.replace(/(^\s*)|(\s*$)/g,""),location:this.form.location.replace(/(^\s*)|(\s*$)/g,""),subject_id:this.form.subject_id,user_id:sessionStorage.user_id};""!==t.addr&&""!==t.location&&""!==t.subject_id?this.addFn(t):(""===t.addr&&this.notifyFn("提示","地点输入有误"),""===t.location&&this.notifyFn("提示","窗口位置输入有误"),""===t.subject_id&&this.notifyFn("提示","请选择主题"))},notifyFn:function(t,e){var n=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"warning";this.notifyPromise=this.notifyPromise.then(this.$nextTick).then(function(){n.$notify({title:t,message:e,type:o,dangerouslyUseHTMLString:!0,duration:5e3,position:"top-right"})})},handleEdit:function(t,e){console.log(t,e),this.fixFormVisible=!0,this.form1.location=e.location,this.form1.addr=e.addr;var n="";this.themeList.forEach(function(t,o){t.label===e.subject&&(n=t.val)}),this.form1.subject_id=n,this.form1.id=e.id},fixSureFn:function(){var t={id:this.form1.id,addr:this.form1.addr.replace(/(^\s*)|(\s*$)/g,""),location:this.form1.location.replace(/(^\s*)|(\s*$)/g,""),subject_id:this.form1.subject_id,user_id:sessionStorage.user_id};""!==t.name&&""!==t.seq?this.fixFn(t):(""===t.addr&&this.notifyFn("提示","地点输入有误"),""===t.location&&this.notifyFn("提示","窗口位置输入有误"),""===t.subject_id&&this.notifyFn("提示","请选择主题"))},clearBtnFn:function(){var t=this;this.selectIds.length?this.$confirm("确定删除所选窗口","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e={id_list:t.selectIds,user_id:sessionStorage.user_id};t.deleteSingleFn(e)}).catch(function(){t.notifyFn("提示","已取消删除")}):this.notifyFn("提示","未选择窗口")},handleDelete:function(t,e){var n=this;console.log(e),this.$confirm("确定删除窗口："+e.location,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t={id_list:[e.id],user_id:sessionStorage.user_id};n.deleteSingleFn(t)}).catch(function(){n.notifyFn("提示","已取消删除")})},getThemeFn:function(){var t=this;return a()(i.a.mark(function e(){var n,o,l;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={},e.next=4,t.$api.unsplash.getSubjects(n);case 4:if(o=e.sent,console.log(o),t.themeList=[],"0"===o.errno)for(l=0;l<o.data.subjects.length;l++)t.themeList.push({label:o.data.subjects[l].name,val:o.data.subjects[l].id});else t.notifyFn("提示",o.errmsg);e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),t.notifyFn("提示","服务器错误"),console.log(e.t0);case 14:case"end":return e.stop()}},e,t,[[0,10]])}))()},getWindowFn:function(){var t=this;return a()(i.a.mark(function e(){var n,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n={},e.prev=1,e.next=4,t.$api.unsplash.getWindow(n);case 4:o=e.sent,console.log(o),"0"===o.errno?t.tableData=t.addSequence(o.data):t.notifyFn("提示","获取窗口失败"),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),t.notifyFn("提示","服务器错误"),console.log(e.t0);case 13:case"end":return e.stop()}},e,t,[[1,9]])}))()},addFn:function(t){var e=this;return a()(i.a.mark(function n(){return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.$api.unsplash.postAddWindow(t);case 3:"0"===n.sent.errno?(e.addFormVisible=!1,e.notifyFn("提示","增加窗口成功"),e.getWindowFn()):e.notifyFn("提示","增加窗口失败"),n.next=11;break;case 7:n.prev=7,n.t0=n.catch(0),e.notifyFn("提示","服务器错误"),console.log(n.t0);case 11:case"end":return n.stop()}},n,e,[[0,7]])}))()},fixFn:function(t){var e=this;return a()(i.a.mark(function n(){return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.$api.unsplash.postfixWindow(t);case 3:"0"===n.sent.errno?(e.fixFormVisible=!1,e.notifyFn("提示","修改窗口成功"),e.getWindowFn()):e.notifyFn("提示","修改窗口失败"),n.next=11;break;case 7:n.prev=7,n.t0=n.catch(0),e.notifyFn("提示","服务器错误"),console.log(n.t0);case 11:case"end":return n.stop()}},n,e,[[0,7]])}))()},deleteSingleFn:function(t){var e=this;return a()(i.a.mark(function n(){return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.$api.unsplash.postClearWindow(t);case 3:"0"===n.sent.errno?(e.notifyFn("提示","删除成功"),e.selectIds=[],e.getWindowFn()):e.notifyFn("提示","删除失败"),n.next=11;break;case 7:n.prev=7,n.t0=n.catch(0),e.notifyFn("提示","服务器错误"),console.log(n.t0);case 11:case"end":return n.stop()}},n,e,[[0,7]])}))()},handleSelectionChange:function(t,e){console.log(t),this.selectIds=[];for(var n=0;n<t.length;n++)this.selectIds.push(t[n].id)},selectAllFn:function(t){console.log(t),this.selectIds=[];for(var e=0;e<t.length;e++)this.selectIds.push(t[e].id)},headerCellStyle:function(t){t.row,t.column;var e=t.rowIndex;t.columnIndex;if(e>-1)return{"text-align":"center"}},cellStyle:function(t){t.row,t.column,t.rowIndex;if(t.columnIndex>=0)return{"text-align":"center"}},myAlert:function(t,e,n){n.$alert(t,e,{confirmButtonText:"确定",callback:function(t){}})},addSequence:function(t){for(var e=0;e<t.length;e++)t[e].index=e+1;return t}}},d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"role"},[n("el-row",{staticClass:"functionalArea",attrs:{gutter:20}},[n("el-col",{attrs:{span:6}},[n("el-button-group",[n("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:t.addBtnFn}}),t._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-share"}}),t._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-delete"},on:{click:t.clearBtnFn}})],1)],1),t._v(" "),n("el-col",{attrs:{span:6,offset:12}},[n("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:t.searchInput,callback:function(e){t.searchInput=e},expression:"searchInput"}},[n("template",{slot:"append"},[n("el-button",{attrs:{type:"success",plain:""}},[t._v("搜索")])],1)],2)],1)],1),t._v(" "),n("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,"header-cell-style":t.headerCellStyle,"cell-style":t.cellStyle},on:{select:t.handleSelectionChange,"select-all":t.selectAllFn}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),n("el-table-column",{attrs:{label:"序号",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.index))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"窗口位置",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.location))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"主题",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.subject))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"地点",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.addr))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作","min-width":"240"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return t.handleDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),n("el-dialog",{attrs:{title:"添加窗口",visible:t.addFormVisible,width:"800px"},on:{"update:visible":function(e){t.addFormVisible=e}}},[n("el-form",{attrs:{model:t.form}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"窗口位置","label-width":t.formLabelWidth}},[n("el-input",{attrs:{placeholder:"请输入窗口",autocomplete:"off"},model:{value:t.form.location,callback:function(e){t.$set(t.form,"location",e)},expression:"form.location"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"地点","label-width":t.formLabelWidth}},[n("el-input",{attrs:{placeholder:"请输入地点",autocomplete:"off"},model:{value:t.form.addr,callback:function(e){t.$set(t.form,"addr",e)},expression:"form.addr"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"主题","label-width":t.formLabelWidth}},[n("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择部门"},model:{value:t.form.subject_id,callback:function(e){t.$set(t.form,"subject_id",e)},expression:"form.subject_id"}},t._l(t.themeList,function(t,e){return n("el-option",{key:e,attrs:{label:t.label,value:t.val}})}),1)],1)],1)],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.addFormVisible=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.addSureFn}},[t._v("确 定")])],1)],1),t._v(" "),n("el-dialog",{attrs:{title:"编辑窗口",visible:t.fixFormVisible,width:"800px"},on:{"update:visible":function(e){t.fixFormVisible=e}}},[n("el-form",{attrs:{model:t.form1}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"窗口位置","label-width":t.formLabelWidth}},[n("el-input",{attrs:{placeholder:"请输入窗口",autocomplete:"off"},model:{value:t.form1.location,callback:function(e){t.$set(t.form1,"location",e)},expression:"form1.location"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"地点","label-width":t.formLabelWidth}},[n("el-input",{attrs:{placeholder:"请输入地点",autocomplete:"off"},model:{value:t.form1.addr,callback:function(e){t.$set(t.form1,"addr",e)},expression:"form1.addr"}})],1)],1),t._v(" "),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"主题","label-width":t.formLabelWidth}},[n("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择部门"},model:{value:t.form1.subject_id,callback:function(e){t.$set(t.form1,"subject_id",e)},expression:"form1.subject_id"}},t._l(t.themeList,function(t,e){return n("el-option",{key:e,attrs:{label:t.label,value:t.val}})}),1)],1)],1)],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.fixFormVisible=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.fixSureFn}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var u=n("VU/8")(c,d,!1,function(t){n("O1+N")},null,null);e.default=u.exports}});
//# sourceMappingURL=16.deac3b4ad5f148f98232.js.map