webpackJsonp([8],{OAQe:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l("Xxa5"),s=l.n(a),r=l("exGp"),n=l.n(r),o=l("sUjr"),i={name:"ATheme",data:function(){return{selectThemeId:"",selectThemeName:"",searchTheme:"",tableData:[],baseUrl:o.a,themeList:[],levelList:[{label:"省,市（州）, 县（市、区）",val:"省,市（州）, 县（市、区）"},{label:"市（州）, 县（市、区）",val:"市（州）, 县（市、区）"},{label:"县（市、区）",val:"县（市、区）"}],styleList:[{label:"行政许可",val:"行政许可"}],frequentList:[{label:"是",val:"是"},{label:"否",val:"否"}],addFormVisible:!1,formLabelWidth:"120px",form:{subject:"",name:"",level:"县（市、区）",process:"",timeout:"",cate:"行政许可",frequent:"是"},fixFormVisible:!1,form1:{subject:"",name:"",level:"县（市、区）",process:"",timeout:"",cate:"行政许可",frequent:"是",matterId:""},selectIds:[]}},watch:{},created:function(){this.getThemeFn()},methods:{changeThemeFn:function(){for(var e=0;e<this.themeList.length;e++)if(this.themeList[e].val==this.selectThemeId){this.selectThemeName=this.themeList[e].label,this.getMatterFn(this.selectThemeName);break}},addBtnFn:function(){this.selectThemeName?(this.addFormVisible=!0,this.form.subject=this.selectThemeName):this.$message({type:"warning",message:"未选择主题!"})},addSureFn:function(){var e={subject_id:this.selectThemeId,name:this.form.name.replace(/(^\s*)|(\s*$)/g,""),process:this.form.process.replace(/(^\s*)|(\s*$)/g,""),step:this.form.process.replace(/(^\s*)|(\s*$)/g,"").split("-").length,level:this.form.level,cate:this.form.cate,frequent:this.form.frequent,timeout:this.form.timeout,industry:"1",user_id:sessionStorage.user_id};""!=e.name&&""!=e.process&&""!=e.timeout?this.addFn(e):this.$message({type:"warning",message:"请补全信息!"})},handleEdit:function(e,t){this.fixFormVisible=!0,this.form1.subject=this.selectThemeName,this.form1.name=t.name,t.level?this.form1.level=t.level:this.form1.level="县（市、区）",this.form1.process=t.process,this.form1.timeout=t.timeout,t.cate?this.form1.cate=t.cate:this.form1.cate="行政许可",t.frequent?this.form1.frequent=t.frequent:this.form1.frequent="是",this.form1.matterId=t.id},fixSureFn:function(){var e={id:this.form1.matterId,subject_id:this.selectThemeId,name:this.form1.name.replace(/(^\s*)|(\s*$)/g,""),process:this.form1.process.replace(/(^\s*)|(\s*$)/g,""),step:this.form1.process.replace(/(^\s*)|(\s*$)/g,"").split("-").length,level:this.form1.level,cate:this.form1.cate,frequent:this.form1.frequent,timeout:this.form1.timeout,industry:"1",user_id:sessionStorage.user_id};""!=e.name&&""!=e.process&&""!=e.timeout?this.fixFn(e):this.$message({type:"warning",message:"请补全信息!"})},clearBtnFn:function(){var e=this;this.selectIds.length?this.$confirm("确定删除所选事项","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t={id_list:e.selectIds,user_id:sessionStorage.user_id};e.deleteSingleFn(t)}).catch(function(){e.$message({type:"info",message:"已取消删除"})}):this.$message({type:"warning",message:"未选择事项!"})},handleDelete:function(e,t){var l=this;this.$confirm("确定删除事项："+t.name,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e={id_list:[t.id],user_id:sessionStorage.user_id};l.deleteSingleFn(e)}).catch(function(){l.$message({type:"info",message:"已取消删除"})})},getThemeFn:function(){var e=this;return n()(s.a.mark(function t(){var l,a,r;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,l={},t.next=4,e.$api.unsplash.getSubjects(l);case 4:if(a=t.sent,e.themeList=[],"0"==a.errno){for(r=0;r<a.data.subjects.length;r++)e.themeList.push({label:a.data.subjects[r].name,val:a.data.subjects[r].id});e.selectThemeId=e.themeList[0].val,e.selectThemeName=e.themeList[0].label,e.getMatterFn(e.selectThemeName)}else e.$alert("服务器错误","警告",{confirmButtonText:"确定",callback:function(e){}});t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0);case 13:case"end":return t.stop()}},t,e,[[0,10]])}))()},getMatterFn:function(e){var t=this;return n()(s.a.mark(function l(){var a,r;return s.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,a={subject:e},l.next=4,t.$api.unsplash.getMatters(a);case 4:"0"==(r=l.sent).errno?(t.tableData=r.data.items,t.tableData=t.addSequence(t.tableData)):t.$alert("服务器错误","警告",{confirmButtonText:"确定",callback:function(e){}}),l.next=12;break;case 9:l.prev=9,l.t0=l.catch(0);case 12:case"end":return l.stop()}},l,t,[[0,9]])}))()},addFn:function(e){var t=this;return n()(s.a.mark(function l(){return s.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,l.next=3,t.$api.unsplash.postAddMatter(e);case 3:"0"==l.sent.errno?(t.addFormVisible=!1,t.$message({type:"success",message:"增加事项成功"}),t.getMatterFn(t.selectThemeName)):t.$message({type:"warning",message:"增加事项失败"}),l.next=11;break;case 8:l.prev=8,l.t0=l.catch(0);case 11:case"end":return l.stop()}},l,t,[[0,8]])}))()},fixFn:function(e){var t=this;return n()(s.a.mark(function l(){return s.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,l.next=3,t.$api.unsplash.postfixMatter(e);case 3:"0"==l.sent.errno?(t.fixFormVisible=!1,t.$message({type:"success",message:"修改事项成功"}),t.getMatterFn(t.selectThemeName)):t.$message({type:"warning",message:"修改事项失败"}),l.next=10;break;case 7:l.prev=7,l.t0=l.catch(0);case 10:case"end":return l.stop()}},l,t,[[0,7]])}))()},deleteSingleFn:function(e){var t=this;return n()(s.a.mark(function l(){return s.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,l.next=3,t.$api.unsplash.postClearMatter(e);case 3:"0"==l.sent.errno?(t.$message({type:"success",message:"删除成功!"}),t.selectIds=[],t.getMatterFn(t.selectThemeName)):t.myAlert("服务器错误","警告",t),l.next=11;break;case 8:l.prev=8,l.t0=l.catch(0);case 11:case"end":return l.stop()}},l,t,[[0,8]])}))()},handleSelectionChange:function(e,t){this.selectIds=[];for(var l=0;l<e.length;l++)this.selectIds.push(e[l].id)},selectAllFn:function(e){this.selectIds=[];for(var t=0;t<e.length;t++)this.selectIds.push(e[t].id)},headerCellStyle:function(e){e.row,e.column;var t=e.rowIndex;e.columnIndex;if(t>-1)return{"text-align":"center"}},cellStyle:function(e){e.row,e.column,e.rowIndex;if(e.columnIndex>=0)return{"text-align":"center"}},myAlert:function(e,t,l){l.$alert(e,t,{confirmButtonText:"确定",callback:function(e){}})},addSequence:function(e){for(var t=0;t<e.length;t++)e[t].index=t+1;return e}}},c={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"hello"},[l("el-row",{staticClass:"functionalArea",attrs:{gutter:20}},[l("el-col",{attrs:{span:6}},[l("el-button-group",[l("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.addBtnFn}}),e._v(" "),l("el-button",{attrs:{type:"primary",icon:"el-icon-share"}}),e._v(" "),l("el-button",{attrs:{type:"primary",icon:"el-icon-delete"},on:{click:e.clearBtnFn}})],1)],1),e._v(" "),l("el-col",{attrs:{span:6,offset:6}},[l("el-form",[l("el-form-item",{attrs:{label:"主题","label-width":e.formLabelWidth}},[l("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择主题"},on:{change:e.changeThemeFn},model:{value:e.selectThemeId,callback:function(t){e.selectThemeId=t},expression:"selectThemeId"}},e._l(e.themeList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.val}})}),1)],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:6}},[l("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:e.searchTheme,callback:function(t){e.searchTheme=t},expression:"searchTheme"}},[l("template",{slot:"append"},[l("el-button",{attrs:{type:"success",plain:""}},[e._v("搜索")])],1)],2)],1)],1),e._v(" "),l("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"header-cell-style":e.headerCellStyle,"cell-style":e.cellStyle},on:{select:e.handleSelectionChange,"select-all":e.selectAllFn}},[l("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),l("el-table-column",{attrs:{label:"序号",width:"60"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.index))])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"事项",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.name))])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"流程",width:"280"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.process))])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"时限（天）",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-popover",{attrs:{trigger:"hover",placement:"top"}},[l("p",[e._v("主题: "+e._s(t.row.subject))]),e._v(" "),l("p",[e._v("步骤数: "+e._s(t.row.step))]),e._v(" "),l("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[l("el-tag",{attrs:{size:"medium"}},[e._v(e._s(t.row.timeout))])],1)])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"操作","min-width":"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{size:"mini"},on:{click:function(l){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),l("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(l){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),l("el-dialog",{attrs:{title:"添加事项",visible:e.addFormVisible,width:"800px"},on:{"update:visible":function(t){e.addFormVisible=t}}},[l("el-form",{attrs:{model:e.form}},[l("el-row",{attrs:{gutter:20}},[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"主题","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",disabled:""},model:{value:e.form.subject,callback:function(t){e.$set(e.form,"subject",t)},expression:"form.subject"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"事项","label-width":e.formLabelWidth}},[l("el-input",{attrs:{placeholder:"请输入事项",autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"行使层级","label-width":e.formLabelWidth}},[l("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择行使层级"},model:{value:e.form.level,callback:function(t){e.$set(e.form,"level",t)},expression:"form.level"}},e._l(e.levelList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.val}})}),1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"流程","label-width":e.formLabelWidth}},[l("el-input",{attrs:{placeholder:"格式：1-2-3",autocomplete:"off"},model:{value:e.form.process,callback:function(t){e.$set(e.form,"process",t)},expression:"form.process"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"时限","label-width":e.formLabelWidth}},[l("el-input",{attrs:{placeholder:"请输入时限(天)",autocomplete:"off"},model:{value:e.form.timeout,callback:function(t){e.$set(e.form,"timeout",t)},expression:"form.timeout"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"类型","label-width":e.formLabelWidth}},[l("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择类型"},model:{value:e.form.cate,callback:function(t){e.$set(e.form,"cate",t)},expression:"form.cate"}},e._l(e.styleList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.val}})}),1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"常办","label-width":e.formLabelWidth}},[l("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择服务区"},model:{value:e.form.frequent,callback:function(t){e.$set(e.form,"frequent",t)},expression:"form.frequent"}},e._l(e.frequentList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.val}})}),1)],1)],1)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.addFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.addSureFn}},[e._v("确 定")])],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"编辑事项",visible:e.fixFormVisible,width:"800px"},on:{"update:visible":function(t){e.fixFormVisible=t}}},[l("el-form",{attrs:{model:e.form1}},[l("el-row",{attrs:{gutter:20}},[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"主题","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",disabled:""},model:{value:e.form1.subject,callback:function(t){e.$set(e.form1,"subject",t)},expression:"form1.subject"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"事项","label-width":e.formLabelWidth}},[l("el-input",{attrs:{placeholder:"请输入事项",autocomplete:"off"},model:{value:e.form1.name,callback:function(t){e.$set(e.form1,"name",t)},expression:"form1.name"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"行使层级","label-width":e.formLabelWidth}},[l("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择行使层级"},model:{value:e.form1.level,callback:function(t){e.$set(e.form1,"level",t)},expression:"form1.level"}},e._l(e.levelList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.val}})}),1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"流程","label-width":e.formLabelWidth}},[l("el-input",{attrs:{placeholder:"格式：1-2-3",autocomplete:"off"},model:{value:e.form1.process,callback:function(t){e.$set(e.form1,"process",t)},expression:"form1.process"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"时限","label-width":e.formLabelWidth}},[l("el-input",{attrs:{placeholder:"请输入时限(天)",autocomplete:"off"},model:{value:e.form1.timeout,callback:function(t){e.$set(e.form1,"timeout",t)},expression:"form1.timeout"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"类型","label-width":e.formLabelWidth}},[l("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择类型"},model:{value:e.form1.cate,callback:function(t){e.$set(e.form1,"cate",t)},expression:"form1.cate"}},e._l(e.styleList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.val}})}),1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"常办","label-width":e.formLabelWidth}},[l("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择服务区"},model:{value:e.form1.frequent,callback:function(t){e.$set(e.form1,"frequent",t)},expression:"form1.frequent"}},e._l(e.frequentList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.val}})}),1)],1)],1)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.fixFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.fixSureFn}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var m=l("VU/8")(i,c,!1,function(e){l("aQwt")},"data-v-714436f3",null);t.default=m.exports},aQwt:function(e,t){}});
//# sourceMappingURL=8.d9e0b219f886e8e2cbc0.js.map