webpackJsonp([5],{"0DFf":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=r("Xxa5"),a=r.n(s),i=r("exGp"),n=r.n(i),o=r("sUjr"),c=r("IcnI"),u=r("p5Jx"),l={name:"mobileAddress",store:c.a,data:function(){return{toNext:"/",baseUrl:o.a,homeLink:"/line/lineHome.html",homeVisible:!1,backLink:"/line/lineTheme.html",backVisible:!1,Title:"新津政务中心排队系统",curWay:"地址",curPos:"请选择地址",isAddr:!0,addrList:[],curTheme:"",curAddr:"",curPageNum:1,timeShow:!1,timeOut:60,loadAdderDialogVisible:!1}},watch:{},computed:{total:function(){return Math.ceil(this.addrList.length/12)},curAddrList:function(){return this.addrList.slice(12*(this.curPageNum-1),12*(this.curPageNum-1)+12)}},created:function(){this.getAddrFn({}),localStorage.addr=u.a.getCookie("addr"),this.curAddr=localStorage.addr||""},mounted:function(){},methods:{addrBtnClick:function(t){localStorage.addr=t,this.postAddrFn({addr:t})},leftList:function(){this.curPageNum<=1?this.curPageNum=this.curPageNum:this.curPageNum=this.curPageNum-1},rightList:function(){this.curPageNum>=this.total?this.curPageNum=this.curPageNum:this.curPageNum=this.curPageNum+1},getAddrFn:function(t){var e=this;return n()(a.a.mark(function r(){var s;return a.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.$api.unsplash.getAddr(t);case 3:"0"===(s=r.sent).errno?e.addrList=s.data.addrs:e.notifyFn("提示",s.errmsg),r.next=11;break;case 7:r.prev=7,r.t0=r.catch(0),e.notifyFn("提示","服务器错误"),console.log(r.t0);case 11:case"end":return r.stop()}},r,e,[[0,7]])}))()},postAddrFn:function(t){var e=this;return n()(a.a.mark(function r(){var s;return a.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.$api.unsplash.postAddr(t);case 3:"0"===(s=r.sent).errno?e.$router.push("/mobileSign"):e.notifyFn("提示",s.errmsg),r.next=11;break;case 7:r.prev=7,r.t0=r.catch(0),e.notifyFn("提示","服务器错误"),console.log(r.t0);case 11:case"end":return r.stop()}},r,e,[[0,7]])}))()},notifyFn:function(t,e){this.$notify({title:t,message:e,type:"warning",dangerouslyUseHTMLString:!0,duration:5e3,position:"top-right"})}}},d={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"address"}},[r("div",{attrs:{id:"XJList"}},[r("div",{staticClass:"webHeader"},[r("el-row",{staticClass:"one-btn"},[t.homeVisible?r("el-button",{staticClass:"home-btn",attrs:{type:"primary",round:"",icon:"el-icon-star-off"},on:{click:t.homeBtnClick}},[t._v("首页")]):t._e(),t._v(" "),t.backVisible?r("el-button",{staticClass:"back-btn",attrs:{type:"warning",round:"",icon:"el-icon-back"},on:{click:t.backBtnClick}},[t._v("返回")]):t._e()],1),t._v(" "),r("el-row",{staticClass:"topTitle"},[r("h3",[t._v(t._s(t.Title))])])],1),t._v(" "),r("div",{staticClass:"webContent"},[r("div",{staticClass:"webNav"},[r("div",{staticClass:"curWay"},[t._v(t._s(t.curWay))]),t._v(" "),r("div",{staticClass:"curPos"},[t._v(t._s(t.curPos))])]),t._v(" "),r("div",{staticClass:"groupBtn"},[r("el-row",{directives:[{name:"show",rawName:"v-show",value:t.isAddr,expression:"isAddr"}],staticClass:"matterBtnToNext",attrs:{gutter:30}},t._l(t.curAddrList,function(e,s){return r("el-col",{key:s,attrs:{xs:12,sm:8}},[r("el-button-group",[r("el-button",{attrs:{type:e.name===t.curAddr?"warning":"primary"},on:{click:function(r){return t.addrBtnClick(e.name)}}},[r("div",{staticClass:"matterName"},[t._v(t._s(e.name))])])],1)],1)}),1)],1),t._v(" "),r("div",{staticClass:"webFooter"},[r("div",{staticClass:"footerBtn"},[r("el-row",{directives:[{name:"show",rawName:"v-show",value:t.addrList.length>12,expression:"(addrList.length > 12)"}],staticClass:"themeFooterBtn",attrs:{gutter:20}},[r("el-col",{attrs:{span:3,offset:8}},[r("el-button",{attrs:{type:1===t.curPageNum?"info":"warning"},on:{click:t.leftList}},[r("i",{staticClass:"el-icon-arrow-left el-icon--left"}),t._v("上一页")])],1),t._v(" "),r("el-col",{attrs:{span:3,offset:2}},[r("el-button",{attrs:{type:t.curPageNum>=t.total?"info":"warning"},on:{click:t.rightList}},[t._v("下一页"),r("i",{staticClass:"el-icon-arrow-right el-icon--right"})])],1)],1)],1),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.timeShow,expression:"timeShow"}],staticClass:"timeOut"},[t._v("本页面将在"),r("span",{staticStyle:{color:"rgb(255,67,68)"}},[t._v(t._s(t.timeOut)+"s")]),t._v("后返回首页")])])])])])},staticRenderFns:[]};var h=r("VU/8")(l,d,!1,function(t){r("JcoR")},"data-v-dd3fe19a",null);e.default=h.exports},JcoR:function(t,e){}});
//# sourceMappingURL=5.ab6178679dfe03f76396.js.map