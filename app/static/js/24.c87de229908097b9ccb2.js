webpackJsonp([24],{b96u:function(t,e){},qrjE:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Xxa5"),s=a.n(i),n=a("exGp"),l=a.n(n),r=a("IcnI"),c=a("p5Jx"),o={name:"Sign",store:r.a,data:function(){return{detailsData:[],nextProcess:"下一步"}},watch:{},computed:{matter:function(){return sessionStorage.detailsMatter||""}},created:function(){this.matterDetailsFn({item:this.matter})},methods:{matterDetailsFn:function(t){var e=this;return l()(s.a.mark(function a(){var i;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,e.$api.unsplash.itemHistory(t);case 3:i=a.sent,console.log(i),"0"===i.errno?e.detailsData=c.a.addSequence(i.data):(e.detailsData=[],e.notifyFn("提示",i.errmsg)),a.next=13;break;case 8:a.prev=8,a.t0=a.catch(0),e.detailsData=[],e.notifyFn("提示","服务器错误"),console.log(a.t0);case 13:case"end":return a.stop()}},a,e,[[0,8]])}))()},notifyFn:function(t,e){this.$notify({title:t,message:e,type:"warning",dangerouslyUseHTMLString:!0,duration:5e3,position:"top-right"})}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"matterD"}},[a("h2",{staticClass:"title"},[t._v("今日各"+t._s(t.matter)+"事项详情")]),t._v(" "),a("div",{staticClass:"detailsWarp"},t._l(t.detailsData,function(e,i){return a("div",{key:i,staticClass:"details"},[a("div",{staticClass:"itemTitle"},[t._v(t._s(e.index)+". 流水号："+t._s(e.water_num))]),t._v(" "),a("el-timeline",[t._l(e.processinfo,function(e,i){return a("el-timeline-item",{key:i,attrs:{color:"Y"===e.result?"#0bbd87":"#ff6a1e",timestamp:e.starts,placement:"top"}},[a("el-card",[a("h4",{staticStyle:{"margin-bottom":"10px",height:"25px","line-height":"25px","vertical-align":"middle"}},[a("span",{staticStyle:{display:"inline-block","vertical-align":"middle"}},[a("svg-icon",{staticStyle:{width:"25px",height:"25px"},attrs:{"icon-class":"processUser"}})],1),t._v(" "),a("span",{staticStyle:{display:"inline-block","vertical-align":"middle"}},[t._v(t._s(e.current_process))])]),t._v(" "),a("p",[t._v(t._s(e.user)+" 提交于 "+t._s(e.ends))]),t._v(" "),a("p",{staticStyle:{"line-height":"1.2em"}},[t._v("备注："),a("span",{domProps:{textContent:t._s(e.discription||"无")}})])])],1)}),t._v(" "),a("el-timeline-item",{attrs:{timestamp:t.nextProcess,placement:"top"}},[a("el-card",[a("h4",{staticStyle:{height:"25px","line-height":"25px","vertical-align":"middle"}},[a("span",{staticStyle:{display:"inline-block","vertical-align":"middle"}},[a("svg-icon",{staticStyle:{width:"25px",height:"25px"},attrs:{"icon-class":"nextProcess"}})],1),t._v(" "),a("span",{staticStyle:{display:"inline-block","vertical-align":"middle"}},[t._v(t._s(e.next_process))])])])],1)],2)],1)}),0),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:0===t.detailsData.length,expression:"detailsData.length === 0"}],staticClass:"noData"},[a("svg-icon",{staticClass:"svgIcon",attrs:{"icon-class":"no_data"}})],1)])},staticRenderFns:[]};var p=a("VU/8")(o,d,!1,function(t){a("b96u")},null,null);e.default=p.exports}});
//# sourceMappingURL=24.c87de229908097b9ccb2.js.map