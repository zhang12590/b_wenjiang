webpackJsonp([11],{"8LlB":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("Xxa5"),a=s.n(n),r=s("exGp"),o=s.n(r),i=s("mvHQ"),l=s.n(i),c=s("sUjr"),u=s("M4fF"),p=s.n(u),d=s("p5Jx"),f={name:"ATheme",data:function(){return{searchInput:"",curSearchInput:"",canSearch:!1,isInSearch:!1,tableData:[],tableData1:[],baseUrl:c.a,toNext:"/reference/element",areaList:[{label:"投资项目",val:"投资项目"},{label:"社会事业",val:"社会事业"},{label:"工商登记",val:"工商登记"}],processVisible:!1,processTitle:"流程信息",formLabelWidth:"120px",form:{name:"",area:"投资项目",seq:"",date2:"",delivery:!1,type:[],resource:"",desc:""},fixThemeFormVisible:!1,form1:{name:"",area:"投资项目",seq:"",date2:"",delivery:!1,type:[],resource:"",desc:""},errorList:[{val:"证明材料及相关资料前后不一致",label:"证明材料及相关资料前后不一致"},{val:"许可审批量化指标不达标",label:"许可审批量化指标不达标"},{val:"现场踏勘不达标",label:"现场踏勘不达标"},{val:"证明材料及相关资料模糊不清，无法辨认",label:"证明材料及相关资料模糊不清，无法辨认"},{val:"相关证件不在有效期或无效",label:"相关证件不在有效期或无效"},{val:"许可审批不在有效期",label:"许可审批不在有效期"},{val:"申请表填写不正确",label:"申请表填写不正确"},{val:"照片不符合要求",label:"照片不符合要求"},{val:"公章加盖不规范",label:"公章加盖不规范"},{val:"其他",label:"其他"}],unpassVisible:!1,checkList:[],textarea3:"",IsTextarea:!1,unpassVisible1:!1,checkList1:[],textarea4:"",IsTextarea1:!1,unpassRow:{},selectThemeIds:[],currentPage3:1,curPageShow:!0,pageSize:0,totalSize:0}},watch:{checkList:function(e){this.checkList=e,e.indexOf("其他")>-1?this.IsTextarea=!0:this.IsTextarea=!1},unpassVisible:function(e){e||(this.checkList=[])}},computed:{},created:function(){var e={page:1,user_id:sessionStorage.user_id};this.getDealFn(e)},methods:{searchFn:p.a.debounce(function(){if(console.log("search"),this.searchInput.replace(/(^\s*)|(\s*$)/g,"")){var e={page:1,param:this.searchInput.replace(/(^\s*)|(\s*$)/g,""),user_id:sessionStorage.user_id||""};this.searchDealFn(e)}else{this.notifyFn("提示","请输入有效查询信息");var t={page:1,user_id:sessionStorage.user_id};this.getDealFn(t)}},500),addThemeSureFn:function(){var e={name:this.form.name.replace(/(^\s*)|(\s*$)/g,""),area:this.form.area.replace(/(^\s*)|(\s*$)/g,""),seq:this.form.seq.replace(/(^\s*)|(\s*$)/g,""),user_id:sessionStorage.user_id};""!==e.name&&""!==e.seq?this.addThemeFn(e):this.notifyFn("提示","请补全信息")},fixThemeSureFn:function(){var e={name:this.form1.name.replace(/(^\s*)|(\s*$)/g,""),area:this.form1.area.replace(/(^\s*)|(\s*$)/g,""),seq:this.form1.seq.replace(/(^\s*)|(\s*$)/g,""),id:this.form1.id,user_id:sessionStorage.user_id};""!==e.name&&""!==e.seq?this.fixThemeFn(e):this.notifyFn("提示","请补全信息")},clearThemesClick:function(){if(this.selectThemeIds.length){var e={id_list:this.selectThemeIds,user_id:sessionStorage.user_id};this.deleteSingleFn(e)}else this.notifyFn("提示","未选择主题")},pass:function(e,t){var s=this;console.log(e,t),this.$confirm(t.current_process+"流程内将通过审核, 是否继续?","通过",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.deal_status="Y",t.user_id=sessionStorage.user_id,s.postIsPassFn(t)}).catch(function(){s.notifyFn("提示","已取消")})},unPass:function(e,t){this.unpassVisible=!0,this.unpassRow=t,console.log(t)},seeProcess:function(e){var t={water_num:e.water_num,user_id:sessionStorage.user_id};this.postProcessInfoFn(t),this.processVisible=!0,console.log(t)},seeMsg:function(e,t){if(console.log(t),""===t.discription)this.notifyFn("提示","没有留言");else{this.unpassVisible1=!0;var s=JSON.parse(t.discription);console.log(s),s.isOther?(s.checks.push("其他"),this.IsTextarea1=!0,this.checkList1=s.checks,this.textarea4=s.msg):(this.IsTextarea1=!1,this.checkList1=s.checks,this.textarea4=s.msg)}},unpassSureFn:function(){var e=this,t={checks:[],isOther:!1,msg:""},s=this.checkList.slice();s.indexOf("其他")>-1?(s.splice(s.indexOf("其他"),1),t={checks:s,isOther:!0,msg:this.textarea3}):t={checks:s,isOther:!1,msg:""};var n=this.unpassRow;this.$confirm(n.current_process+"流程内将不通过审核, 是否继续?","不通过",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.deal_status="N",n.description=l()(t),n.user_id=sessionStorage.user_id,e.unpassVisible=!1,e.postIsPassFn(n)}).catch(function(){e.notifyFn("提示","已取消")})},seeReference:function(e,t){console.log(t);var s=JSON.parse(sessionStorage.reference);s.curTheme=t.subject,s.curMatter=t.item,s.filteredList=[],sessionStorage.reference=l()(s)},handleSizeChange:function(e){console.log("每页 "+e+" 条")},handleCurrentChange:function(e){console.log("当前页: "+e);var t={page:e,param:this.curSearchInput,user_id:sessionStorage.user_id};this.isInSearch?this.searchDealFn(t):this.getDealFn(t)},searchDealFn:function(e){var t=this;return o()(a.a.mark(function s(){var n,r,o,i,l,c,u;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t.$api.unsplash.postSearchDeal(e);case 3:if(n=s.sent,r=[],"0"===n.errno){for(t.isInSearch=!0,t.curSearchInput=t.searchInput.replace(/(^\s*)|(\s*$)/g,""),o=n.data.in_deal.slice(),i=n.data.wait_deal.slice(),t.pageSize=n.data.size,t.totalSize=n.data.total,l=0;l<o.length;l++)o[l].isOpen=!1;for(c=0;c<i.length;c++)i[c].isOpen=!0;r=r.concat(o,i),t.tableData=d.a.addSequence(r),u=t,setTimeout(function(){u.toggleSelection(u.tableData.slice(0,o.length))},300)}else t.notifyFn("提示",n.errmsg);s.next=12;break;case 8:s.prev=8,s.t0=s.catch(0),t.notifyFn("提示","服务器错误"),console.log(s.t0);case 12:case"end":return s.stop()}},s,t,[[0,8]])}))()},getDealFn:function(e){var t=this;return o()(a.a.mark(function s(){var n,r,o,i,l,c,u;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t.$api.unsplash.getDeals(e);case 3:if(n=s.sent,r=[],"0"===n.errno){for(t.isInSearch=!1,t.curSearchInput="",o=n.data.in_deal.slice(),i=n.data.wait_deal.slice(),t.pageSize=n.data.size,t.totalSize=n.data.total,l=0;l<o.length;l++)o[l].isOpen=!1;for(c=0;c<i.length;c++)i[c].isOpen=!0;r=r.concat(o,i),t.tableData=d.a.addSequence(r),u=t,setTimeout(function(){u.toggleSelection(u.tableData.slice(0,o.length))},300)}else t.notifyFn("提示",n.errmsg);s.next=12;break;case 8:s.prev=8,s.t0=s.catch(0),t.notifyFn("提示","服务器错误"),console.log(s.t0);case 12:case"end":return s.stop()}},s,t,[[0,8]])}))()},postProcessInfoFn:function(e){var t=this;return o()(a.a.mark(function s(){var n;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t.$api.unsplash.postProcessInfo(e);case 3:n=s.sent,console.log(1,n),"0"===n.errno?(t.processTitle=n.data[0].water_num+" - 流程信息",t.tableData1=n.data,t.tableData1=d.a.addSequence(t.tableData1)):t.notifyFn("提示",n.errmsg),s.next=12;break;case 8:s.prev=8,s.t0=s.catch(0),t.notifyFn("提示","服务器错误"),console.log(s.t0);case 12:case"end":return s.stop()}},s,t,[[0,8]])}))()},handleSelectionChange:function(e,t){console.log(12,e,t);for(var s=[],n=0;n<e.length;n++)s.push(e[n].index);if(s.indexOf(t.index)>-1){var a={water_num:t.water_num,user_id:sessionStorage.user_id};this.postActiveFn(a),this.tableData[t.index-1].isOpen=!1}else{var r={water_num:t.water_num,user_id:sessionStorage.user_id};this.postUnActiveFn(r),this.tableData[t.index-1].isOpen=!0}},selectAllFn:function(e){console.log(e),this.$refs.multipleTable.clearSelection()},postActiveFn:function(e){var t=this;return o()(a.a.mark(function s(){var n;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t.$api.unsplash.postActive(e);case 3:"0"===(n=s.sent).errno?t.notifyFn("提示","激活所选任务","success"):"4003"===n.errno?t.notifyFn("提示","所选任务被"+n.user.name+"激活"):t.notifyFn("提示",n.errmsg),s.next=11;break;case 7:s.prev=7,s.t0=s.catch(0),t.notifyFn("提示","服务器错误"),console.log(s.t0);case 11:case"end":return s.stop()}},s,t,[[0,7]])}))()},postUnActiveFn:function(e){var t=this;return o()(a.a.mark(function s(){var n;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t.$api.unsplash.postUnActive(e);case 3:n=s.sent,console.log(1,n),"0"===n.errno?t.notifyFn("提示","该任务撤销激活状态","success"):t.notifyFn("提示",n.errmsg),s.next=12;break;case 8:s.prev=8,s.t0=s.catch(0),t.notifyFn("提示","服务器错误"),console.log(s.t0);case 12:case"end":return s.stop()}},s,t,[[0,8]])}))()},postIsPassFn:function(e){var t=this;return o()(a.a.mark(function s(){var n,r;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t.$api.unsplash.postIsPass(e);case 3:n=s.sent,console.log(1,n),"0"===n.errno?("Y"===e.deal_status?t.notifyFn("提示","完成流水号："+e.water_num+"在"+e.current_process+"流程的任务","success"):t.notifyFn("提示","流水号："+e.water_num+"在"+e.current_process+"流程中未通过","success"),r={page:1,user_id:sessionStorage.user_id},t.getDealFn(r)):t.notifyFn("提示",n.errmsg),s.next=12;break;case 8:s.prev=8,s.t0=s.catch(0),t.notifyFn("提示","服务器错误"),console.log(s.t0);case 12:case"end":return s.stop()}},s,t,[[0,8]])}))()},headerCellStyle:function(e){e.row,e.column;var t=e.rowIndex;e.columnIndex;if(t>-1)return{"text-align":"center"}},cellStyle:function(e){e.row,e.column,e.rowIndex;if(e.columnIndex>=0)return{"text-align":"center"}},myAlert:function(e,t,s){s.$alert(e,t,{confirmButtonText:"确定",callback:function(e){}})},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},notifyFn:function(e,t){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"warning";this.$notify({title:e,message:t,type:s,dangerouslyUseHTMLString:!0,duration:5e3,position:"top-right"})}}},h={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"deal"},[s("el-row",{staticClass:"functionalArea",attrs:{gutter:20}},[s("el-col",{attrs:{span:6,offset:18}},[s("el-input",{attrs:{placeholder:"请输入内容",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchFn(t)}},model:{value:e.searchInput,callback:function(t){e.searchInput=t},expression:"searchInput"}},[s("template",{slot:"append"},[s("el-button",{attrs:{disabled:e.canSearch,type:"success",plain:""},on:{click:e.searchFn}},[e._v("搜索")])],1)],2)],1)],1),e._v(" "),s("el-table",{ref:"multipleTable",staticClass:"elTableOne",staticStyle:{width:"100%"},attrs:{data:e.tableData,"header-cell-style":e.headerCellStyle,"cell-style":e.cellStyle},on:{select:e.handleSelectionChange,"select-all":e.selectAllFn}},[s("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),s("el-table-column",{attrs:{label:"序号",width:"60"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.index))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"流水号",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-popover",{attrs:{trigger:"hover",placement:"top"}},[s("p",[e._v("票号: "+e._s(t.row.number))]),e._v(" "),s("p",[e._v("主题: "+e._s(t.row.subject))]),e._v(" "),s("p",[e._v("身份证: "+e._s(t.row.idno))]),e._v(" "),s("p",[e._v("流程:\n            "),e._l(t.row.process.split("-"),function(n,a){return s("span",{key:a},[s("span",{class:{curProcess:n===t.row.current_process}},[e._v(e._s(n))]),s("span",{directives:[{name:"show",rawName:"v-show",value:a!==t.row.process.split("-").length-1,expression:"index !== scope.row.process.split('-').length-1"}]},[e._v("-")])])})],2),e._v(" "),s("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[s("el-tag",{staticStyle:{cursor:"pointer"},attrs:{size:"medium",title:"点击查看流程追踪信息",type:t.row.current_process_used_time>t.row.current_process_timeout?"danger":""},on:{click:function(s){return e.seeProcess(t.row)}}},[e._v(e._s(t.row.water_num))])],1)])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"事项",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.item))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"申请人/申请单位",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.p_name))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"申请项目",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.p_project))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"总用时(小时)",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-popover",{attrs:{trigger:"hover",placement:"top"}},[s("p",[e._v("事项时限: "+e._s(t.row.timeout)+"小时")]),e._v(" "),s("p",[e._v("事项已用时: "+e._s(Math.floor(1e3*t.row.totle_used_time)/1e3)+"小时")]),e._v(" "),s("p",{directives:[{name:"show",rawName:"v-show",value:t.row.totle_used_time>t.row.timeout,expression:"scope.row.totle_used_time > scope.row.timeout"}],staticStyle:{color:"red"}},[e._v("事项已超时: "+e._s(Math.floor(1e3*(t.row.totle_used_time-t.row.timeout))/1e3)+"小时")]),e._v(" "),s("p",[e._v("流程时限: "+e._s(t.row.current_process_timeout)+"小时")]),e._v(" "),s("p",[e._v("流程已用时: "+e._s(Math.floor(1e3*t.row.current_process_used_time)/1e3)+"小时")]),e._v(" "),s("p",{directives:[{name:"show",rawName:"v-show",value:t.row.current_process_used_time>t.row.current_process_timeout,expression:"scope.row.current_process_used_time > scope.row.current_process_timeout"}],staticStyle:{color:"red"}},[e._v("流程已超时: "+e._s(Math.floor(1e3*(t.row.current_process_used_time-t.row.current_process_timeout))/1e3)+"小时")]),e._v(" "),s("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[s("el-tag",{attrs:{size:"medium",type:t.row.totle_used_time>t.row.timeout?"danger":""}},[e._v(e._s(Math.floor(1e3*t.row.totle_used_time)/1e3))])],1)])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"操作","min-width":"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{title:"合格",size:"mini",icon:"el-icon-check",circle:"",disabled:t.row.isOpen},on:{click:function(s){return e.pass(t.$index,t.row)}}}),e._v(" "),s("el-button",{attrs:{title:"不合格",size:"mini",type:"danger",icon:"el-icon-close",circle:"",disabled:t.row.isOpen},on:{click:function(s){return e.unPass(t.$index,t.row)}}}),e._v(" "),s("router-link",{attrs:{to:e.toNext}},[s("el-button",{attrs:{title:"查阅",size:"mini",icon:"el-icon-view",circle:"",disabled:t.row.isOpen},on:{click:function(s){return e.seeReference(t.$index,t.row)}}})],1)]}}])})],1),e._v(" "),s("div",{staticClass:"block pagination"},[e.curPageShow?s("el-pagination",{attrs:{"current-page":e.currentPage3,"page-size":e.pageSize,layout:"prev, pager, next, jumper",total:e.totalSize},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage3=t},"update:current-page":function(t){e.currentPage3=t}}}):e._e()],1),e._v(" "),s("el-dialog",{attrs:{title:e.processTitle,visible:e.processVisible,width:"80%"},on:{"update:visible":function(t){e.processVisible=t}}},[s("el-table",{ref:"multipleTable1",staticStyle:{width:"100%"},attrs:{data:e.tableData1,"header-cell-style":e.headerCellStyle,"cell-style":e.cellStyle}},[s("el-table-column",{attrs:{label:"序号",width:"60"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.index))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"流程",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.current_process))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"处理人",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.user))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"收到时间",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.starts))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"处理时间",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.ends))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"处理状态",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return["Y"===t.row.result?s("span",[e._v("通过")]):e._e(),e._v(" "),"N"===t.row.result?s("span",{staticStyle:{color:"red"}},[e._v("未通过")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"操作","min-width":"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(s){return e.seeMsg(t.$index,t.row)}}},[e._v("查看留言")])]}}])})],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(t){e.processVisible=!1}}},[e._v("确 定")])],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"备注未通过原因",visible:e.unpassVisible,width:"800px"},on:{"update:visible":function(t){e.unpassVisible=t}}},[s("div",[e._v("备注：选择“其他”时，可以手输未通过原因")]),e._v(" "),s("el-checkbox-group",{model:{value:e.checkList,callback:function(t){e.checkList=t},expression:"checkList"}},[s("el-row",e._l(e.errorList,function(e,t){return s("el-col",{key:t,staticClass:"checkBox",attrs:{span:12}},[s("el-checkbox",{attrs:{label:e.label,val:e.val}})],1)}),1)],1),e._v(" "),e.IsTextarea?s("el-input",{staticClass:"textArea",attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入未通过原因"},model:{value:e.textarea3,callback:function(t){e.textarea3=t},expression:"textarea3"}}):e._e(),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.unpassVisible=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.unpassSureFn}},[e._v("确 定")])],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"查看未通过原因",visible:e.unpassVisible1,width:"800px"},on:{"update:visible":function(t){e.unpassVisible1=t}}},[s("div",[e._v("备注：选择“其他”时，可以手输未通过原因")]),e._v(" "),s("el-checkbox-group",{model:{value:e.checkList1,callback:function(t){e.checkList1=t},expression:"checkList1"}},[s("el-row",e._l(e.errorList,function(e,t){return s("el-col",{key:t,staticClass:"checkBox",attrs:{span:12}},[s("el-checkbox",{attrs:{label:e.label,val:e.val,disabled:""}})],1)}),1)],1),e._v(" "),e.IsTextarea1?s("el-input",{staticClass:"textArea",attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入未通过原因",disabled:""},model:{value:e.textarea4,callback:function(t){e.textarea4=t},expression:"textarea4"}}):e._e(),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(t){e.unpassVisible1=!1}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var _=s("VU/8")(f,h,!1,function(e){s("MFHl")},null,null);t.default=_.exports},MFHl:function(e,t){}});
//# sourceMappingURL=11.dbc0b48227f2a07b61eb.js.map