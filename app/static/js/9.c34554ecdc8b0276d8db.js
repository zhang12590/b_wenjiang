webpackJsonp([9],{"gvo/":function(e,t){},rBDB:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=n("Xxa5"),i=n.n(l),r=n("mvHQ"),s=n.n(r),o=n("exGp"),c=n.n(o),a={name:"ServiceElement",data:function(){return{userIfon:{},curElementList:[],multipleSelection:[],curSeleckRow:[],selectionElementId:[],curMatter:"",allID:[]}},watch:{},created:function(){sessionStorage.userInfo?this.userIfon=JSON.parse(sessionStorage.userInfo):console.log("call-无用户信息");if(sessionStorage.reference){var e=JSON.parse(sessionStorage.reference);this.curMatter=e.curMatter,this.selectionElementId=e.selectionElementId,e.curTheme?e.curMatter?this.getElement():this.$alert("未选择事项","警告",{confirmButtonText:"确定",callback:function(e){}}):this.$alert("未选择主题","警告",{confirmButtonText:"确定",callback:function(e){}})}},mounted:function(){},updated:function(){console.log(12321);var e=[];this.curSeleckRow=[],this.toggleSelection(e);for(var t=0;t<this.curElementList.length;t++)this.selectionElementId.indexOf(""+this.curElementList[t].id)>-1&&(e.push(this.curElementList[t]),this.curSeleckRow.push(this.curElementList[t].index));this.toggleSelection(e)},methods:{getElement:function(){var e=this;return c()(i.a.mark(function t(){var n,l,r,o,c;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n={item:e.curMatter},t.next=4,e.$api.unsplash.postElements(n);case 4:if("0"===(l=t.sent).errno){for(r=l.data,e.allID=[],o=0;o<r.length;o++)r[o].index=o+1,e.allID.push(r[o].id);e.curElementList=r,(c=JSON.parse(sessionStorage.reference)).allID=e.allID,sessionStorage.reference=s()(c),console.log(r)}else e.notifyFn("提示",l.errmsg);t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),e.notifyFn("提示","服务器错误"),console.log(t.t0);case 12:case"end":return t.stop()}},t,e,[[0,8]])}))()},reviewClickFn:function(e){var t=this;return c()(i.a.mark(function n(){var l,r;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,l=e,n.next=4,t.$api.unsplash.reviewClick(l);case 4:r=n.sent,console.log(r),"0"===r.errno||t.notifyFn("提示",r.errmsg),n.next=13;break;case 9:n.prev=9,n.t0=n.catch(0),t.notifyFn("提示","服务器错误"),console.log(n.t0);case 13:case"end":return n.stop()}},n,t,[[0,9]])}))()},headerCellStyle:function(e){e.row,e.column;var t=e.rowIndex;e.columnIndex;if(t>-1)return{"text-align":"center"}},cellStyle:function(e){e.row,e.column,e.rowIndex;var t=e.columnIndex;return 0===t||1===t?{"text-align":"center"}:1===t?{}:void 0},handleSelectionChange:function(e,t){this.multipleSelection=e,this.curSeleckRow=[],this.selectionElementId=[];for(var n=0;n<this.multipleSelection.length;n++)this.curSeleckRow.push(this.multipleSelection[n].index),this.selectionElementId.push(""+this.multipleSelection[n].id);var l=JSON.parse(sessionStorage.reference);if(l.selectionElementId=this.selectionElementId,l.allID=this.allID,sessionStorage.reference=s()(l),"大厅"===this.userIfon.role){var i={itemreviews:this.curElementList,current_click:t.id,reviewsclick:this.selectionElementId.join("-"),lingpai:localStorage.lingpai,user_id:sessionStorage.user_id};this.reviewClickFn(i)}},selectAllFn:function(e){this.multipleSelection=e,this.curSeleckRow=[],this.selectionElementId=[];for(var t=0;t<this.multipleSelection.length;t++)this.curSeleckRow.push(this.multipleSelection[t].index),this.selectionElementId.push(""+this.multipleSelection[t].id);var n=JSON.parse(sessionStorage.reference);if(n.selectionElementId=this.selectionElementId,n.allID=this.allID,sessionStorage.reference=s()(n),"大厅"===this.userIfon.role){var l={itemreviews:this.curElementList,current_click:Math.min.apply(null,this.allID),reviewsclick:this.selectionElementId.join("-"),lingpai:localStorage.lingpai,user_id:sessionStorage.user_id};this.reviewClickFn(l)}},tableRowClassName:function(e){e.row;var t=e.rowIndex;return this.curSeleckRow.indexOf(t+1)>-1?"warning-row-element":""},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},notifyFn:function(e,t){this.$notify({title:e,message:t,type:"warning",dangerouslyUseHTMLString:!0,duration:5e3,position:"top-right"})}}},u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"elementT"}},[n("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.curElementList,"tooltip-effect":"dark","row-class-name":e.tableRowClassName,"header-cell-style":e.headerCellStyle,"cell-style":e.cellStyle},on:{select:e.handleSelectionChange,"select-all":e.selectAllFn}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),n("el-table-column",{attrs:{prop:"index",label:"序号",width:"60"}}),e._v(" "),n("el-table-column",{attrs:{prop:"name",label:"材料清单",width:"320"}}),e._v(" "),n("el-table-column",{attrs:{prop:"require",label:"材料准备要求",width:"200"}}),e._v(" "),n("el-table-column",{attrs:{prop:"permit",label:"审查要点","min-width":"300"}}),e._v(" "),n("el-table-column",{attrs:{label:"需查看的流程",width:"280"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-tag",{directives:[{name:"show",rawName:"v-show",value:t.row.steps.length,expression:"scope.row.steps.length"}],attrs:{size:"medium"}},[e._v(e._s(t.row.steps.join("-")))])]}}])})],1)],1)},staticRenderFns:[]};var h=n("VU/8")(a,u,!1,function(e){n("gvo/")},null,null);t.default=h.exports}});
//# sourceMappingURL=9.c34554ecdc8b0276d8db.js.map