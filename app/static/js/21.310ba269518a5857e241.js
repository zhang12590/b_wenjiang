webpackJsonp([21],{hfty:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("mvHQ"),a=n.n(s),r=n("Xxa5"),o=n.n(r),i=n("exGp"),c=n.n(i),l=n("M4fF"),u=n.n(l),p={name:"call",data:function(){return{pageTitle:"新津政务中心排队叫号系统",userIfon:{},user:{theme:"",name:""},marqueeText:"",initialMarqueeText:"",todayList:[{name:"当前窗口号",val:localStorage.window},{name:"当前办理号",val:""},{name:"等待办理人数",val:""},{name:"当天办理总数",val:"0"}],applyName:"",openApplyName:!0,applyObject:"",openApplyObject:!0,nextPerson:{name:"下一位",icon:"user",disabled:!1},reCall:{name:"重新呼叫",icon:"horn",disabled:!0},pause:{name:"暂停",icon:"pause",disabled:!1},isPause:!0,move:{name:"转号",icon:"move",disabled:!0},Acceptance:{name:"受理",icon:"Acceptance",disabled:!0},unAcceptance:{name:"未受理",icon:"unAcceptance",disabled:!0},personInfo:{}}},computed:{openAcceptance:function(){return""!==this.applyName.replace(/(^\s*)|(\s*$)/g,"")&&""!==this.applyObject.replace(/(^\s*)|(\s*$)/g,"")}},watch:{openAcceptance:function(e){this.Acceptance.disabled=!e}},created:function(){sessionStorage.userInfo?(this.userIfon=JSON.parse(sessionStorage.userInfo),this.marqueeText="欢迎 "+this.userIfon.name+" 登录系统",this.initialMarqueeText="欢迎 "+this.userIfon.name+" 登录系统",this.user={theme:this.userIfon.subject,name:this.userIfon.name}):console.log("call-无用户信息")},methods:{nextPersonFn:u.a.debounce(function(){this.callNextPersonFn()},1e3),reCallFn:u.a.debounce(function(){this.reCallHandle()},1e3),pauseFn:u.a.debounce(function(){if(this.isPause){this.pause={name:"开始",icon:"start",disabled:!1},this.pauseHandleFn();this.distributeDisabled([!0,!0,!1,!0,!0,!0],this)}else{this.pause={name:"暂停",icon:"pause",disabled:!1},this.startHandleFn();this.distributeDisabled([!1,!0,!1,!0,!0,!0],this)}this.isPause=!this.isPause},600),moveFn:u.a.debounce(function(){var e=JSON.parse(sessionStorage.reference);console.log(e),console.log(this.userIfon),"3"===e.radio?""===e.curTheme?this.$alert("请选择转号的主题","提示",{confirmButtonText:"确定",callback:function(e){}}):""===e.curMatter?this.$alert("请选择转号的事项","提示",{confirmButtonText:"确定",callback:function(e){}}):e.curTheme===this.userIfon.subject?this.$alert("转号的主题与工作人员所在主题一致，请修改","提示",{confirmButtonText:"确定",callback:function(e){}}):this.moveHandleFn(e):this.$alert("请选择转号功能","提示",{confirmButtonText:"确定",callback:function(e){}})},600),AcceptanceFn:u.a.debounce(function(){var e=this,t=JSON.parse(sessionStorage.reference);t.selectionElementId.length?t.selectionElementId.length<t.allID.length?this.myAlert("审查要素未核对完","提示"):this.$alert("请确定当前事项合格","提示",{confirmButtonText:"确定",callback:function(t){var n=JSON.parse(sessionStorage.reference);"2"===n.radio&&(e.personInfo.subject=n.curTheme,e.personInfo.item=n.curMatter),e.personInfo.deal_status="Y",e.AcceptanceHandleFn()}}):this.myAlert("请核对审查要素","提示")},600),unAcceptanceFn:u.a.debounce(function(){var e=this;this.$alert("请确定当前事项不合格","提示",{confirmButtonText:"确定",callback:function(t){var n=JSON.parse(sessionStorage.reference);"2"===n.radio&&(e.personInfo.subject=n.curTheme,e.personInfo.item=n.curMatter),e.personInfo.deal_status="N",e.AcceptanceHandleFn()}})},600),outBtnFn:u.a.debounce(function(){var e=this;this.$confirm("确认是否退出？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){sessionStorage.user_id?e.signOutFn({user_id:sessionStorage.user_id}):(e.notifyFn("提示","用户未登陆"),e.$router.push("/mobileSign"))}).catch(function(){})},600),signOutFn:function(e){var t=this;return c()(o.a.mark(function n(){var s;return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$api.unsplash.signOut(e);case 3:s=n.sent,console.log(s),"0"===s.errno?(sessionStorage.clear(),t.$router.push("/mobileSign")):t.notifyFn("提示",s.errmsg),n.next=12;break;case 8:n.prev=8,n.t0=n.catch(0),t.notifyFn("提示","服务器错误"),console.log(n.t0);case 12:case"end":return n.stop()}},n,t,[[0,8]])}))()},callNextPersonFn:function(){var e=this;return c()(o.a.mark(function t(){var n,s,a,r,i,c;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n=e.userIfon,t.next=4,e.$api.unsplash.getNextPerson(n);case 4:s=t.sent,console.log(s),"0"===s.errno?(e.personInfo=s.data.business,e.personInfo.user_id=e.userIfon.user_id,e.personInfo.lingpai=localStorage.lingpai,e.todayList[1].val=e.personInfo.number,e.todayList[2].val=s.data.wait,e.todayList[3].val=s.data.called,e.applyName="",e.applyObject="",e.openApplyName=!1,e.openApplyObject=!1,e.personInfo.cometimes+1>=3?e.marqueeText="流水号:<b>"+e.personInfo.water_num+'</b>，本次为<b style="color:red;">第'+(e.personInfo.cometimes+1)+"次</b>来办理<b>"+e.personInfo.item+'</b>，<b style="color:red;">请认真对待每位群众</b>':e.marqueeText="流水号:<b>"+e.personInfo.water_num+"</b>，本次为第"+(e.personInfo.cometimes+1)+"次来办理<b>"+e.personInfo.item+'</b>，<b style="">请认真对待每位群众</b>',e.getElement(e.personInfo.item),a=[!0,!1,!0,!1,!0,!1],e.distributeDisabled(a,e)):"4004"===s.errno?(e.todayList[1].val="",e.notifyFn("提示",s.errmsg),r=[!1,!0,!1,!0,!0,!0],e.distributeDisabled(r,e)):(e.todayList[1].val="",e.notifyFn("提示",s.errmsg),i=[!1,!0,!1,!0,!0,!0],e.distributeDisabled(i,e)),t.next=15;break;case 9:t.prev=9,t.t0=t.catch(0),e.notifyFn("提示","服务器错误"),c=[!1,!0,!1,!0,!0,!0],e.distributeDisabled(c,e),console.log(t.t0);case 15:case"end":return t.stop()}},t,e,[[0,9]])}))()},getElement:function(e){var t=this;return c()(o.a.mark(function n(){var s,r,i,c,l,u;return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,s={item:e},n.next=4,t.$api.unsplash.postElements(s);case 4:if("0"===(r=n.sent).errno){for(i=r.data,c=[],l=0;l<i.length;l++)i[l].index=l+1,c.push(i[l].id);u={radio:"1",curTheme:t.personInfo.subject,curMatter:t.personInfo.item,allID:c,selectionElementId:t.personInfo.last_reviews?t.personInfo.last_reviews.split("-"):[]},sessionStorage.reference=a()(u)}else t.notifyFn("提示",r.errmsg);n.next=12;break;case 8:n.prev=8,n.t0=n.catch(0),t.notifyFn("提示","服务器错误"),console.log(n.t0);case 12:case"end":return n.stop()}},n,t,[[0,8]])}))()},reCallHandle:function(){var e=this;return c()(o.a.mark(function t(){var n,s;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n={water_num:e.personInfo.water_num,lingpai:localStorage.lingpai,user_id:sessionStorage.user_id},t.next=4,e.$api.unsplash.postReCall(n);case 4:"0"===(s=t.sent).errno?e.notifyFn("提示","正在重呼","success"):e.notifyFn("提示",s.errmsg),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),e.notifyFn("提示","服务器错误"),console.log(t.t0);case 12:case"end":return t.stop()}},t,e,[[0,8]])}))()},pauseHandleFn:function(){var e=this;return c()(o.a.mark(function t(){var n,s;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n={lingpai:localStorage.lingpai,user_id:sessionStorage.user_id},t.next=4,e.$api.unsplash.postPause(n);case 4:"0"===(s=t.sent).errno?e.afterDealed(e):e.notifyFn("提示",s.errmsg),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),e.notifyFn("提示","服务器错误"),console.log(t.t0);case 12:case"end":return t.stop()}},t,e,[[0,8]])}))()},startHandleFn:function(){var e=this;return c()(o.a.mark(function t(){var n,s;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n={lingpai:localStorage.lingpai,user_id:sessionStorage.user_id},t.next=4,e.$api.unsplash.postStart(n);case 4:"0"===(s=t.sent).errno?e.afterDealed(e):e.notifyFn("提示",s.errmsg),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),e.notifyFn("提示","服务器错误"),console.log(t.t0);case 12:case"end":return t.stop()}},t,e,[[0,8]])}))()},moveHandleFn:function(e){var t=this;return c()(o.a.mark(function n(){var s,a,r;return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,(s=t.personInfo).subject=e.curTheme,s.item=e.curMatter,console.log(t.personInfo),n.next=7,t.$api.unsplash.postMove(s);case 7:a=n.sent,console.log(a),"0"===a.errno?(t.afterDealed(t),r=[!1,!0,!1,!0,!0,!0],t.distributeDisabled(r,t)):t.notifyFn("提示",a.errmsg),n.next=16;break;case 12:n.prev=12,n.t0=n.catch(0),t.notifyFn("提示","服务器错误"),console.log(n.t0);case 16:case"end":return n.stop()}},n,t,[[0,12]])}))()},AcceptanceHandleFn:function(){var e=this;return c()(o.a.mark(function t(){var n,s,a,r;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n=JSON.parse(sessionStorage.reference),e.personInfo.reviews=n.selectionElementId.join("-"),e.personInfo.p_name=e.applyName.replace(/(^\s*)|(\s*$)/g,""),e.personInfo.p_project=e.applyObject.replace(/(^\s*)|(\s*$)/g,""),s=e.personInfo,console.log(e.personInfo),t.next=9,e.$api.unsplash.postAcceptance(s);case 9:a=t.sent,console.log(a),"0"===a.errno?(e.afterDealed(e),r=[!1,!0,!1,!0,!0,!0],e.distributeDisabled(r,e)):e.notifyFn("提示",a.errmsg),t.next=18;break;case 14:t.prev=14,t.t0=t.catch(0),e.notifyFn("提示","服务器错误"),console.log(t.t0);case 18:case"end":return t.stop()}},t,e,[[0,14]])}))()},notifyFn:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"warning";this.$notify({title:e,message:t,type:n,dangerouslyUseHTMLString:!0,duration:5e3,position:"top-right"})},myAlert:function(e,t){this.$alert(e,t,{confirmButtonText:"确定",callback:function(e){}})},distributeDisabled:function(e,t){t.nextPerson.disabled=e[0],t.reCall.disabled=e[1],t.pause.disabled=e[2],t.move.disabled=e[3],t.Acceptance.disabled=e[4],t.unAcceptance.disabled=e[5]},afterDealed:function(e){e.todayList[1].val="",e.applyName="",e.openApplyName=!0,e.applyObject="",e.openApplyObject=!0}}},d={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mobileCall"},[n("div",{staticClass:"titleWarp"},[n("h1",{staticClass:"pageTitle"},[e._v(e._s(e.pageTitle))]),e._v(" "),n("div",{staticClass:"userWarp"},[e._m(0),e._v(" "),n("div",{staticClass:"userText"},[n("p",{staticClass:"userT"},[e._v("部门："),n("span",{staticStyle:{"font-weight":"lighter"}},[e._v(e._s(e.user.theme))])]),e._v(" "),n("p",{staticClass:"userT"},[e._v("姓名："),n("span",{staticStyle:{"font-weight":"lighter"}},[e._v(e._s(e.user.name))])])]),e._v(" "),n("div",{staticClass:"outBtnWarp"},[n("el-button",{staticClass:"outBtn",attrs:{type:"text"},on:{click:e.outBtnFn}},[n("svg-icon",{staticClass:"signOutIcon",attrs:{"icon-class":"signOut"}})],1)],1)])]),e._v(" "),n("div",{staticClass:"showArea"},[n("el-row",{attrs:{gutter:20}},e._l(e.todayList,function(t,s){return n("el-col",{key:s,attrs:{span:6}},[n("div",{staticClass:"grid-content bg-purple"},[e._v(e._s(t.name))]),e._v(" "),n("div",[e._v(e._s(t.val))])])}),1)],1),e._v(" "),n("div",{staticClass:"marqueeWarp"},[n("marquee",{attrs:{behavior:"alternate",scrollamount:"3"},domProps:{innerHTML:e._s(e.marqueeText)}})],1),e._v(" "),e._e(),e._v(" "),n("div",{staticClass:"btnWarp"},[n("el-row",{attrs:{gutter:20}},[n("el-col",{staticClass:"itemBtnWarp",attrs:{span:8}},[n("el-button",{staticClass:"itemBtn",attrs:{type:"info",disabled:e.nextPerson.disabled},on:{click:e.nextPersonFn}},[n("svg-icon",{staticClass:"btnSvg",attrs:{"icon-class":e.nextPerson.icon}})],1),e._v(" "),n("div",{staticClass:"btnBottomText"},[e._v(e._s(e.nextPerson.name))])],1),e._v(" "),n("el-col",{staticClass:"itemBtnWarp",attrs:{span:8}},[n("el-button",{staticClass:"itemBtn",attrs:{type:"info",disabled:e.reCall.disabled},on:{click:e.reCallFn}},[n("svg-icon",{staticClass:"btnSvg",attrs:{"icon-class":e.reCall.icon}})],1),e._v(" "),n("div",{staticClass:"btnBottomText"},[e._v(e._s(e.reCall.name))])],1),e._v(" "),n("el-col",{staticClass:"itemBtnWarp",attrs:{span:8}},[n("el-button",{staticClass:"itemBtn",attrs:{type:"info",disabled:e.pause.disabled},on:{click:e.pauseFn}},[n("svg-icon",{staticClass:"btnSvg",attrs:{"icon-class":e.pause.icon}})],1),e._v(" "),n("div",{staticClass:"btnBottomText"},[e._v(e._s(e.pause.name))])],1),e._v(" "),n("el-col",{staticClass:"itemBtnWarp",attrs:{span:8}},[n("el-button",{staticClass:"itemBtn",attrs:{type:"info",disabled:e.move.disabled},on:{click:e.moveFn}},[n("svg-icon",{staticClass:"btnSvg",attrs:{"icon-class":e.move.icon}})],1),e._v(" "),n("div",{staticClass:"btnBottomText"},[e._v(e._s(e.move.name))])],1),e._v(" "),n("el-col",{staticClass:"itemBtnWarp",attrs:{span:8}},[n("el-button",{staticClass:"itemBtn",attrs:{type:"info",disabled:!e.openAcceptance},on:{click:e.AcceptanceFn}},[n("svg-icon",{staticClass:"btnSvg",attrs:{"icon-class":e.Acceptance.icon}})],1),e._v(" "),n("div",{staticClass:"btnBottomText"},[e._v(e._s(e.Acceptance.name))])],1),e._v(" "),n("el-col",{staticClass:"itemBtnWarp",attrs:{span:8}},[n("el-button",{staticClass:"itemBtn",attrs:{type:"info",disabled:e.unAcceptance.disabled},on:{click:e.unAcceptanceFn}},[n("svg-icon",{staticClass:"btnSvg",attrs:{"icon-class":e.unAcceptance.icon}})],1),e._v(" "),n("div",{staticClass:"btnBottomText"},[e._v(e._s(e.unAcceptance.name))])],1)],1)],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"userImgWarp"},[t("img",{staticClass:"userImg",attrs:{src:n("3Q4B"),alt:"missing"}})])}]};var f=n("VU/8")(p,d,!1,function(e){n("yJ5b")},"data-v-03555410",null);t.default=f.exports},yJ5b:function(e,t){}});
//# sourceMappingURL=21.310ba269518a5857e241.js.map