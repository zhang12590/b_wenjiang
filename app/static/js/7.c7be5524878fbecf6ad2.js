webpackJsonp([7],{"8LlB":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("Xxa5"),n=s.n(a),r=s("exGp"),i=s.n(r),l=s("mvHQ"),c=s.n(l),o=s("sUjr"),u=s("p5Jx"),p={name:"ATheme",data:function(){return{searchInput:"",tableData:[],tableData1:[],baseUrl:o.a,toNext:"/reference/element",areaList:[{label:"投资项目",val:"投资项目"},{label:"社会事业",val:"社会事业"},{label:"工商登记",val:"工商登记"}],processVisible:!1,formLabelWidth:"120px",form:{name:"",area:"投资项目",seq:"",date2:"",delivery:!1,type:[],resource:"",desc:""},fixThemeFormVisible:!1,form1:{name:"",area:"投资项目",seq:"",date2:"",delivery:!1,type:[],resource:"",desc:""},errorList:[{val:"证明材料及相关资料前后不一致",label:"证明材料及相关资料前后不一致"},{val:"许可审批量化指标不达标",label:"许可审批量化指标不达标"},{val:"现场踏勘不达标",label:"现场踏勘不达标"},{val:"证明材料及相关资料模糊不清，无法辨认",label:"证明材料及相关资料模糊不清，无法辨认"},{val:"相关证件不在有效期或无效",label:"相关证件不在有效期或无效"},{val:"许可审批不在有效期",label:"许可审批不在有效期"},{val:"申请表填写不正确",label:"申请表填写不正确"},{val:"照片不符合要求",label:"照片不符合要求"},{val:"公章加盖不规范",label:"公章加盖不规范"},{val:"其他",label:"其他"}],unpassVisible:!1,checkList:[],textarea3:"",IsTextarea:!1,unpassVisible1:!1,checkList1:[],textarea4:"",IsTextarea1:!1,unpassRow:{},selectThemeIds:[],currentPage3:1,curPageShow:!0,pageSize:0,totalSize:0}},watch:{checkList:function(e){this.checkList=e,e.indexOf("其他")>-1?this.IsTextarea=!0:this.IsTextarea=!1},unpassVisible:function(e){e||(this.checkList=[])}},created:function(){var e={page:1,user_id:sessionStorage.user_id};this.getDealFn(e)},methods:{addThemeSureFn:function(){var e={name:this.form.name.replace(/(^\s*)|(\s*$)/g,""),area:this.form.area.replace(/(^\s*)|(\s*$)/g,""),seq:this.form.seq.replace(/(^\s*)|(\s*$)/g,""),user_id:sessionStorage.user_id};""!==e.name&&""!==e.seq?this.addThemeFn(e):this.$message({type:"warning",message:"请补全信息!"})},fixThemeSureFn:function(){var e={name:this.form1.name.replace(/(^\s*)|(\s*$)/g,""),area:this.form1.area.replace(/(^\s*)|(\s*$)/g,""),seq:this.form1.seq.replace(/(^\s*)|(\s*$)/g,""),id:this.form1.id,user_id:sessionStorage.user_id};""!==e.name&&""!==e.seq?this.fixThemeFn(e):this.$message({type:"warning",message:"请补全信息!"})},clearThemesClick:function(){if(this.selectThemeIds.length){var e={id_list:this.selectThemeIds,user_id:sessionStorage.user_id};this.deleteSingleFn(e)}else this.$message({type:"warning",message:"未选择主题!"})},pass:function(e,t){var s=this;this.$confirm(t.current_process+"流程内将通过审核, 是否继续?","通过",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.deal_status="Y",t.user_id=sessionStorage.user_id,s.postIsPassFn(t)}).catch(function(){s.$notify({title:"提示",message:"已取消",type:"info"})})},unPass:function(e,t){this.unpassVisible=!0,this.unpassRow=t},seeProcess:function(e){var t={water_num:e.water_num,user_id:sessionStorage.user_id};this.postProcessInfoFn(t),this.processVisible=!0},seeMsg:function(e,t){if(""===t.discription)this.$notify({title:"提示",message:"没有留言",type:"info"});else{this.unpassVisible1=!0;var s=JSON.parse(t.discription);s.isOther?(s.checks.push("其他"),this.IsTextarea1=!0,this.checkList1=s.checks,this.textarea4=s.msg):(this.IsTextarea1=!1,this.checkList1=s.checks,this.textarea4=s.msg)}},unpassSureFn:function(){var e=this,t={checks:[],isOther:!1,msg:""},s=this.checkList.slice();s.indexOf("其他")>-1?(s.splice(s.indexOf("其他"),1),t={checks:s,isOther:!0,msg:this.textarea3}):t={checks:s,isOther:!1,msg:""};var a=this.unpassRow;this.$confirm(a.current_process+"流程内将不通过审核, 是否继续?","不通过",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.deal_status="N",a.description=t,a.user_id=sessionStorage.user_id,e.unpassVisible=!1,e.postIsPassFn(a)}).catch(function(){e.$notify({title:"提示",message:"已取消",type:"info"})})},seeReference:function(e,t){var s=JSON.parse(sessionStorage.reference);s.curTheme=t.subject,s.curMatter=t.item,sessionStorage.reference=c()(s)},handleSizeChange:function(e){},handleCurrentChange:function(e){var t={page:e,user_id:sessionStorage.user_id};this.getDealFn(t)},getDealFn:function(e){var t=this;return i()(n.a.mark(function s(){var a,r,i,l,c,o,p;return n.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t.$api.unsplash.getDeals(e);case 3:if(a=s.sent,r=[],"0"===a.errno){for(i=a.data.in_deal.slice(),l=a.data.wait_deal.slice(),t.pageSize=a.data.size,t.totalSize=a.data.total,c=0;c<i.length;c++)i[c].isOpen=!1;for(o=0;o<l.length;o++)l[o].isOpen=!0;r=r.concat(i,l),t.tableData=u.a.addSequence(r),p=t,setTimeout(function(){p.toggleSelection(p.tableData.slice(0,i.length))},300)}else t.$alert("服务器错误","警告",{confirmButtonText:"确定",callback:function(e){}});s.next=11;break;case 8:s.prev=8,s.t0=s.catch(0);case 11:case"end":return s.stop()}},s,t,[[0,8]])}))()},postProcessInfoFn:function(e){var t=this;return i()(n.a.mark(function s(){var a;return n.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t.$api.unsplash.postProcessInfo(e);case 3:"0"===(a=s.sent).errno?(t.tableData1=a.data,t.tableData1=u.a.addSequence(t.tableData1)):t.$alert("服务器错误","警告",{confirmButtonText:"确定",callback:function(e){}}),s.next=11;break;case 8:s.prev=8,s.t0=s.catch(0);case 11:case"end":return s.stop()}},s,t,[[0,8]])}))()},handleSelectionChange:function(e,t){for(var s=[],a=0;a<e.length;a++)s.push(e[a].index);if(s.indexOf(t.index)>-1){var n={water_num:t.water_num,user_id:sessionStorage.user_id};this.postActiveFn(n),this.tableData[t.index-1].isOpen=!1}else{var r={water_num:t.water_num,user_id:sessionStorage.user_id};this.postUnActiveFn(r),this.tableData[t.index-1].isOpen=!0}},selectAllFn:function(e){this.$refs.multipleTable.clearSelection()},postActiveFn:function(e){var t=this;return i()(n.a.mark(function s(){var a;return n.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t.$api.unsplash.postActive(e);case 3:"0"===(a=s.sent).errno?t.$notify({title:"成功",message:"激活所选任务",type:"success"}):"4003"===a.errno?t.$notify({title:"提示",message:"所选任务被"+a.user.name+"激活",type:"warning"}):t.$notify({title:"警告",message:"服务器错误",type:"warning"}),s.next=10;break;case 7:s.prev=7,s.t0=s.catch(0);case 10:case"end":return s.stop()}},s,t,[[0,7]])}))()},postUnActiveFn:function(e){var t=this;return i()(n.a.mark(function s(){return n.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t.$api.unsplash.postUnActive(e);case 3:"0"===s.sent.errno?t.$notify({title:"成功",message:"该任务撤销激活状态",type:"success"}):t.$alert("服务器错误","警告",{confirmButtonText:"确定",callback:function(e){}}),s.next=11;break;case 8:s.prev=8,s.t0=s.catch(0);case 11:case"end":return s.stop()}},s,t,[[0,8]])}))()},postIsPassFn:function(e){var t=this;return i()(n.a.mark(function s(){var a;return n.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,t.$api.unsplash.postIsPass(e);case 3:"0"===s.sent.errno?("Y"===e.deal_status?t.$notify({title:"提示",message:"完成流水号："+e.water_num+"在"+e.current_process+"流程的任务",type:"success"}):t.$notify({title:"提示",message:"流水号："+e.water_num+"在"+e.current_process+"流程中未通过",type:"success"}),a={page:1,user_id:sessionStorage.user_id},t.getDealFn(a)):t.$alert("服务器错误","警告",{confirmButtonText:"确定",callback:function(e){}}),s.next=11;break;case 8:s.prev=8,s.t0=s.catch(0);case 11:case"end":return s.stop()}},s,t,[[0,8]])}))()},headerCellStyle:function(e){e.row,e.column;var t=e.rowIndex;e.columnIndex;if(t>-1)return{"text-align":"center"}},cellStyle:function(e){e.row,e.column,e.rowIndex;if(e.columnIndex>=0)return{"text-align":"center"}},myAlert:function(e,t,s){s.$alert(e,t,{confirmButtonText:"确定",callback:function(e){}})},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()}}},f={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"deal"},[s("el-row",{staticClass:"functionalArea",attrs:{gutter:20}},[s("el-col",{attrs:{span:6,offset:18}},[s("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:e.searchInput,callback:function(t){e.searchInput=t},expression:"searchInput"}},[s("template",{slot:"append"},[s("el-button",{attrs:{type:"success",plain:""}},[e._v("搜索")])],1)],2)],1)],1),e._v(" "),s("el-table",{ref:"multipleTable",staticClass:"elTableOne",staticStyle:{width:"100%"},attrs:{data:e.tableData,"header-cell-style":e.headerCellStyle,"cell-style":e.cellStyle},on:{select:e.handleSelectionChange,"select-all":e.selectAllFn}},[s("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),s("el-table-column",{attrs:{label:"序号",width:"60"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.index))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"流水号",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-popover",{attrs:{trigger:"hover",placement:"top"}},[s("p",[e._v("主题: "+e._s(t.row.subject))]),e._v(" "),s("p",[e._v("身份证: "+e._s(t.row.idno))]),e._v(" "),s("p",[e._v("流程: "+e._s(t.row.process))]),e._v(" "),s("p",[e._v("时限: "+e._s(t.row.timeout)+"天")]),e._v(" "),s("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[s("el-tag",{attrs:{size:"medium"},on:{click:function(s){return e.seeProcess(t.row)}}},[e._v(e._s(t.row.water_num))])],1)])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"事项",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.item))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"申请人/申请单位",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.p_name))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"申请项目",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.p_project))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"已用时(天)",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{size:"mini",type:t.row.used_time>t.row.timeout?"danger":""}},[e._v(e._s(Math.floor(t.row.used_time)))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"操作","min-width":"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{size:"mini",icon:"el-icon-check",circle:"",disabled:t.row.isOpen},on:{click:function(s){return e.pass(t.$index,t.row)}}}),e._v(" "),s("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-close",circle:"",disabled:t.row.isOpen},on:{click:function(s){return e.unPass(t.$index,t.row)}}}),e._v(" "),s("router-link",{attrs:{to:e.toNext}},[s("el-button",{attrs:{size:"mini",icon:"el-icon-view",circle:"",disabled:t.row.isOpen},on:{click:function(s){return e.seeReference(t.$index,t.row)}}})],1)]}}])})],1),e._v(" "),s("div",{staticClass:"block pagination"},[e.curPageShow?s("el-pagination",{attrs:{"current-page":e.currentPage3,"page-size":e.pageSize,layout:"prev, pager, next, jumper",total:e.totalSize},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage3=t},"update:current-page":function(t){e.currentPage3=t}}}):e._e()],1),e._v(" "),s("el-dialog",{attrs:{title:"流程信息",visible:e.processVisible,width:"80%"},on:{"update:visible":function(t){e.processVisible=t}}},[s("el-table",{ref:"multipleTable1",staticStyle:{width:"100%"},attrs:{data:e.tableData1,"header-cell-style":e.headerCellStyle,"cell-style":e.cellStyle}},[s("el-table-column",{attrs:{label:"序号",width:"60"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.index))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"流程",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.current_process))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"处理人",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.user))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"收到时间",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.starts))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"处理时间",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.ends))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"处理状态",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return["Y"===t.row.result?s("span",{staticStyle:{"margin-left":"10px"}},[e._v("通过")]):e._e(),e._v(" "),"N"===t.row.result?s("span",{staticStyle:{"margin-left":"10px"}},[e._v("未通过")]):e._e()]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"操作","min-width":"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{size:"mini"},on:{click:function(s){return e.seeMsg(t.$index,t.row)}}},[e._v("查看留言")])]}}])})],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.processVisible=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.addThemeSureFn}},[e._v("确 定")])],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"备注未通过原因",visible:e.unpassVisible,width:"800px"},on:{"update:visible":function(t){e.unpassVisible=t}}},[s("div",[e._v("备注：选择“其他”时，可以手输未通过原因")]),e._v(" "),s("el-checkbox-group",{model:{value:e.checkList,callback:function(t){e.checkList=t},expression:"checkList"}},[s("el-row",e._l(e.errorList,function(e,t){return s("el-col",{key:t,staticClass:"checkBox",attrs:{span:12}},[s("el-checkbox",{attrs:{label:e.label,val:e.val}})],1)}),1)],1),e._v(" "),e.IsTextarea?s("el-input",{staticClass:"textArea",attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入未通过原因"},model:{value:e.textarea3,callback:function(t){e.textarea3=t},expression:"textarea3"}}):e._e(),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.unpassVisible=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.unpassSureFn}},[e._v("确 定")])],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"查看未通过原因",visible:e.unpassVisible1,width:"800px"},on:{"update:visible":function(t){e.unpassVisible1=t}}},[s("div",[e._v("备注：选择“其他”时，可以手输未通过原因")]),e._v(" "),s("el-checkbox-group",{model:{value:e.checkList1,callback:function(t){e.checkList1=t},expression:"checkList1"}},[s("el-row",e._l(e.errorList,function(e,t){return s("el-col",{key:t,staticClass:"checkBox",attrs:{span:12}},[s("el-checkbox",{attrs:{label:e.label,val:e.val,disabled:""}})],1)}),1)],1),e._v(" "),e.IsTextarea1?s("el-input",{staticClass:"textArea",attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入未通过原因",disabled:""},model:{value:e.textarea4,callback:function(t){e.textarea4=t},expression:"textarea4"}}):e._e(),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(t){e.unpassVisible1=!1}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var d=s("VU/8")(p,f,!1,function(e){s("Nm1Y")},null,null);t.default=d.exports},Nm1Y:function(e,t){}});
//# sourceMappingURL=7.c7be5524878fbecf6ad2.js.map