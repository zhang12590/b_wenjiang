webpackJsonp([12],{"97ul":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s("Xxa5"),a=s.n(r),i=s("exGp"),n=s.n(i),o=s("sUjr"),c={name:"address",store:s("IcnI").a,data:function(){return{toNext:"/",baseUrl:o.a,homeLink:"/line/lineHome.html",homeVisible:!1,backLink:"/line/lineTheme.html",backVisible:!1,Title:"新津政务中心排队系统",curWay:"地址",curPos:"请选择地址",isAddr:!0,addrList:[],curTheme:"",curAddr:"",curPageNum:1,timeShow:!1,timeOut:60,loadAdderDialogVisible:!1}},watch:{},computed:{total:function(){return Math.ceil(this.addrList.length/12)},curAddrList:function(){return this.addrList.slice(12*(this.curPageNum-1),12*(this.curPageNum-1)+12)}},created:function(){this.getAddrFn({}),this.curAddr=localStorage.addr||""},mounted:function(){},methods:{addrBtnClick:function(t){localStorage.addr=t,this.postAddrFn({addr:t})},leftList:function(){this.curPageNum<=1?this.curPageNum=1:this.curPageNum=this.curPageNum-1},rightList:function(){this.curPageNum>=this.total?this.curPageNum=this.total:this.curPageNum=this.curPageNum+1},getAddrFn:function(t){var e=this;return n()(a.a.mark(function s(){var r;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,e.$api.unsplash.getAddr(t);case 3:"0"===(r=s.sent).errno?e.addrList=r.data.addrs:e.notifyFn("提示",r.errmsg),s.next=11;break;case 7:s.prev=7,s.t0=s.catch(0),e.notifyFn("提示","服务器错误"),console.log(s.t0);case 11:case"end":return s.stop()}},s,e,[[0,7]])}))()},postAddrFn:function(t){var e=this;return n()(a.a.mark(function s(){var r;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,e.$api.unsplash.postAddr(t);case 3:"0"===(r=s.sent).errno?e.$router.push("/"):e.notifyFn("提示",r.errmsg),s.next=11;break;case 7:s.prev=7,s.t0=s.catch(0),e.notifyFn("提示","服务器错误"),console.log(s.t0);case 11:case"end":return s.stop()}},s,e,[[0,7]])}))()},notifyFn:function(t,e){this.$notify({title:t,message:e,type:"warning",dangerouslyUseHTMLString:!0,duration:5e3,position:"top-right"})}}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"address"}},[s("div",{attrs:{id:"XJList"}},[s("div",{staticClass:"webHeader"},[s("el-row",{staticClass:"one-btn"},[t.homeVisible?s("el-button",{staticClass:"home-btn",attrs:{type:"primary",round:"",icon:"el-icon-star-off"},on:{click:t.homeBtnClick}},[t._v("首页")]):t._e(),t._v(" "),t.backVisible?s("el-button",{staticClass:"back-btn",attrs:{type:"warning",round:"",icon:"el-icon-back"},on:{click:t.backBtnClick}},[t._v("返回")]):t._e()],1),t._v(" "),s("el-row",{staticClass:"topTitle"},[s("h3",[t._v(t._s(t.Title))])])],1),t._v(" "),s("div",{staticClass:"webContent"},[s("div",{staticClass:"webNav"},[s("div",{staticClass:"curWay"},[t._v(t._s(t.curWay))]),t._v(" "),s("div",{staticClass:"curPos"},[t._v(t._s(t.curPos))])]),t._v(" "),s("div",{staticClass:"groupBtn"},[s("el-row",{directives:[{name:"show",rawName:"v-show",value:t.isAddr,expression:"isAddr"}],staticClass:"matterBtnToNext",attrs:{gutter:30}},t._l(t.curAddrList,function(e,r){return s("el-col",{key:r,attrs:{xs:12,sm:8}},[s("el-button-group",[s("el-button",{attrs:{type:e.name===t.curAddr?"warning":"primary"},on:{click:function(s){return t.addrBtnClick(e.name)}}},[s("div",{staticClass:"matterName"},[t._v(t._s(e.name))])])],1)],1)}),1)],1),t._v(" "),s("div",{staticClass:"webFooter"},[s("div",{staticClass:"footerBtn"},[s("el-row",{directives:[{name:"show",rawName:"v-show",value:t.addrList.length>12,expression:"(addrList.length > 12)"}],staticClass:"themeFooterBtn",attrs:{gutter:20}},[s("el-col",{attrs:{span:3,offset:8}},[s("el-button",{attrs:{type:1===t.curPageNum?"info":"warning"},on:{click:t.leftList}},[s("i",{staticClass:"el-icon-arrow-left el-icon--left"}),t._v("上一页")])],1),t._v(" "),s("el-col",{attrs:{span:3,offset:2}},[s("el-button",{attrs:{type:t.curPageNum>=t.total?"info":"warning"},on:{click:t.rightList}},[t._v("下一页"),s("i",{staticClass:"el-icon-arrow-right el-icon--right"})])],1)],1)],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.timeShow,expression:"timeShow"}],staticClass:"timeOut"},[t._v("本页面将在"),s("span",{staticStyle:{color:"rgb(255,67,68)"}},[t._v(t._s(t.timeOut)+"s")]),t._v("后返回首页")])])])])])},staticRenderFns:[]};var u=s("VU/8")(c,l,!1,function(t){s("TA6s")},"data-v-7664d58e",null);e.default=u.exports},TA6s:function(t,e){}});
//# sourceMappingURL=12.2135270ee2dbd56d177c.js.map