webpackJsonp([15],{CW4c:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l("Xxa5"),s=l.n(a),r=l("exGp"),n=l.n(r),i=l("//Fk"),o=l.n(i),c=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,m=/^\d{11}$/,u={name:"ATheme",data:function(){return{selectThemeId:"",selectThemeName:"",searchTheme:"",tableData:[],themeList:[],roleList:[],addFormVisible:!1,formLabelWidth:"120px",form:{subject:"",name:"",login_name:"",email:"",mobile:"",role_id:""},fixFormVisible:!1,form1:{id:"",subject:"",name:"",email:"",mobile:"",role_id:""},selectIds:[],notifyPromise:o.a.resolve()}},watch:{},created:function(){this.getThemeFn(),this.getRoleFn()},methods:{changeThemeFn:function(){for(var e=0;e<this.themeList.length;e++)if(this.themeList[e].val===this.selectThemeId){this.selectThemeName=this.themeList[e].label,this.getUserFn(this.selectThemeName);break}},addBtnFn:function(){this.selectThemeName?(this.addFormVisible=!0,this.form.subject=this.selectThemeName):this.$message({type:"warning",message:"未选择主题!"})},addSureFn:function(){var e={login_name:this.form.login_name.replace(/(^\s*)|(\s*$)/g,""),mobile:this.form.mobile.replace(/(^\s*)|(\s*$)/g,""),name:this.form.name.replace(/(^\s*)|(\s*$)/g,""),email:this.form.email.replace(/(^\s*)|(\s*$)/g,""),role_id:this.form.role_id,subject:this.form.subject,user_id:sessionStorage.user_id};""!==e.login_name&&""!==e.name&&""!==e.role_id&&0==e.mobile.search(m)&&0==e.email.search(c)?this.addFn(e):(""===e.login_name&&this.notify("账号输入有误"),""===e.name&&this.notify("姓名输入有误"),""===e.role_id&&this.notify("请选择用户角色"),-1===e.mobile.search(m)&&this.notify("请输入有效电话"),-1===e.email.search(c)&&this.notify("请输入有效邮箱"))},notify:function(e){var t=this;this.notifyPromise=this.notifyPromise.then(this.$nextTick).then(function(){t.$notify({title:"提示",message:e,type:"warning",dangerouslyUseHTMLString:!0,duration:5e3,position:"top-right"})})},handleEdit:function(e,t){this.fixFormVisible=!0,this.form1.subject=this.selectThemeName,this.form1.name=t.name,this.form1.email=t.email,this.form1.mobile=t.mobile;var l="";this.roleList.forEach(function(e,a){e.label===t.role&&(l=e.val)}),this.form1.role_id=l,this.form1.id=t.id},fixSureFn:function(){var e={id:this.form1.id,mobile:this.form1.mobile.replace(/(^\s*)|(\s*$)/g,""),name:this.form1.name.replace(/(^\s*)|(\s*$)/g,""),email:this.form1.email.replace(/(^\s*)|(\s*$)/g,""),role_id:this.form1.role_id,subject:this.form1.subject,user_id:sessionStorage.user_id};""!==e.name&&""!==e.subject&&""!==e.role_id&&0===e.mobile.search(m)&&0===e.email.search(c)?this.fixFn(e):(""===e.subject&&this.notify("部门选着有误"),""===e.name&&this.notify("姓名输入有误"),""===e.role_id&&this.notify("请选择用户角色"),-1===e.mobile.search(m)&&this.notify("请输入有效电话"),-1===e.email.search(c)&&this.notify("请输入有效邮箱"))},clearBtnFn:function(){var e=this;this.selectIds.length?this.$confirm("确定删除所选用户","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t={id_list:e.selectIds,user_id:sessionStorage.user_id};e.deleteSingleFn(t)}).catch(function(){e.$message({type:"info",message:"已取消删除"})}):this.$message({type:"warning",message:"未选择用户!"})},handleDelete:function(e,t){var l=this;this.$confirm("确定删除用户："+t.name,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e={id_list:[t.id],user_id:sessionStorage.user_id};l.deleteSingleFn(e)}).catch(function(){l.$message({type:"info",message:"已取消删除"})})},getThemeFn:function(){var e=this;return n()(s.a.mark(function t(){var l,a,r;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,l={},t.next=4,e.$api.unsplash.getSubjects(l);case 4:if(a=t.sent,e.themeList=[],"0"===a.errno){for(r=0;r<a.data.subjects.length;r++)e.themeList.push({label:a.data.subjects[r].name,val:a.data.subjects[r].id});e.themeList.push({label:"所有",val:-1}),e.selectThemeId=e.themeList[0].val,e.selectThemeName=e.themeList[0].label,e.getUserFn(e.selectThemeName)}else e.$alert("服务器错误","警告",{confirmButtonText:"确定",callback:function(e){}});t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0);case 13:case"end":return t.stop()}},t,e,[[0,10]])}))()},getUserFn:function(e){var t=this;return n()(s.a.mark(function l(){var a,r;return s.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,a={subject:e},l.next=4,t.$api.unsplash.getUsers(a);case 4:"0"===(r=l.sent).errno?(t.tableData=r.data,t.tableData=t.addSequence(t.tableData)):t.$alert("服务器错误","警告",{confirmButtonText:"确定",callback:function(e){}}),l.next=11;break;case 8:l.prev=8,l.t0=l.catch(0);case 11:case"end":return l.stop()}},l,t,[[0,8]])}))()},getRoleFn:function(){var e=this;return n()(s.a.mark(function t(){var l,a,r;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return l={},t.prev=1,t.next=4,e.$api.unsplash.getRoles(l);case 4:"0"===(a=t.sent).errno?(r=[],a.data.forEach(function(e,t){r.push({val:e.id,label:e.name})}),e.roleList=r):e.$message({type:"warning",message:"获取角色失败"}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1);case 11:case"end":return t.stop()}},t,e,[[1,8]])}))()},addFn:function(e){var t=this;return n()(s.a.mark(function l(){return s.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,l.next=3,t.$api.unsplash.postAddUser(e);case 3:"0"===l.sent.errno?(t.addFormVisible=!1,t.$message({type:"success",message:"增加用户成功"}),t.getUserFn(t.selectThemeName)):t.$message({type:"warning",message:"增加用户失败"}),l.next=10;break;case 7:l.prev=7,l.t0=l.catch(0);case 10:case"end":return l.stop()}},l,t,[[0,7]])}))()},fixFn:function(e){var t=this;return n()(s.a.mark(function l(){return s.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,l.next=3,t.$api.unsplash.postfixUser(e);case 3:"0"===l.sent.errno?(t.fixFormVisible=!1,t.$message({type:"success",message:"修改用户成功"}),t.getUserFn(t.selectThemeName)):t.$message({type:"warning",message:"修改用户失败"}),l.next=10;break;case 7:l.prev=7,l.t0=l.catch(0);case 10:case"end":return l.stop()}},l,t,[[0,7]])}))()},deleteSingleFn:function(e){var t=this;return n()(s.a.mark(function l(){return s.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.prev=0,l.next=3,t.$api.unsplash.postClearUser(e);case 3:"0"===l.sent.errno?(t.$message({type:"success",message:"删除成功!"}),t.selectIds=[],t.getUserFn(t.selectThemeName)):t.myAlert("服务器错误","警告",t),l.next=11;break;case 8:l.prev=8,l.t0=l.catch(0);case 11:case"end":return l.stop()}},l,t,[[0,8]])}))()},handleSelectionChange:function(e,t){this.selectIds=[];for(var l=0;l<e.length;l++)this.selectIds.push(e[l].id)},selectAllFn:function(e){this.selectIds=[];for(var t=0;t<e.length;t++)this.selectIds.push(e[t].id)},headerCellStyle:function(e){e.row,e.column;var t=e.rowIndex;e.columnIndex;if(t>-1)return{"text-align":"center"}},cellStyle:function(e){e.row,e.column,e.rowIndex;if(e.columnIndex>=0)return{"text-align":"center"}},myAlert:function(e,t,l){l.$alert(e,t,{confirmButtonText:"确定",callback:function(e){}})},addSequence:function(e){for(var t=0;t<e.length;t++)e[t].index=t+1;return e}}},f={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"hello"},[l("el-row",{staticClass:"functionalArea",attrs:{gutter:20}},[l("el-col",{attrs:{span:6}},[l("el-button-group",[l("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.addBtnFn}}),e._v(" "),l("el-button",{attrs:{type:"primary",icon:"el-icon-share"}}),e._v(" "),l("el-button",{attrs:{type:"primary",icon:"el-icon-delete"},on:{click:e.clearBtnFn}})],1)],1),e._v(" "),l("el-col",{attrs:{span:6,offset:6}},[l("el-form",[l("el-form-item",{attrs:{label:"部门","label-width":e.formLabelWidth}},[l("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择主题"},on:{change:e.changeThemeFn},model:{value:e.selectThemeId,callback:function(t){e.selectThemeId=t},expression:"selectThemeId"}},e._l(e.themeList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.val}})}),1)],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:6}},[l("el-input",{attrs:{placeholder:"请输入内容",clearable:""},model:{value:e.searchTheme,callback:function(t){e.searchTheme=t},expression:"searchTheme"}},[l("template",{slot:"append"},[l("el-button",{attrs:{type:"success",plain:""}},[e._v("搜索")])],1)],2)],1)],1),e._v(" "),l("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"header-cell-style":e.headerCellStyle,"cell-style":e.cellStyle},on:{select:e.handleSelectionChange,"select-all":e.selectAllFn}},[l("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),l("el-table-column",{attrs:{label:"序号",width:"60"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.index))])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"用户",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.login_name))])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"姓名",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.name))])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"部门",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.subject))])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"角色",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-popover",{attrs:{trigger:"hover",placement:"top"}},[l("p",[e._v("邮箱: "+e._s(t.row.email))]),e._v(" "),l("p",[e._v("电话: "+e._s(t.row.mobile))]),e._v(" "),l("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[l("el-tag",{attrs:{size:"medium"}},[e._v(e._s(t.row.role))])],1)])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"操作","min-width":"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{size:"mini"},on:{click:function(l){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),l("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(l){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),l("el-dialog",{attrs:{title:"添加用户",visible:e.addFormVisible,width:"800px"},on:{"update:visible":function(t){e.addFormVisible=t}}},[l("el-form",{attrs:{model:e.form}},[l("el-row",{attrs:{gutter:20}},[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"部门","label-width":e.formLabelWidth}},[l("el-input",{attrs:{autocomplete:"off",disabled:""},model:{value:e.form.subject,callback:function(t){e.$set(e.form,"subject",t)},expression:"form.subject"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"用户","label-width":e.formLabelWidth}},[l("el-input",{attrs:{placeholder:"请输入用户",autocomplete:"off"},model:{value:e.form.login_name,callback:function(t){e.$set(e.form,"login_name",t)},expression:"form.login_name"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"姓名","label-width":e.formLabelWidth}},[l("el-input",{attrs:{placeholder:"请输入姓名",autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"邮箱","label-width":e.formLabelWidth}},[l("el-input",{attrs:{placeholder:"请输入邮箱",autocomplete:"off"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"电话","label-width":e.formLabelWidth}},[l("el-input",{attrs:{placeholder:"请输入电话",autocomplete:"off"},model:{value:e.form.mobile,callback:function(t){e.$set(e.form,"mobile",t)},expression:"form.mobile"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"角色","label-width":e.formLabelWidth}},[l("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择角色"},model:{value:e.form.role_id,callback:function(t){e.$set(e.form,"role_id",t)},expression:"form.role_id"}},e._l(e.roleList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.val}})}),1)],1)],1)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.addFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.addSureFn}},[e._v("确 定")])],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"编辑用户",visible:e.fixFormVisible,width:"800px"},on:{"update:visible":function(t){e.fixFormVisible=t}}},[l("el-form",{attrs:{model:e.form1}},[l("el-row",{attrs:{gutter:20}},[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"部门","label-width":e.formLabelWidth}},[l("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择部门"},model:{value:e.form1.subject,callback:function(t){e.$set(e.form1,"subject",t)},expression:"form1.subject"}},e._l(e.themeList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.label}})}),1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"姓名","label-width":e.formLabelWidth}},[l("el-input",{attrs:{placeholder:"请输入姓名",autocomplete:"off"},model:{value:e.form1.name,callback:function(t){e.$set(e.form1,"name",t)},expression:"form1.name"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"邮箱","label-width":e.formLabelWidth}},[l("el-input",{attrs:{placeholder:"请输入邮箱",autocomplete:"off"},model:{value:e.form1.email,callback:function(t){e.$set(e.form1,"email",t)},expression:"form1.email"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"电话","label-width":e.formLabelWidth}},[l("el-input",{attrs:{placeholder:"请输入电话",autocomplete:"off"},model:{value:e.form1.mobile,callback:function(t){e.$set(e.form1,"mobile",t)},expression:"form1.mobile"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"角色","label-width":e.formLabelWidth}},[l("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择角色"},model:{value:e.form1.role_id,callback:function(t){e.$set(e.form1,"role_id",t)},expression:"form1.role_id"}},e._l(e.roleList,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.val}})}),1)],1)],1)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.fixFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.fixSureFn}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var h=l("VU/8")(u,f,!1,function(e){l("OXKM")},"data-v-39e6d71d",null);t.default=h.exports},OXKM:function(e,t){}});
//# sourceMappingURL=15.9ad9ba43c947ab62f985.js.map