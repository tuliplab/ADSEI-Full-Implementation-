
$(document).ready(function () {
	var xhttp = new XMLHttpRequest();
	var respons;
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
            respons = this.responseText;
            localStorage.setItem('heat_cities_map_data', respons);


		}
    };
    var start_year = localStorage.getItem('start_year');
    var c1 = localStorage.getItem('selected_country');
    var c2 = localStorage.getItem('selected_country_2');
	xhttp.open("GET", "/heat_map_data?name="+c1+"_"+c2+"&start_year="+start_year, true);
	xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    // console.log(respons);

});


function show(){

    $("#echart_line").show();
    $("#echart_line_2").show();
    $("#textContent").hide();
    $("#chartContent").hide();
    $("#textContent_2").hide();
    $("#chartContent_2").hide();
}
function showPieS(){
    // document.getElementById('main').innerHTML="";
    var data = localStorage.getItem('heat_cities_map_data');
                data = JSON.parse(data);

    var myChart = echarts.init(document.getElementById('main'));
    var result = data.cities_in_country;
    // console.log(result[0]);
    // specify chart configuration item and data
    option = {
        title: {
            text: data.countries[0],
            left: 'center',
            top: 20
        },
    
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
    
        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                name:'City',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data: result[0].value.sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        label : {
                            position : 'inner',
                            show: true,
                            formatter : function (result_data) {                         
                              return result_data.name
                            //   return (result_data.name - 0).toFixed(0) + '%'
                            }
                        },
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'silver'
                    }
                },
    
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };
       
    
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

    var textBox = document.getElementById("textContent");
    textBox.innerHTML="";
    var h4 = document.createElement("h4");
    var node = document.createTextNode(" Pie charts are best to use when you are trying to compare parts of a whole. They do not show changes over time.");
    h4.appendChild(node);

    textBox.appendChild(h4);

 // <!--Second Binder-->


     // document.getElementById('main').innerHTML="";
     var myChart = echarts.init(document.getElementById('main_2'));
     var result1 = data.cities_in_country;

     // specify chart configuration item and data
     option = {
         title: {
             text: data.countries[1],
             left: 'center',
             top: 20
         },
     
         tooltip : {
             trigger: 'item',
             formatter: "{a} <br/>{b} : {c} ({d}%)"
         },
     
         visualMap: {
             show: false,
             min: 80,
             max: 600,
             inRange: {
                 colorLightness: [0, 1]
             }
         },
         series : [
             {
                 name:'City',
                 type:'pie',
                 radius : '55%',
                 center: ['50%', '50%'],
                 data: result1[1].value.sort(function (a, b) { return a.value - b.value; }),
                 roseType: 'radius',
                 label: {
                     normal: {
                         textStyle: {
                             color: 'rgba(255, 255, 255, 0.3)'
                         }
                     }
                 },
                 labelLine: {
                     normal: {
                         lineStyle: {
                             color: 'rgba(255, 255, 255, 0.3)'
                         },
                         smooth: 0.2,
                         length: 10,
                         length2: 20
                     }
                 },
                 itemStyle: {
                     normal: {
                        label : {
                            position : 'inner',
                            show: true,
                            formatter : function (result_data) {                         
                              return result_data.name
                            //   return (result_data.name - 0).toFixed(0) + '%'
                            }
                        },
                         color: '#c23531',
                         shadowBlur: 200,                         
                         color: '#c23531',
                         shadowColor: 'silver'
                     }
                 },
     
                 animationType: 'scale',
                 animationEasing: 'elasticOut',
                 animationDelay: function (idx) {
                     return Math.random() * 200;
                 }
             }
         ]
     };
        
     
     if (option && typeof option === "object") {
         myChart.setOption(option, true);
     }
 
     var textBox = document.getElementById("textContent_2");
     textBox.innerHTML="";
     var h4 = document.createElement("h4");
     var node = document.createTextNode(" Pie charts are best to use when you are trying to compare parts of a whole. They do not show changes over time.");
     h4.appendChild(node);
 
     textBox.appendChild(h4);

     $("#textContent").show();
     $("#textContent_2").show();
     $("#echart_line").hide();
     $("#echart_line_2").hide();
     $("#chartContent").show();
     $("#chartContent_2").show();
}


// <!--************************ This is the introduction of the heatmap chart ***********************-->
function showHeatmap(){
    var respons = localStorage.getItem('heat_cities_map_data');
            respons = JSON.parse(respons);

    var myChart = echarts.init(document.getElementById('main'));
  

var hours = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var days = respons.years_arr;

// var data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];
var datar = respons.heat_array;
// console.log(respons);

datar = datar[respons.countries[0]];
data = datar.map(function (item) {
    return [item[1], item[0], item[2] || '-'];
});

option = {
    title: {
        text: respons.countries[0],
        subtext: 'Avg Temperature'
    },
    tooltip: {
        position: 'top'
    },
    animation: false,
    grid: {
        height: '50%',
        y: '10%'
    },
    xAxis: {
        type: 'category',
        data: hours,
        splitArea: {
            show: true
        }
    },
    yAxis: {
        type: 'category',
        data: days,
        splitArea: {
            show: true
        }
    },
    visualMap: {
        min: -20,
        max: 40,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%'
    },
    series: [{
        name: 'Punch Card',
        type: 'heatmap',
        data: data,
        label: {
            normal: {
                show: true
            }
        },
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
};

    if (option && typeof option === "object") {     myChart.setOption(option, true); }

    var textBox = document.getElementById("textContent");
    textBox.innerHTML="";
    var h4 = document.createElement("h4");
    node =  document.createTextNode("By definition, Heat Maps are graphical representations of data that utilize color-coded systems. The primary purpose of Heat Maps is to better visualize the volume of locations/events within a dataset and assist in directing viewers towards areas on data visualizations that matter most.");
    h4.appendChild(node);

    textBox.appendChild(h4);
 








    // <!--Second Binder-->

    var myChart = echarts.init(document.getElementById('main_2'));
  
    var hours = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];;
    var days = respons.years_arr;
    
    // var data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];
    var datar = respons.heat_array;
    datar = datar[respons.countries[1]];
data = datar.map(function (item) {
    return [item[1], item[0], item[2] || '-'];
});

option = {
    title: {
        text: respons.countries[1],
        subtext: 'Avg Temperature'
    },
    tooltip: {
        position: 'top'
    },
    animation: false,
    grid: {
        height: '50%',
        y: '10%'
    },
    xAxis: {
        type: 'category',
        data: hours,
        splitArea: {
            show: true
        }
    },
    yAxis: {
        type: 'category',
        data: days,
        splitArea: {
            show: true
        }
    },
    visualMap: {
        min: -20,
        max: 40,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%'
    },
    series: [{
        name: 'Punch Card',
        type: 'heatmap',
        data: data,
        label: {
            normal: {
                show: true
            }
        },
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
};

    if (option && typeof option === "object") {     myChart.setOption(option, true); }

    var textBox = document.getElementById("textContent_2");
    textBox.innerHTML="";
    var h4 = document.createElement("h4");
    node =  document.createTextNode("By definition, Heat Maps are graphical representations of data that utilize color-coded systems. The primary purpose of Heat Maps is to better visualize the volume of locations/events within a dataset and assist in directing viewers towards areas on data visualizations that matter most.");
    h4.appendChild(node);

    textBox.appendChild(h4);
    $("#textContent").show();
    $("#textContent_2").show();
    $("#echart_line").hide();
    $("#echart_line_2").hide();
    $("#chartContent").show();
    $("#chartContent_2").show();
}