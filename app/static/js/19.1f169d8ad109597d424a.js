webpackJsonp([19],{DzYY:function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=n("Xxa5"),a=n.n(e),s=n("exGp"),o=n.n(s),r=n("mvHQ"),l=n.n(r),c=n("Dd8w"),u=n.n(c),p=n("sUjr"),d=n("NYxO"),f=n("IcnI"),g=n("M4fF"),h=n.n(g),m={name:"mobileSign",store:f.a,data:function(){return{toNext:"/mobileCall",signShow:!0,input1:"",input1E:!1,input1S:!1,input2:"",input2E:!1,input2S:!1,input3:"",input3E:!1,input3S:!1,imgSrc:"",code_id:"",baseUrl:p.a,isIdentify:!1,openBtn:!0,clickM:!1,fixedParameters:{},dialogFormVisible:!1,form:{lingpai:"123",window:"18"},formLabelWidth:"120px"}},watch:{input3:function(t){this.input3=t.replace(/(^\s*)|(\s*$)/g,""),4===this.input3.length?this.identifyfn():(this.input3E=!1,this.input3S=!1,this.isIdentify=!1)},isIdentify:function(t){this.isIdentify=t,this.isIdentify&&""!==this.input1&&""!==this.input2?this.openBtn=!1:this.openBtn=!0},input1:function(t){this.input1=t,this.isIdentify&&""!==this.input1&&""!==this.input2?this.openBtn=!1:this.openBtn=!0},input2:function(t){this.input2=t,this.isIdentify&&""!==this.input1&&""!==this.input2?this.openBtn=!1:this.openBtn=!0,this.input2E&&(this.input2E=!1,this.input2S=!1)}},created:function(){var t=this;this.loadImgFn(),localStorage.addr||this.$alert("未选择地址，将前往选地址页面","警告",{confirmButtonText:"确定",callback:function(i){t.$router.push("/mobileAddress")}})},mounted:function(){this.sessionFn()},methods:u()({},Object(d.b)({add_Routes:"add_Routes"}),{randomPassword:function(t){for(var i=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","m","n","p","Q","r","s","t","u","v","w","x","y","z","2","3","4","5","6","7","8","9"],n=i.length,e="",a=0;a<t;a++)e+=i[Math.floor(Math.random()*n)];return e},loadImgFn:function(){this.code_id=this.randomPassword(24),this.imgSrc=this.baseUrl+"/codes?code_id="+this.code_id},verificationClickFn:function(){this.loadImgFn()},signClickFn:h.a.debounce(function(){this.signInfn()},500),fixPassWordFn:function(){this.$router.push({path:"/mobileFix"})},cancelFn:function(){this.dialogFormVisible=!1},sureFn:h.a.debounce(function(){var t=this.form;if(""!==t.lingpai&&""!==t.window){localStorage.lingpai=this.form.lingpai,localStorage.window=this.form.window;var i=JSON.parse(sessionStorage.userInfo);i.lingpai=this.form.lingpai,i.window=this.form.window,sessionStorage.userInfo=l()(i),this.setLingPaifn({lingpai:localStorage.lingpai,win:localStorage.window,user_id:sessionStorage.user_id})}else this.notifyFn("提示","请补全信息")},500),closeDialog:function(){this.dialogFormVisible=!1},sessionFn:function(t){var i=this;return o()(a.a.mark(function n(){var e,s;return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,i.$api.unsplash.sessionExist(t);case 3:"0"===(e=n.sent).errno?e.data&&(e.data.user_id=e.data.id,s=[],e.data.permissions.forEach(function(t,i){s.push(t.all_discripe)}),e.data.allPermission=s,sessionStorage.userInfo=l()(e.data),sessionStorage.user_id=e.data.id,f.a.commit("changeUserInfo"),f.a.commit("changeBackAside"),"大厅"===e.data.role?localStorage.lingpai&&localStorage.window?(e.data.lingpai=localStorage.lingpai,e.data.window=localStorage.window,sessionStorage.userInfo=l()(e.data),f.a.commit("changeUserInfo"),i.setLingPaifn({lingpai:localStorage.lingpai,win:localStorage.window,user_id:sessionStorage.user_id})):(i.dialogFormVisible=!0,i.form={lingpai:localStorage.lingpai||"",window:localStorage.window||""}):i.$router.push({path:"/reference/theme"})):"4004"===e.errno?(i.input2E=!0,i.input2S=!1,i.notifyFn("提示",e.errmsg)):i.notifyFn("提示",e.errmsg),n.next=11;break;case 7:n.prev=7,n.t0=n.catch(0),i.notifyFn("提示","服务器错误"),console.log(n.t0);case 11:case"end":return n.stop()}},n,i,[[0,7]])}))()},signInfn:function(){var t=this;return o()(a.a.mark(function i(){var n,e,s;return a.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,n={username:t.input1,password:t.input2},i.next=4,t.$api.unsplash.signIn(n);case 4:"0"===(e=i.sent).errno?e.data&&(e.data.user_id=e.data.id,s=[],e.data.permissions.forEach(function(t,i){s.push(t.all_discripe)}),e.data.allPermission=s,sessionStorage.userInfo=l()(e.data),console.log(123),f.a.commit("changeBackAside"),sessionStorage.user_id=e.data.id,"大厅"===e.data.role?localStorage.lingpai&&localStorage.window?(e.data.lingpai=localStorage.lingpai,e.data.window=localStorage.window,sessionStorage.userInfo=l()(e.data),t.setLingPaifn({lingpai:localStorage.lingpai,win:localStorage.window,user_id:sessionStorage.user_id})):(t.dialogFormVisible=!0,t.form={lingpai:localStorage.lingpai||"",window:localStorage.window||""}):t.$router.push({path:"/mobileCall"})):"4004"===e.errno?(t.input2E=!0,t.input2S=!1,t.notifyFn("提示",e.errmsg)):t.notifyFn("提示",e.errmsg),i.next=12;break;case 8:i.prev=8,i.t0=i.catch(0),t.notifyFn("提示","服务器错误"),console.log(i.t0);case 12:case"end":return i.stop()}},i,t,[[0,8]])}))()},setLingPaifn:function(t){var i=this;return o()(a.a.mark(function n(){var e,s;return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,i.$api.unsplash.setLingPai(t);case 3:"0"===(e=n.sent).errno?(i.dialogFormVisible=!1,s={radio:"1",curTheme:"",curMatter:"",selectionElementId:[],allID:[]},sessionStorage.reference=l()(s),sessionStorage.initNum=1,i.$router.push({path:"/mobileCall"})):i.notifyFn("提示",e.errmsg),n.next=11;break;case 7:n.prev=7,n.t0=n.catch(0),i.notifyFn("提示","服务器错误"),console.log(n.t0);case 11:case"end":return n.stop()}},n,i,[[0,7]])}))()},identifyfn:function(){var t=this;return o()(a.a.mark(function i(){var n,e,s;return a.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,n={captcha:t.input3,code_id:t.code_id},i.next=4,t.$api.unsplash.identify(n);case 4:e=i.sent,console.log(e),"通过"===e.msg?(t.input3E=!1,t.input3S=!0,t.isIdentify=!0):"验证码错误"===e.msg?(t.input3E=!0,t.input3S=!1,t.isIdentify=!1):"验证码过期"===e.msg?(t.notifyFn("提示",e.msg),s=t,setTimeout(function(){s.input3="",s.input3E=!1,s.input3S=!1,s.isIdentify=!1,s.loadImgFn()},300)):(t.input3E=!0,t.input3S=!1,t.isIdentify=!1,t.notifyFn("提示",e.msg)),i.next=13;break;case 9:i.prev=9,i.t0=i.catch(0),t.notifyFn("提示","服务器错误"),console.log(i.t0);case 13:case"end":return i.stop()}},i,t,[[0,9]])}))()},notifyFn:function(t,i){this.$notify({title:t,message:i,type:"warning",dangerouslyUseHTMLString:!0,duration:5e3,position:"top-right"})}})},S={render:function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{attrs:{id:"mobileSign"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.signShow,expression:"signShow"}],staticClass:"signInWarp"},[n("div",{staticClass:"signIn"},[n("div",{staticClass:"signText"},[t._v("用户登录")]),t._v(" "),n("div",{staticClass:"inputWarp"},[n("el-input",{staticClass:"itemInput",attrs:{placeholder:"请输入账号",clearable:""},model:{value:t.input1,callback:function(i){t.input1=i},expression:"input1"}},[n("template",{slot:"prepend"},[t._v("账号")])],2),t._v(" "),t.input1E?n("i",{staticClass:"el-icon-close inputState inputStateE"}):t._e(),t._v(" "),t.input1S?n("i",{staticClass:"el-icon-check inputState inputStateS"}):t._e()],1),t._v(" "),n("div",{staticClass:"inputWarp"},[n("el-input",{staticClass:"itemInput",attrs:{placeholder:"请输入密码",type:"password",clearable:""},model:{value:t.input2,callback:function(i){t.input2=i},expression:"input2"}},[n("template",{slot:"prepend"},[t._v("密码")])],2),t._v(" "),t.input2E?n("i",{staticClass:"el-icon-close inputState inputStateE"}):t._e(),t._v(" "),t.input2S?n("i",{staticClass:"el-icon-check inputState inputStateS"}):t._e()],1),t._v(" "),n("div",{staticClass:"inputWarp"},[n("el-input",{staticClass:"itemInput",attrs:{placeholder:"请输入验证码",minlength:"4",maxlength:"4",clearable:""},model:{value:t.input3,callback:function(i){t.input3=i},expression:"input3"}},[n("template",{slot:"prepend"},[n("img",{staticStyle:{display:"inline-block"},attrs:{src:t.imgSrc,alt:""},on:{click:t.verificationClickFn}})])],2),t._v(" "),t.input3E?n("i",{staticClass:"el-icon-close inputState inputStateE"}):t._e(),t._v(" "),t.input3S?n("i",{staticClass:"el-icon-check inputState inputStateS"}):t._e()],1),t._v(" "),n("div",{staticStyle:{"text-align":"right"}},[n("el-button",{attrs:{type:"text"},on:{click:t.fixPassWordFn}},[t._v("修改密码")])],1),t._v(" "),n("el-button",{attrs:{type:"primary",disabled:t.openBtn},on:{click:t.signClickFn}},[t._v("登录")])],1)]),t._v(" "),n("el-dialog",{staticClass:"setDiaLog",attrs:{title:"设置参数",width:"550px",visible:t.dialogFormVisible,"close-on-click-modal":t.clickM},on:{"update:visible":function(i){t.dialogFormVisible=i},close:t.closeDialog}},[n("el-form",{attrs:{model:t.form}},[n("el-form-item",{attrs:{label:"信令","label-width":t.formLabelWidth}},[n("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.lingpai,callback:function(i){t.$set(t.form,"lingpai",i)},expression:"form.lingpai"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"窗口号","label-width":t.formLabelWidth}},[n("el-input",{attrs:{autocomplete:"off"},model:{value:t.form.window,callback:function(i){t.$set(t.form,"window",i)},expression:"form.window"}})],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.cancelFn}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.sureFn}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var v=n("VU/8")(m,S,!1,function(t){n("dFF9")},"data-v-2a4ee336",null);i.default=v.exports},dFF9:function(t,i){}});
//# sourceMappingURL=19.1f169d8ad109597d424a.js.map