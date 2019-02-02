// anower one chart
// function generateChartData(dforChar) {

//     var data = [];
//     var temp = 0;
//     var co = 0;
//     var no2 = 0;

//     dforChar.forEach(i => {
//         let date = new Date(i.dateTimeLabel);
//         temp = i.TEMP;
//         co = i.CO;
//         no2 = i.NO2;
//         data.push({date:date, temp: temp, co: co, no2   : no2 });
//     });

//     return data;
// }





function chartDisplayA(dforChar){
    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    // am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdivA", am4charts.XYChart);

    // Increase contrast by taking evey second color
    // chart.colors.step = 2;

    // Add data
    chart.data = dforChar;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // dateAxis.renderer.minGridDistance = 50;

    // Create series
    function createAxisAndSeries(field, name, opposite) { //bullet
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.strokeWidth = 2;
        series.yAxis = valueAxis;
        series.name = name;
        series.tooltipText = "{name}: [bold]{valueY}[/]";
        series.tensionX = 0.8;
        
        var interfaceColors = new am4core.InterfaceColorSet();
        
        // switch(bullet) {
        //     case "triangle":
        //     var bullet = series.bullets.push(new am4charts.Bullet());
        //     bullet.width = 12;
        //     bullet.height = 12;
        //     bullet.horizontalCenter = "middle";
        //     bullet.verticalCenter = "middle";
            
        //     var triangle = bullet.createChild(am4core.Triangle);
        //     triangle.stroke = interfaceColors.getFor("background");
        //     triangle.strokeWidth = 2;
        //     triangle.direction = "top";
        //     triangle.width = 12;
        //     triangle.height = 12;
        //     break;
        //     case "rectangle":
        //     var bullet = series.bullets.push(new am4charts.Bullet());
        //     bullet.width = 10;
        //     bullet.height = 10;
        //     bullet.horizontalCenter = "middle";
        //     bullet.verticalCenter = "middle";
            
        //     var rectangle = bullet.createChild(am4core.Rectangle);
        //     rectangle.stroke = interfaceColors.getFor("background");
        //     rectangle.strokeWidth = 2;
        //     rectangle.width = 10;
        //     rectangle.height = 10;
        //     break;
        //     default:
        //     var bullet = series.bullets.push(new am4charts.CircleBullet());
        //     bullet.circle.stroke = interfaceColors.getFor("background");
        //     bullet.circle.strokeWidth = 2;
        //     break;
        // }
        
        valueAxis.renderer.line.strokeOpacity = 1;
        valueAxis.renderer.line.strokeWidth = 2;
        valueAxis.renderer.line.stroke = series.stroke;
        valueAxis.renderer.labels.template.fill = series.stroke;
        valueAxis.renderer.opposite = opposite;
        valueAxis.renderer.grid.template.disabled = true;
    }

    createAxisAndSeries("temp", "Temp", false); // , "circle"
    createAxisAndSeries("co", "CO", true); // , "triangle"
    createAxisAndSeries("no2", "NO2", true); // , "rectangle"

    // Add legend
    chart.legend = new am4charts.Legend();

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
};




// generate some random data, quite different range
function generateChartData(dforChar) {

    var data = [];
    var temp = 0;
    var co = 0;
    var no2 = 0;

    dforChar.forEach(i => {
        let date = new Date(i.dateTimeLabel);
        temp = i.TEMP;
        co = i.CO;
        no2 = i.NO2;
        data.push({date:date, temp: temp, co: co, no2   : no2 });
    });

    return data;
}


