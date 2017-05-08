/**
 * Created by jj on 2017/4/13.
 */
define(["echarts"],function(echarts){
    //给予准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '未来发展趋势'
        },
        tooltip: {},
        legend: {
            data:['数量']
        },
        xAxis: {
            data: ["JAVA","PHP","前端与移动开发","UI","安卓","IOS"]
        },
        yAxis: {},
        series: [
            {
                name: '数量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            },
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
})