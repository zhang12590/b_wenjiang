var barAndLine1=function(id,obj){
    let legend=obj.legend;
    let xAxis=obj.xAxis;
    let yAxis1=obj.yAxis1;
    let yAxis2=obj.yAxis2;
    let yAxis3=obj.yAxis3;

    let temp=yAxis1.data.concat(yAxis2.data,yAxis3.data);
    let max=Math.max.apply(null,temp);

    var Chart = echarts.init(document.getElementById(id));
    var option = {
        title: {
            text: '人流量统计对比',
            left: 'center',
            top: '0%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid:{
            top: '30%',
            bottom: '20%'
        },
        toolbox: {
            show: false,
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data:legend,
            left: 'center',
            top: '10%'
        },
        xAxis: [
            {
                type: 'category',
                data: xAxis,
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '人流',
                min: 0,
                max: max,
                minInterval: 1,
                // interval: 50,
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: '人流',
                min: 0,
                max: max,
                // interval: 5,
                minInterval: 1,
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name:yAxis1.name,
                type:'bar',
                data:yAxis1.data,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,		//开启显示
                            position: 'top',	//在上方显示
                            textStyle: {	    //数值样式
                                color: 'red',
                                fontSize: 16
                            }
                        }
                    }
                }
            },
            {
                name:yAxis2.name,
                type:'bar',
                data:yAxis2.data,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,		//开启显示
                            position: 'top',	//在上方显示
                            textStyle: {	    //数值样式
                                color: 'black',
                                fontSize: 16
                            }
                        }
                    }
                }
            },
            {
                name:yAxis3.name,
                type:'line',
                yAxisIndex: 1,
                data:yAxis3.data,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,		//开启显示
                            position: 'top',	//在上方显示
                            textStyle: {	    //数值样式
                                color: 'blue',
                                fontSize: 16,
                            }
                        }
                    }
                }
            },

        ]
    };
    Chart.setOption(option);
};

var barAndLine2=function(id,obj){
    let legend=obj.legend;
    let xAxis=obj.xAxis;
    let yAxis1=obj.yAxis1;
    let yAxis2=obj.yAxis2;
    let yAxis3=obj.yAxis3;
    var Chart = echarts.init(document.getElementById(id));
    var option = {
        title: {
            text: '各时间段人流统计',
            left: 'center',
            top: '0%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid:{
            top: '30%',
            bottom: '20%'
        },
        toolbox: {
            show: false,
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data: ['上周各时间段','当天各时间段','平均值'],
            left: 'center',
            top: '10%'
        },
        xAxis: [
            {
                type: 'category',
                data: xAxis,
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel:{
                    interval: 0,
                    rotate: 45,
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '人流',
                min: 0,
                // max: 250,
                // interval: 50,
                minInterval: 1,
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: '平均人流',
                min: 0,
                // max: 25,
                // interval: 5,
                minInterval: 1,
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name: '上周各时间段',
                type:'bar',
                data:yAxis1.data,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,		//开启显示
                            position: 'top',	//在上方显示
                            textStyle: {	    //数值样式
                                color: 'red',
                                fontSize: 16
                            }
                        }
                    }
                }
            },
            {
                name: '当天各时间段',
                type: 'bar',
                data:yAxis2.data,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,		//开启显示
                            position: 'top',	//在上方显示
                            textStyle: {	    //数值样式
                                color: 'black',
                                fontSize: 16
                            }
                        }
                    }
                }
            },
            {
                name: '平均值',
                type:'line',
                yAxisIndex: 1,
                data:yAxis3.data,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,		//开启显示
                            position: 'top',	//在上方显示
                            textStyle: {	    //数值样式
                                color: 'blue',
                                fontSize: 16,
                            }
                        }
                    }
                }
            }

        ]
    };
    Chart.setOption(option);
};

var bar3=function(id,obj){
    let legend=obj.legend;
    let xAxis=obj.xAxis;
    let yAxis1=obj.yAxis1;
    let yAxis2=obj.yAxis2;
    var Chart = echarts.init(document.getElementById(id));
    var option = {
        title: {
            text: '主题类事项统计',
            left: 'center',
            top: '0%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid:{
            top: '30%',
            bottom: '20%'
        },
        toolbox: {
            show: false,
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            show: true,
            data:legend,
            left: 'center',
            top: '10%'
        },
        xAxis: [
            {
                type: 'category',
                data: xAxis,
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel:{
                    interval: 0,
                    rotate: 45,
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '件数',
                min: 0,
                // max: 250,
                // interval: 50,
                minInterval: 1,
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name:yAxis1.name,
                type:'bar',
                data:yAxis1.data,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,		//开启显示
                            position: 'top',	//在上方显示
                            textStyle: {	    //数值样式
                                color: 'black',
                                fontSize: 16
                            }
                        }
                    }
                }
            },
            {
                name:yAxis2.name,
                type:'bar',
                data:yAxis2.data,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,		//开启显示
                            position: 'top',	//在上方显示
                            textStyle: {	    //数值样式
                                color: 'black',
                                fontSize: 16
                            }
                        }
                    }
                }
            }
        ]
    };
    Chart.setOption(option);
};

