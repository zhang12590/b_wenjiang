webpackJsonp([20],{AYRx:function(t,i){},hvAp:function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=n("Xxa5"),s=n.n(e),p=n("exGp"),a=n.n(p),u=n("sUjr"),c=n("M4fF"),l=n.n(c),r=n("bJ7G"),o={name:"Sign",data:function(){return{signTitle:r.a.title,signShow:!0,input1:"",input1E:!1,input1S:!1,input2:"",input2E:!1,input2S:!1,input3:"",input3E:!1,input3S:!1,input4:"",input4E:!1,input4S:!1,imgSrc:"",code_id:"",baseUrl:u.a}},computed:{openBtn:function(){return!(""!==this.input1&&""!==this.input2&&""!==this.input3&&this.input3===this.input4)}},watch:{input3:function(t){if(""!==this.input3&&this.input3===this.input4)return this.input4S=!0,this.input4E=!1,!0;""!==this.input4&&this.input3!==this.input4?(this.input4S=!1,this.input4E=!0):(this.input4S=!1,this.input4E=!1)},input4:function(t){if(""!==this.input3&&this.input3===this.input4)return this.input4S=!0,this.input4E=!1,!0;""!==this.input4&&this.input3!==this.input4?(this.input4S=!1,this.input4E=!0):(this.input4S=!1,this.input4E=!1)}},created:function(){},methods:{signClickFn:l.a.debounce(function(){this.signInfn()},500),signInfn:function(){var t=this;return a()(s.a.mark(function i(){var n,e,p,a;return s.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,n={login_name:t.input1,oldpwd:t.input2,newpwd:t.input3},i.next=4,t.$api.unsplash.fix(n);case 4:"0"===(e=i.sent).errno?(t.notifyFn("提示","修改密码成功,将跳转到登录页面","success"),p=t,setTimeout(function(){p.$router.push({path:"/mobileSign"})},3e3)):"4106"===e.errno?(t.input2E=!0,t.input2S=!1,a=t,setTimeout(function(){a.input2E=!1,a.input2S=!1},3e3)):t.notifyFn("提示",e.errmsg),i.next=12;break;case 8:i.prev=8,i.t0=i.catch(0),t.notifyFn("提示","服务器错误"),console.log(i.t0);case 12:case"end":return i.stop()}},i,t,[[0,8]])}))()},identifyfn:function(){var t=this;return a()(s.a.mark(function i(){var n,e;return s.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,n={captcha:t.input3,code_id:t.code_id},i.next=4,t.$api.unsplash.identify(n);case 4:e=i.sent,console.log(e),"通过"===e.msg||t.notifyFn("提示",e.msg),i.next=13;break;case 9:i.prev=9,i.t0=i.catch(0),t.notifyFn("提示","服务器错误"),console.log(i.t0);case 13:case"end":return i.stop()}},i,t,[[0,9]])}))()},notifyFn:function(t,i){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"warning";this.$notify({title:t,message:i,type:n,dangerouslyUseHTMLString:!0,duration:5e3,position:"top-right"})}}},h={render:function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{attrs:{id:"fix"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.signShow,expression:"signShow"}],staticClass:"signInWarp"},[n("div",{staticClass:"upBgWarp"},[n("div",{staticClass:"signText"},[t._v(t._s(t.signTitle)+"-修改密码")])]),t._v(" "),n("div",{staticClass:"signIn"},[n("div",{staticClass:"inputWarp"},[n("el-input",{staticClass:"itemInput",attrs:{placeholder:"请输入账号",clearable:""},model:{value:t.input1,callback:function(i){t.input1=i},expression:"input1"}},[n("template",{slot:"prepend"},[t._v("账号")])],2),t._v(" "),t.input1E?n("i",{staticClass:"el-icon-close inputState inputStateE"}):t._e(),t._v(" "),t.input1S?n("i",{staticClass:"el-icon-check inputState inputStateS"}):t._e()],1),t._v(" "),n("div",{staticClass:"inputWarp"},[n("el-input",{staticClass:"itemInput",attrs:{type:"password",placeholder:"请输入旧密码",clearable:""},model:{value:t.input2,callback:function(i){t.input2=i},expression:"input2"}},[n("template",{slot:"prepend"},[t._v("旧密码")])],2),t._v(" "),t.input2E?n("i",{staticClass:"el-icon-close inputState inputStateE"}):t._e(),t._v(" "),t.input2S?n("i",{staticClass:"el-icon-check inputState inputStateS"}):t._e()],1),t._v(" "),n("div",{staticClass:"inputWarp"},[n("el-input",{staticClass:"itemInput",attrs:{type:"password",placeholder:"请输入新密码",clearable:""},model:{value:t.input3,callback:function(i){t.input3=i},expression:"input3"}},[n("template",{slot:"prepend"},[t._v("新密码")])],2),t._v(" "),t.input3E?n("i",{staticClass:"el-icon-close inputState inputStateE"}):t._e(),t._v(" "),t.input3S?n("i",{staticClass:"el-icon-check inputState inputStateS"}):t._e()],1),t._v(" "),n("div",{staticClass:"inputWarp"},[n("el-input",{staticClass:"itemInput",attrs:{type:"password",placeholder:"请再输入新密码",clearable:""},model:{value:t.input4,callback:function(i){t.input4=i},expression:"input4"}},[n("template",{slot:"prepend"},[t._v("确认")])],2),t._v(" "),t.input4E?n("i",{staticClass:"el-icon-close inputState inputStateE"}):t._e(),t._v(" "),t.input4S?n("i",{staticClass:"el-icon-check inputState inputStateS"}):t._e()],1),t._v(" "),n("el-button",{staticClass:"signBtn",attrs:{type:"primary",disabled:t.openBtn},on:{click:t.signClickFn}},[t._v("提交")])],1)])])},staticRenderFns:[]};var d=n("VU/8")(o,h,!1,function(t){n("AYRx")},null,null);i.default=d.exports}});
//# sourceMappingURL=20.f94291b5be5778ab9539.js.map