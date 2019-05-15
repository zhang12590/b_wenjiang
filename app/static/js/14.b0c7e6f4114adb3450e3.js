webpackJsonp([14],{"5tgg":function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l("Xxa5"),r=l.n(a),s=l("exGp"),n=l.n(s),i={name:"ATheme",data:function(){return{selectThemeId:"",selectThemeName:"",themeList:[],selectMatterId:"",selectMatterName:"",matterList:[],searchTheme:"",tableData:[],levelList:[{label:"省,市（州）, 县（市、区）",val:"省,市（州）, 县（市、区）"},{label:"市（州）, 县（市、区）",val:"市（州）, 县（市、区）"},{label:"县（市、区）",val:"县（市、区）"}],processList:[{id:"",item:"",name:"",order:""}],styleList:[{label:"行政许可",val:"行政许可"}],needList:[{label:"是",val:"Y"},{label:"否",val:"N"}],addFormVisible:!1,formLabelWidth:"120px",form:{item:"",name:"",process:"",need:"",require:"",permit:""},fixFormVisible:!1,form1:{item:"",name:"",process:"",need:"",require:"",permit:"",id:""},selectIds:[]}},watch:{},created:function(){this.getThemeFn()},methods:{changeThemeFn:function(){for(var e=0;e<this.themeList.length;e++)if(this.themeList[e].val===this.selectThemeId){this.selectThemeName=this.themeList[e].label,this.getMatterFn(this.selectThemeName);break}},changeMatterFn:function(){for(var e=0;e<this.matterList.length;e++)if(this.matterList[e].val===this.selectMatterId){this.selectMatterName=this.matterList[e].label,this.getElementFn(this.selectMatterName),this.getItemStepsFn(this.selectMatterName);break}},addBtnFn:function(){this.selectMatterName?(this.addFormVisible=!0,this.form.item=this.selectMatterName,this.form.process=this.processList[0].id,this.form.need=this.needList[0].val):this.notifyFn("提示","未选择主题")},addSureFn:function(){var e={step_id:this.form.process,name:this.form.name.replace(/(^\s*)|(\s*$)/g,""),requ:this.form.require,need:this.form.need,permit:this.form.permit,user_id:sessionStorage.user_id};console.log(e),""!==e.name&&""!==e.require&&""!==e.permit?this.addFn(e):this.notifyFn("提示","请补全信息")},handleEdit:function(e,t){console.log(e,t),this.fixFormVisible=!0,this.form1.item=this.selectMatterName,this.form1.name=t.name,this.form1.need=t.need,this.form1.require=t.require,this.form1.permit=t.permit,this.form1.id=t.id;for(var l=0;l<this.processList.length;l++){if(t.step===this.processList[l].name){this.form1.process=this.processList[l].id,console.log(this.form1.process),console.log(this.processList[l].id);break}this.form1.process=this.processList[0].id}},fixSureFn:function(){var e={id:this.form1.id,step_id:this.form1.process,name:this.form1.name.replace(/(^\s*)|(\s*$)/g,""),requ:this.form1.require,need:this.form1.need,permit:this.form1.permit,user_id:sessionStorage.user_id};console.log(e),""!==e.name&&""!==e.require&&""!==e.permit?this.fixFn(e):this.notifyFn("提示","请补全信息")},clearBtnFn:function(){var e=this;this.selectIds.length?this.$confirm("确定删除所选要素","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t={id_list:e.selectIds,user_id:sessionStorage.user_id};e.deleteSingleFn(t)}).catch(function(){e.notifyFn("提示","已取消删除")}):this.notifyFn("提示","未选择要素")},handleDelete:function(e,t){var l=this;console.log(t),this.$confirm("确定删除要素："+t.name,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e={id_list:[t.id],user_id:sessionStorage.user_id};l.deleteSingleFn(e)}).catch(function(){l.notifyFn("提示","已取消删除")})},getThemeFn:function(){var e=this;return n()(r.a.mark(function t(){var l,a,s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,l={},t.next=4,e.$api.unsplash.getSubjects(l);case 4:if(a=t.sent,console.log(a),e.themeList=[],"0"===a.errno){for(s=0;s<a.data.subjects.length;s++)e.themeList.push({label:a.data.subjects[s].name,val:a.data.subjects[s].id});e.selectThemeId=e.themeList[0].val,e.selectThemeName=e.themeList[0].label,e.getMatterFn(e.selectThemeName)}else e.notifyFn("提示",a.errmsg);t.next=14;break;case 10:t.prev=10,t.t0=t.catch(0),e.notifyFn("提示","服务器错误"),console.log(t.t0);case 14:case"end":return t.stop()}},t,e,[[0,10]])}))()},getMatterFn:function(e){var t=this;return n()(r.a.mark(function l(){var a,s,n;return r.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,a={subject:e},l.next=4,t.$api.unsplash.getMatters(a);case 4:if(s=l.sent,console.log(s),"0"===s.errno){for(t.matterList=[],n=0;n<s.data.items.length;n++)t.matterList.push({label:s.data.items[n].name,val:s.data.items[n].id});t.selectMatterId=t.matterList[0].val,t.selectMatterName=t.matterList[0].label,console.log(t.selectMatterName),t.getItemStepsFn(t.selectMatterName),t.getElementFn(t.selectMatterName)}else t.notifyFn("提示",s.errmsg);l.next=13;break;case 9:l.prev=9,l.t0=l.catch(0),t.notifyFn("提示","服务器错误"),console.log(l.t0);case 13:case"end":return l.stop()}},l,t,[[0,9]])}))()},getElementFn:function(e){var t=this;return n()(r.a.mark(function l(){var a,s;return r.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,a={item:e},l.next=4,t.$api.unsplash.postElements(a);case 4:s=l.sent,console.log(s),"0"===s.errno?(t.tableData=s.data,t.tableData=t.addSequence(t.tableData)):t.notifyFn("提示",s.errmsg),l.next=13;break;case 9:l.prev=9,l.t0=l.catch(0),t.notifyFn("提示","服务器错误"),console.log(l.t0);case 13:case"end":return l.stop()}},l,t,[[0,9]])}))()},getItemStepsFn:function(e){var t=this;return n()(r.a.mark(function l(){var a,s;return r.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,a={item:e},l.next=4,t.$api.unsplash.getItemSteps(a);case 4:"0"===(s=l.sent).errno?t.processList=s.data:t.notifyFn("提示",s.errmsg),l.next=12;break;case 8:l.prev=8,l.t0=l.catch(0),t.notifyFn("提示","服务器错误"),console.log(l.t0);case 12:case"end":return l.stop()}},l,t,[[0,8]])}))()},addFn:function(e){var t=this;return n()(r.a.mark(function l(){return r.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,l.next=3,t.$api.unsplash.postAddElement(e);case 3:"0"===l.sent.errno?(t.addFormVisible=!1,t.notifyFn("提示","增加要素成功","success"),t.getElementFn(t.selectMatterName)):t.notifyFn("提示","增加要素失败"),l.next=11;break;case 7:l.prev=7,l.t0=l.catch(0),t.notifyFn("提示","服务器错误"),console.log(l.t0);case 11:case"end":return l.stop()}},l,t,[[0,7]])}))()},fixFn:function(e){var t=this;return n()(r.a.mark(function l(){var a;return r.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,l.next=3,t.$api.unsplash.postfixElement(e);case 3:a=l.sent,console.log(a),"0"===a.errno?(t.fixFormVisible=!1,t.notifyFn("提示","修改要素成功","success"),t.getElementFn(t.selectMatterName)):t.notifyFn("提示","修改要素失败"),l.next=12;break;case 8:l.prev=8,l.t0=l.catch(0),t.notifyFn("提示","服务器错误"),console.log(l.t0);case 12:case"end":return l.stop()}},l,t,[[0,8]])}))()},deleteSingleFn:function(e){var t=this;return n()(r.a.mark(function l(){var a;return r.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,l.next=3,t.$api.unsplash.postClearElement(e);case 3:a=l.sent,console.log(a),"0"===a.errno?(t.notifyFn("提示","删除成功","success"),t.selectIds=[],t.getElementFn(t.selectMatterName)):t.notifyFn("提示","删除失败"),l.next=12;break;case 8:l.prev=8,l.t0=l.catch(0),t.notifyFn("提示","服务器错误"),console.log(l.t0);case 12:case"end":return l.stop()}},l,t,[[0,8]])}))()},handleSelectionChange:function(e,t){console.log(e),this.selectIds=[];for(var l=0;l<e.length;l++)this.selectIds.push(e[l].id)},selectAllFn:function(e){console.log(e),this.selectIds=[];for(var t=0;t<e.length;t++)this.selectIds.push(e[t].id)},headerCellStyle:function(e){e.row,e.column;var t=e.rowIndex;e.columnIndex;if(t>-1)return{"text-align":"center"}},cellStyle:function(e){e.row,e.column,e.rowIndex;if(e.columnIndex>=0)return{"text-align":"center"}},myAlert:function(e,t,l){l.$alert(e,t,{confirmButtonText:"确定",callback:function(e){}})},addSequence:function(e){for(var t=0;t<e.length;t++)e[t].index=t+1;return e},notifyFn:function(e,t){var l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"warning";this.$notify({title:e,message:t,type:l,dangerouslyUseHTMLString:!0,duration:5e3,position:"top-right"})}}},o={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"AElement"},[l("el-row",{staticClass:"functionalArea",attrs:{gutter:20}},[l("el-col",{attrs:{span:6}},[l("el-button-group",[l("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.addBtnFn}}),e._v(" "),l("el-button",{attrs:{type:"primary",icon:"el-icon-share"}}),e._v(" "),l("el-button",{attrs:{type:"primary",icon:"el-icon-delete"},on:{click:e.clearBtnFn}})],1)],1),e._v(" "),l("el-col",{attrs:{span:6,offset:6}},[l("el-form",[l("el-form-item",{attrs:{label:"主题","label-width":e.formLabelWidth}},[l("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择主题"},on:{change:e.changeThemeFn},model:{value:e.selectThemeId,callback:function(t){e.selectThemeId=t},expression:"selectThemeId"}},e._l(e.themeList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.val}})}),1)],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:6}},[l("el-form",[l("el-form-item",{attrs:{label:"事项","label-width":e.formLabelWidth}},[l("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择主题"},on:{change:e.changeMatterFn},model:{value:e.selectMatterId,callback:function(t){e.selectMatterId=t},expression:"selectMatterId"}},e._l(e.matterList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.val}})}),1)],1)],1)],1),e._v(" "),l("el-col",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{span:6}},[l("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:e.searchTheme,callback:function(t){e.searchTheme=t},expression:"searchTheme"}},[l("template",{slot:"append"},[l("el-button",{attrs:{type:"success",plain:""}},[e._v("搜索")])],1)],2)],1)],1),e._v(" "),l("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"header-cell-style":e.headerCellStyle,"cell-style":e.cellStyle},on:{select:e.handleSelectionChange,"select-all":e.selectAllFn}},[l("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),l("el-table-column",{attrs:{label:"序号",width:"60"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.index))])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"材料清单",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.name))])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"准备要求",width:"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.require))])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"审查要求",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.permit))])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"操作","min-width":"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{size:"mini"},on:{click:function(l){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),l("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(l){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),l("el-dialog",{attrs:{title:"添加要素",visible:e.addFormVisible,width:"800px"},on:{"update:visible":function(t){e.addFormVisible=t}}},[l("el-form",{attrs:{model:e.form}},[l("el-row",{attrs:{gutter:20}},[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"事项","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",disabled:""},model:{value:e.form.item,callback:function(t){e.$set(e.form,"item",t)},expression:"form.item"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"要素","label-width":e.formLabelWidth}},[l("el-input",{attrs:{placeholder:"请输入要素",autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"流程工序","label-width":e.formLabelWidth}},[l("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择行使层级"},model:{value:e.form.process,callback:function(t){e.$set(e.form,"process",t)},expression:"form.process"}},e._l(e.processList,function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.id}})}),1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"必要","label-width":e.formLabelWidth}},[l("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择行使层级"},model:{value:e.form.need,callback:function(t){e.$set(e.form,"need",t)},expression:"form.need"}},e._l(e.needList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.val}})}),1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"形式要点","label-width":e.formLabelWidth}},[l("el-input",{attrs:{type:"textarea",autosize:"",placeholder:"请输入内容"},model:{value:e.form.require,callback:function(t){e.$set(e.form,"require",t)},expression:"form.require"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"许可要点","label-width":e.formLabelWidth}},[l("el-input",{attrs:{type:"textarea",autosize:"",placeholder:"请输入内容"},model:{value:e.form.permit,callback:function(t){e.$set(e.form,"permit",t)},expression:"form.permit"}})],1)],1)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.addFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.addSureFn}},[e._v("确 定")])],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"编辑要素",visible:e.fixFormVisible,width:"800px"},on:{"update:visible":function(t){e.fixFormVisible=t}}},[l("el-form",{attrs:{model:e.form1}},[l("el-row",{attrs:{gutter:20}},[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"事项","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",disabled:""},model:{value:e.form1.item,callback:function(t){e.$set(e.form1,"item",t)},expression:"form1.item"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"要素","label-width":e.formLabelWidth}},[l("el-input",{attrs:{placeholder:"请输入要素",autocomplete:"off"},model:{value:e.form1.name,callback:function(t){e.$set(e.form1,"name",t)},expression:"form1.name"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"流程工序","label-width":e.formLabelWidth}},[l("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择工序"},model:{value:e.form1.process,callback:function(t){e.$set(e.form1,"process",t)},expression:"form1.process"}},e._l(e.processList,function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.id}})}),1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"必要","label-width":e.formLabelWidth}},[l("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择行使层级"},model:{value:e.form1.need,callback:function(t){e.$set(e.form1,"need",t)},expression:"form1.need"}},e._l(e.needList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.val}})}),1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"形式要点","label-width":e.formLabelWidth}},[l("el-input",{attrs:{type:"textarea",autosize:"",placeholder:"请输入内容"},model:{value:e.form1.require,callback:function(t){e.$set(e.form1,"require",t)},expression:"form1.require"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"许可要点","label-width":e.formLabelWidth}},[l("el-input",{attrs:{type:"textarea",autosize:"",placeholder:"请输入内容"},model:{value:e.form1.permit,callback:function(t){e.$set(e.form1,"permit",t)},expression:"form1.permit"}})],1)],1)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.fixFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.fixSureFn}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var c=l("VU/8")(i,o,!1,function(e){l("MvED")},null,null);t.default=c.exports},MvED:function(e,t){}});
//# sourceMappingURL=14.b0c7e6f4114adb3450e3.js.map