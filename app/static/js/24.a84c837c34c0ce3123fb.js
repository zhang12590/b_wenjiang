webpackJsonp([24],{LIyP:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("Xxa5"),r=n.n(s),o=n("exGp"),a=n.n(o),i=n("//Fk"),l=n.n(i),c={name:"ATheme",data:function(){return{searchInput:"",tableData:[],jurisdictionData:[],addFormVisible:!1,formLabelWidth:"120px",form:{name:"",seq:""},fixFormVisible:!1,form1:{name:"",seq:"",id:""},selectIds:[],notifyPromise:l.a.resolve()}},watch:{},created:function(){this.getAddressFn()},methods:{addBtnFn:function(){this.addFormVisible=!0},addSureFn:function(){var e={name:this.form.name.replace(/(^\s*)|(\s*$)/g,""),seq:this.form.seq.replace(/(^\s*)|(\s*$)/g,""),user_id:sessionStorage.user_id};""!==e.name&&""!==e.seq?this.addFn(e):(""===e.seq&&this.notifyFn("提示","代号输入有误"),""===e.name&&this.notifyFn("提示","地址输入有误"))},notifyFn:function(e,t){var n=this,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"warning";this.notifyPromise=this.notifyPromise.then(this.$nextTick).then(function(){n.$notify({title:e,message:t,type:s,dangerouslyUseHTMLString:!0,duration:5e3,position:"top-right"})})},handleEdit:function(e,t){console.log(e,t),this.fixFormVisible=!0,this.form1.name=t.name,this.form1.seq=t.seq,this.form1.id=t.id},fixSureFn:function(){var e={id:this.form1.id,name:this.form1.name.replace(/(^\s*)|(\s*$)/g,""),seq:this.form1.seq.replace(/(^\s*)|(\s*$)/g,""),user_id:sessionStorage.user_id};""!==e.name&&""!==e.seq?this.fixFn(e):(""===e.seq&&this.notifyFn("提示","代号输入有误"),""===e.name&&this.notifyFn("提示","地址输入有误"))},clearBtnFn:function(){var e=this;this.selectIds.length?this.$confirm("确定删除所选地址","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t={id_list:e.selectIds,user_id:sessionStorage.user_id};e.deleteSingleFn(t)}).catch(function(){e.notifyFn("提示","已取消删除")}):this.notifyFn("提示","未选择地址")},handleDelete:function(e,t){var n=this;console.log(t),this.$confirm("确定删除地址："+t.name,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e={id_list:[t.id],user_id:sessionStorage.user_id};n.deleteSingleFn(e)}).catch(function(){n.notifyFn("提示","已取消删除")})},getAddressFn:function(){var e=this;return a()(r.a.mark(function t(){var n,s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={},t.prev=1,t.next=4,e.$api.unsplash.getAddress(n);case 4:"0"===(s=t.sent).errno?e.tableData=e.addSequence(s.data.addrs):e.notifyFn("提示","获取地址失败"),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(1),e.notifyFn("提示","服务器错误"),console.log(t.t0);case 12:case"end":return t.stop()}},t,e,[[1,8]])}))()},addFn:function(e){var t=this;return a()(r.a.mark(function n(){var s;return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$api.unsplash.postAddAddress(e);case 3:"0"===(s=n.sent).errno?(t.addFormVisible=!1,t.notifyFn("提示","增加地址成功","success"),t.getAddressFn()):t.notifyFn("提示",s.errmsg),n.next=11;break;case 7:n.prev=7,n.t0=n.catch(0),t.notifyFn("提示","服务器错误"),console.log(n.t0);case 11:case"end":return n.stop()}},n,t,[[0,7]])}))()},fixFn:function(e){var t=this;return a()(r.a.mark(function n(){var s;return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$api.unsplash.postfixAddress(e);case 3:"0"===(s=n.sent).errno?(t.fixFormVisible=!1,t.notifyFn("提示","修改地址成功","success"),t.getAddressFn()):t.notifyFn("提示",s.errmsg),n.next=11;break;case 7:n.prev=7,n.t0=n.catch(0),t.notifyFn("提示","服务器错误"),console.log(n.t0);case 11:case"end":return n.stop()}},n,t,[[0,7]])}))()},deleteSingleFn:function(e){var t=this;return a()(r.a.mark(function n(){var s;return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$api.unsplash.postClearAddress(e);case 3:"0"===(s=n.sent).errno?(t.notifyFn("提示","删除成功","success"),t.selectIds=[],t.getAddressFn()):t.notifyFn("提示",s.errmsg),n.next=11;break;case 7:n.prev=7,n.t0=n.catch(0),t.notifyFn("提示","服务器错误"),console.log(n.t0);case 11:case"end":return n.stop()}},n,t,[[0,7]])}))()},handleSelectionChange:function(e,t){console.log(e),this.selectIds=[];for(var n=0;n<e.length;n++)this.selectIds.push(e[n].id)},selectAllFn:function(e){console.log(e),this.selectIds=[];for(var t=0;t<e.length;t++)this.selectIds.push(e[t].id)},headerCellStyle:function(e){e.row,e.column;var t=e.rowIndex;e.columnIndex;if(t>-1)return{"text-align":"center"}},cellStyle:function(e){e.row,e.column,e.rowIndex;if(e.columnIndex>=0)return{"text-align":"center"}},myAlert:function(e,t,n){n.$alert(e,t,{confirmButtonText:"确定",callback:function(e){}})},addSequence:function(e){for(var t=0;t<e.length;t++)e[t].index=t+1;return e}}},u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hallAddress"},[n("el-row",{staticClass:"functionalArea",attrs:{gutter:20}},[n("el-col",{attrs:{span:6}},[n("el-button-group",[n("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.addBtnFn}}),e._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-share"}}),e._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-delete"},on:{click:e.clearBtnFn}})],1)],1),e._v(" "),n("el-col",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{span:6,offset:12}},[n("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:e.searchInput,callback:function(t){e.searchInput=t},expression:"searchInput"}},[n("template",{slot:"append"},[n("el-button",{attrs:{type:"success",plain:""}},[e._v("搜索")])],1)],2)],1)],1),e._v(" "),n("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"header-cell-style":e.headerCellStyle,"cell-style":e.cellStyle},on:{select:e.handleSelectionChange,"select-all":e.selectAllFn}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),n("el-table-column",{attrs:{label:"序号",width:"60"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.index))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"地址",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"代号",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.seq))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作","min-width":"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),n("el-dialog",{attrs:{title:"添加地址",visible:e.addFormVisible,width:"800px"},on:{"update:visible":function(t){e.addFormVisible=t}}},[n("el-form",{attrs:{model:e.form}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"地址","label-width":e.formLabelWidth}},[n("el-input",{attrs:{placeholder:"请输入地址",autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"代号","label-width":e.formLabelWidth}},[n("el-input",{attrs:{placeholder:"请输入代号",autocomplete:"off"},model:{value:e.form.seq,callback:function(t){e.$set(e.form,"seq",t)},expression:"form.seq"}})],1)],1)],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.addFormVisible=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.addSureFn}},[e._v("确 定")])],1)],1),e._v(" "),n("el-dialog",{attrs:{title:"编辑地址",visible:e.fixFormVisible,width:"800px"},on:{"update:visible":function(t){e.fixFormVisible=t}}},[n("el-form",{attrs:{model:e.form1}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"地址","label-width":e.formLabelWidth}},[n("el-input",{attrs:{placeholder:"请输入地址",autocomplete:"off"},model:{value:e.form1.name,callback:function(t){e.$set(e.form1,"name",t)},expression:"form1.name"}})],1)],1),e._v(" "),n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"代号","label-width":e.formLabelWidth}},[n("el-input",{attrs:{placeholder:"请输入代号",autocomplete:"off"},model:{value:e.form1.seq,callback:function(t){e.$set(e.form1,"seq",t)},expression:"form1.seq"}})],1)],1)],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.fixFormVisible=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.fixSureFn}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=n("VU/8")(c,u,!1,function(e){n("nlbL")},null,null);t.default=d.exports},nlbL:function(e,t){}});
//# sourceMappingURL=24.a84c837c34c0ce3123fb.js.map