var Pie4=function(id,obj){
    let rAxis=obj.rAxis;
    let data1=obj.data1;
    let data2=obj.data2;
    var piePicChart = echarts.init(document.getElementById(id));
    var option = {
        title: {
            text: '当日主题事件统计',
            left: 'center',
            top: '0%'
        },
        tooltip: {
            // show: false,
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            show: false,
            orient: 'vertical',
            x: 'left',
            data:rAxis
        },
        series: [
            {
                name:'事项',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '40%'],

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:data1
            },
            {
                name:'事项',
                type:'pie',
                radius: ['60%', '65%'],
                label: {
                    normal: {
                        formatter: ' {b|{b} }\n{per|{d}%} ',
                        // backgroundColor: '#eee',
                        // borderColor: '#aaa',
                        // borderWidth: 1,
                        // borderRadius: 4,
                        // shadowBlur:3,
                        // shadowOffsetX: 2,
                        // shadowOffsetY: 2,
                        // shadowColor: '#999',
                        // padding: [0, 7],
                        rich: {
                            a: {
                                color: '#999',
                                lineHeight: 22,
                                align: 'center'
                            },
                            // abg: {
                            //     backgroundColor: '#333',
                            //     width: '100%',
                            //     align: 'right',
                            //     height: 22,
                            //     borderRadius: [4, 4, 0, 0]
                            // },
                            hr: {
                                borderColor: '#aaa',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 16,
                                lineHeight: 33
                            },
                            per: {
                                color: '#eee',
                                backgroundColor: '#43adf0',
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    }
                },
                labelLine:{
                    normal: {
                        show:true,
                        length: 20,
                        length2: 4,
                    }
                },
                data:data2
            }
        ]
    };
    piePicChart.setOption(option);
};

var Pie5=function(id,pieSeriesData,pieText=""){// 男女 省内省外
    var piePicChart = echarts.init(document.getElementById(id));
    var picLegendData=[];
    var picLegendPer=[];
    var sum=0;
    for( var i=0;i<pieSeriesData.length;i++){
        sum+=pieSeriesData[i].value;
    }
    for( var i=0;i<pieSeriesData.length;i++){
        picLegendData[i]=pieSeriesData[i].name;
        if(sum==0){
            picLegendPer[0]=0.0;
        }else{
            picLegendPer[i]=pieSeriesData[i].value/sum;
        }
    }
    var option = {
        title:{
            show: true,
            text: pieText,
            top: '25%',
            left: 'left',
            textStyle:{
                color: "black",
                fontSize: 20
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c}"+"人"+" ({d}%)"
        },
        legend: {
            show: false,
            orient: 'horizontal',
            itemWidth: 16,
            left: 'center',
            bottom: '2%',
            textStyle:{
                color:"black",
                fontSize: '14'
            },
            data:picLegendData
        },
        series: [
            {
                name: pieText,
                type:'pie',
                radius: ['50%', '60%'],
                center: ['50%','50%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        position: 'center',
                        formatter: picLegendData[0]+":"+(picLegendPer[0]*100).toFixed(1)+"%",
                        textStyle:{
                            fontSize: 20,
                            color:'#39CCCC'
                        }
                    }
                },
                // label: {
                //     normal: {
                //         show: false,
                //         position: 'center'
                //     },
                //     emphasis: {
                //         show: true,
                //         textStyle: {
                //             fontSize: '18',
                //             fontWeight: 'bold'
                //         }
                //     }
                // },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:pieSeriesData
            }
        ]
    };
    piePicChart.setOption(option);
};

var Pie6=function(id,pieSeriesData,pieText=""){

    var piePicChart = echarts.init(document.getElementById(id));
    var picLegendData=[];
    for( var i=0;i<pieSeriesData.length;i++){
        picLegendData[i]=pieSeriesData[i].name;
    }
    var option = {
        title:{
            show: true,
            text: pieText,
            top: 'middle',
            left: 'center',
            textStyle:{
                color: "black",
                fontSize: 20
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: ({d}%)"
        },
        legend: {
            show: false,
            orient: 'horizontal',
            itemWidth: 24,
            itemHeight: 18,
            left: 'center',
            bottom: '2%',
            textStyle:{
                color:"black",
                fontSize: '20'
            },
            data:picLegendData
        },
        series: [
            {
                name: pieText,
                type:'pie',
                radius: ['50%', '60%'],
                center: ['50%','50%'],
                data:pieSeriesData,
                avoidLabelOverlap: true,
                itemStyle: {
                    normal: {
                        label:{
                            show:true,
                            formatter:'{b}\n{d}%',
                            color: "black",
                            textStyle:{
                                fontSize: 20
                            }
                        },
                        labelLine:{
                            normal: {
                                show:true,
                                length: 40,
                                length2: 6,
                                lineStyle:{
                                }
                            }
                        },
                    },
                    emphasis: {
                        label: {
                            show: true,
                            formatter: '{b}\n {d}%',
                            position: 'center',
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    }
                }
            }
        ]
    };
    piePicChart.setOption(option);
};


