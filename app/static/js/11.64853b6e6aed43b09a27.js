webpackJsonp([11],{MZbT:function(t,e){},kAO4:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Xxa5"),r=a.n(s),n=a("exGp"),o=a.n(n),i=a("p5Jx"),l=a("IcnI"),c="",m={name:"dataAnalysis",data:function(){return{realData:{Total:"",didBNum:"",moveNum:"",pickNum:"",waitNum:"",waitTime:""},tableData:[],dataAnalysisData:{},date1:i.a.formatTimeOne((new Date).getTime()),date2:i.a.formatTimeOne((new Date).getTime()),form1:{date3:i.a.formatTimeOne((new Date).getTime()),theme:"",matter:"",person:""},themeList:[],matterList:[],personList:[]}},created:function(){this.getThemeFn(),this.getDataAnalysisFn()},mounted:function(){this.searchNumberChangeFn(),this.setIntervalFn()},methods:{setIntervalFn:function(){var t=this;this.searchPassDealChangeFn(),clearInterval(c),c=setInterval(function(){t.searchPassDealChangeFn()},18e4)},searchNumberChangeFn:function(){var t={date:this.date1,user_id:sessionStorage.user_id};console.log(t),this.TakeNumFn(t)},TakeNumFn:function(t){var e=this;return o()(r.a.mark(function a(){var s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,e.$api.unsplash.postTakeNum(t);case 3:s=a.sent,console.log(s),"0"===s.errno?e.barAndLineThree("pic1",s.data):e.notifyFn("提示",s.errmsg),a.next=12;break;case 8:a.prev=8,a.t0=a.catch(0),e.notifyFn("提示","服务器错误"),console.log(a.t0);case 12:case"end":return a.stop()}},a,e,[[0,8]])}))()},searchPassDealChangeFn:function(){var t={date:this.date2,user_id:sessionStorage.user_id};console.log(t),this.PassDealFn(t)},PassDealFn:function(t){var e=this;return o()(r.a.mark(function a(){var s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,e.$api.unsplash.postPassDeal(t);case 3:s=a.sent,console.log(s),"0"===s.errno?e.barAndLineFour("pic2",s.data):e.notifyFn("提示",s.errmsg),a.next=12;break;case 8:a.prev=8,a.t0=a.catch(0),e.notifyFn("提示","服务器错误"),console.log(a.t0);case 12:case"end":return a.stop()}},a,e,[[0,8]])}))()},searchPersonChangeFn:function(){var t={date:this.form1.date3,subject:this.form1.theme,item:this.form1.matter,people_id:this.form1.person,user_id:sessionStorage.user_id};console.log(t),this.PersonDealFn(t)},searchPersonTimeChangeFn:function(){if(this.form1.person){var t={date:this.form1.date3,subject:this.form1.theme,item:this.form1.matter,people_id:this.form1.person,user_id:sessionStorage.user_id};this.PersonDealFn(t)}},PersonDealFn:function(t){var e=this;return o()(r.a.mark(function a(){var s,n;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,e.$api.unsplash.postPersonDeal(t);case 3:s=a.sent,console.log(s),"0"===s.errno?(n=s.data,e.barAndLineOne("pic3",n.week),e.barAndLineTwo("pic4",n.timeSlot)):e.notifyFn("提示",s.errmsg),a.next=12;break;case 8:a.prev=8,a.t0=a.catch(0),e.notifyFn("提示","服务器错误"),console.log(a.t0);case 12:case"end":return a.stop()}},a,e,[[0,8]])}))()},changeThemeFn:function(){this.getMatterFn(this.form1.theme)},changeMatterFn:function(){var t={subject:this.form1.theme,item:this.form1.matter,user_id:sessionStorage.user_id};this.getPersonFn(t)},getDataAnalysisFn:function(){var t=this;return o()(r.a.mark(function e(){var a,s,n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={},e.next=4,t.$api.unsplash.postDataAnalysis(a);case 4:"0"===(s=e.sent).errno?(t.dataAnalysisData=s.data,t.realData=s.data.realData,n=s.data.matterTop5.data.slice(0,10),t.tableData=i.a.addSequence(n),console.log(11,t.tableData)):t.notifyFn("提示",s.errmsg),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),t.notifyFn("提示","服务器错误"),console.log(e.t0);case 12:case"end":return e.stop()}},e,t,[[0,8]])}))()},getThemeFn:function(){var t=this;return o()(r.a.mark(function e(){var a,s,n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={},e.next=4,t.$api.unsplash.getSubjects(a);case 4:if(s=e.sent,console.log(s),t.themeList=[],"0"===s.errno){for(n=0;n<s.data.subjects.length;n++)t.themeList.push({label:s.data.subjects[n].name,val:s.data.subjects[n].id});t.themeList.length?(t.form1.theme=t.themeList[0].label,t.getMatterFn(t.themeList[0].label)):t.form1.theme=""}else t.notifyFn("提示",s.errmsg);e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),t.notifyFn("提示","服务器错误"),console.log(e.t0);case 14:case"end":return e.stop()}},e,t,[[0,10]])}))()},getMatterFn:function(t){var e=this;return o()(r.a.mark(function a(){var s,n,o,i;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,s={subject:t},a.next=4,e.$api.unsplash.getMatters(s);case 4:if(n=a.sent,console.log(n),"0"===n.errno){for(e.matterList=[],o=0;o<n.data.items.length;o++)e.matterList.push({label:n.data.items[o].name,val:n.data.items[o].id});e.matterList.length?(e.form1.matter=e.matterList[0].label,i={subject:e.form1.theme,item:e.form1.matter,user_id:sessionStorage.user_id},e.getPersonFn(i)):e.form1.matter=""}else e.notifyFn("提示",n.errmsg);a.next=13;break;case 9:a.prev=9,a.t0=a.catch(0),e.notifyFn("提示","服务器错误"),console.log(a.t0);case 13:case"end":return a.stop()}},a,e,[[0,9]])}))()},getPersonFn:function(t){var e=this;return o()(r.a.mark(function a(){var s,n;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,e.$api.unsplash.postUsers(t);case 3:if(s=a.sent,console.log(s),"0"===s.errno){for(e.personList=[],n=0;n<s.data.length;n++)e.personList.push({label:s.data[n].name,id:s.data[n].id});e.personList.length,e.form1.person=""}else e.notifyFn("提示",s.errmsg);a.next=12;break;case 8:a.prev=8,a.t0=a.catch(0),e.notifyFn("提示","服务器错误"),console.log(a.t0);case 12:case"end":return a.stop()}},a,e,[[0,8]])}))()},notifyFn:function(t,e){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"warning";this.$notify({title:t,message:e,type:a,dangerouslyUseHTMLString:!0,duration:3e3,position:"top-right"})},barAndLineOne:function(t,e){var a=e.legend,s=e.xAxis,r=e.yAxis1,n=r.data,o=Math.max.apply(null,n),i=this.$echarts.init(document.getElementById(t)),l={title:{text:a,left:"center",top:"4%"},tooltip:{trigger:"axis",axisPointer:{type:"cross",crossStyle:{color:"#999"}}},grid:{top:"30%",bottom:"20%"},toolbox:{show:!1,feature:{dataView:{show:!0,readOnly:!1},magicType:{show:!0,type:["line","bar"]},restore:{show:!0},saveAsImage:{show:!0}}},legend:{show:!1,data:a,left:"center",top:"10%"},xAxis:[{type:"category",data:s,axisPointer:{type:"shadow"}}],yAxis:[{type:"value",name:"件数",min:0,max:o,minInterval:1,axisLabel:{formatter:"{value}"}}],series:[{name:r.name,type:"bar",data:r.data,barWidth:"50%",itemStyle:{normal:{label:{show:!0,position:"top",textStyle:{color:"red",fontSize:16}}}}}]};i.setOption(l)},barAndLineTwo:function(t,e){var a=e.legend,s=e.xAxis,r=e.yAxis1,n=this.$echarts.init(document.getElementById(t)),o={title:{text:a,left:"center",top:"4%"},tooltip:{trigger:"axis",axisPointer:{type:"cross",crossStyle:{color:"#999"}}},grid:{top:"30%",bottom:"20%"},toolbox:{show:!1,feature:{dataView:{show:!0,readOnly:!1},magicType:{show:!0,type:["line","bar"]},restore:{show:!0},saveAsImage:{show:!0}}},legend:{show:!1,data:a,left:"center",top:"10%"},xAxis:[{type:"category",data:s,axisPointer:{type:"shadow"},axisLabel:{interval:0,rotate:45}}],yAxis:[{type:"value",name:"件数",min:0,minInterval:1,axisLabel:{formatter:"{value}"}}],series:[{name:r.name,type:"bar",data:r.data,barWidth:"50%",itemStyle:{normal:{label:{show:!0,position:"top",textStyle:{color:"red",fontSize:16}}}}}]};n.setOption(o)},barAndLineThree:function(t,e){var a=e.legend,s=e.xAxis,r=e.yAxis1,n=this.$echarts.init(document.getElementById(t)),o={title:{text:a,left:"center",top:"4%"},tooltip:{trigger:"axis",axisPointer:{type:"cross",crossStyle:{color:"#999"}}},grid:{top:"30%",bottom:"20%"},toolbox:{top:"40",right:"40",show:!0,feature:{dataView:{show:!0,readOnly:!1},magicType:{show:!0,type:["line","bar"]},restore:{show:!0},saveAsImage:{show:!0}}},legend:{show:!1,data:a,left:"center",top:"10%"},xAxis:[{type:"category",data:s,axisPointer:{type:"shadow"},axisLabel:{interval:0,rotate:45}}],yAxis:[{type:"value",name:"取号量",min:0,minInterval:1,axisLabel:{formatter:"{value}"}}],series:[{name:r.name,type:"bar",data:r.data,barWidth:"50%",itemStyle:{normal:{label:{show:!0,position:"top",textStyle:{color:"red",fontSize:16}}}}}]};n.setOption(o)},barAndLineFour:function(t,e){var a=e.legend,s=e.xAxis,r=e.yAxis1,n=this.$echarts.init(document.getElementById(t)),o={title:{text:a,left:"center",top:"4%"},tooltip:{trigger:"axis",axisPointer:{type:"cross",crossStyle:{color:"#999"}}},grid:{top:"30%",bottom:"20%"},toolbox:{top:"40",right:"40",show:!0,feature:{dataView:{show:!0,readOnly:!1},magicType:{show:!0,type:["line","bar"]},restore:{show:!0},saveAsImage:{show:!0}}},legend:{show:!1,data:a,left:"center",top:"10%"},xAxis:[{type:"category",data:s,axisPointer:{type:"shadow"},axisLabel:{interval:0,rotate:45}}],yAxis:[{type:"value",name:"件数",min:0,minInterval:1,axisLabel:{formatter:"{value}"}}],series:[{name:r.name,type:"bar",data:r.data,barWidth:"50%",itemStyle:{normal:{label:{show:!0,position:"top",textStyle:{color:"red",fontSize:16}}}}}]};n.setOption(o)},cellClickFn:function(t,e){console.log(1,e),sessionStorage.detailsMatter=e.matter,l.a.commit("changeDetailsMatter"),this.$router.push("/dataAnalysis/matterDetails")}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"dataAnalysis"}},[a("h3",{staticClass:"picTitle"},[t._v("大厅今日数据")]),t._v(" "),a("div",{staticStyle:{width:"94%",margin:"0 auto"}},[a("el-row",{attrs:{gutter:40}},[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"itemWarp"},[a("h4",{staticClass:"todayTitle"},[t._v("大厅取号总量")]),t._v(" "),a("p",{staticClass:"todayContent"},[t._v(t._s(t.realData.Total))])])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"itemWarp"},[a("h4",{staticClass:"todayTitle"},[t._v("今日接件量")]),t._v(" "),a("p",{staticClass:"todayContent"},[t._v(t._s(t.realData.didBNum))])])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"itemWarp"},[a("h4",{staticClass:"todayTitle"},[t._v("今日取号量")]),t._v(" "),a("p",{staticClass:"todayContent"},[t._v(t._s(t.realData.pickNum))])])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"itemWarp"},[a("h4",{staticClass:"todayTitle"},[t._v("今日转号量")]),t._v(" "),a("p",{staticClass:"todayContent"},[t._v(t._s(t.realData.moveNum))])])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"itemWarp"},[a("h4",{staticClass:"todayTitle"},[t._v("等待人数")]),t._v(" "),a("p",{staticClass:"todayContent"},[t._v(t._s(t.realData.waitNum))])])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"itemWarp"},[a("h4",{staticClass:"todayTitle"},[t._v("平均等待时间")]),t._v(" "),a("p",{staticClass:"todayContent"},[t._v(t._s(t.realData.waitTime))])])])],1)],1),t._v(" "),a("h3",{staticClass:"picTitle"},[t._v("今日事项Top 10")]),t._v(" "),a("div",{staticStyle:{width:"94%",margin:"0 auto"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{prop:"index",label:"序号",width:"60"}}),t._v(" "),a("el-table-column",{attrs:{label:"事项","min-width":"240"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.cellClickFn(e.$index,e.row)}}},[t._v(t._s(e.row.matter))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"peoperNum",label:"件数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"per",label:"占比"}})],1)],1),t._v(" "),a("div",{attrs:{name:"时间段的取号情况"}},[a("h3",{staticClass:"picTitle"},[t._v("时间段的取号情况")]),t._v(" "),a("el-form",[a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"日期"}},[a("el-date-picker",{attrs:{type:"date",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",placeholder:"选择日期"},on:{change:t.searchNumberChangeFn},model:{value:t.date1,callback:function(e){t.date1=e},expression:"date1"}})],1)],1)],1)],1),t._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"picWarp",attrs:{id:"pic1"}})])],1)],1)],1),t._v(" "),a("div",{attrs:{name:"大厅各主题办件数据分析"}},[a("h3",{staticClass:"picTitle"},[t._v("大厅各主题办件数据分析")]),t._v(" "),a("el-form",[a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"日期"}},[a("el-date-picker",{attrs:{type:"date",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",placeholder:"选择日期"},on:{change:t.searchPassDealChangeFn},model:{value:t.date2,callback:function(e){t.date2=e},expression:"date2"}})],1)],1)],1)],1),t._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"picWarp",attrs:{id:"pic2"}})])],1)],1)],1),t._v(" "),a("div",{attrs:{name:"工作人员办件数据分析"}},[a("h3",{staticClass:"picTitle"},[t._v("工作人员办件数据分析")]),t._v(" "),a("el-form",{attrs:{model:t.form1}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"日期"}},[a("el-date-picker",{staticStyle:{width:"80%"},attrs:{type:"date",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd",placeholder:"选择日期"},on:{change:t.searchPersonTimeChangeFn},model:{value:t.form1.date3,callback:function(e){t.$set(t.form1,"date3",e)},expression:"form1.date3"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"部门"}},[a("el-select",{staticStyle:{width:"80%"},attrs:{placeholder:"请选择部门"},on:{change:t.changeThemeFn},model:{value:t.form1.theme,callback:function(e){t.$set(t.form1,"theme",e)},expression:"form1.theme"}},t._l(t.themeList,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.label}})}),1)],1)],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"事项"}},[a("el-select",{staticStyle:{width:"80%"},attrs:{placeholder:"请选择事项"},on:{change:t.changeMatterFn},model:{value:t.form1.matter,callback:function(e){t.$set(t.form1,"matter",e)},expression:"form1.matter"}},t._l(t.matterList,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.label}})}),1)],1)],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"员工"}},[a("el-select",{staticStyle:{width:"80%"},attrs:{placeholder:"请选择员工"},on:{change:t.searchPersonChangeFn},model:{value:t.form1.person,callback:function(e){t.$set(t.form1,"person",e)},expression:"form1.person"}},t._l(t.personList,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.id}})}),1)],1)],1)],1)],1),t._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"picWarp",attrs:{id:"pic3"}})]),t._v(" "),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"picWarp",attrs:{id:"pic4"}})])],1)],1)],1)])},staticRenderFns:[]};var p=a("VU/8")(m,d,!1,function(t){a("MZbT")},"data-v-874a6e6a",null);e.default=p.exports}});
//# sourceMappingURL=11.64853b6e6aed43b09a27.js.map