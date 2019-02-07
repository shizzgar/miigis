// anower one chart
function generateChartData(dforChar) {

    var data = [];
    var dist = 0;
    var temp = 0;
    var co = 0;
    var no2 = 0;

    dforChar.forEach(i => {
        let date = new Date(i.dateTimeLabel);
        dist = Math.round(i.dist); 
        temp = i.TEMP;
        co = i.CO;
        no2 = i.NO2;
        data.push({
            date: date,
            dist: dist,
            temp: temp,
            co: co,
            no2 : no2
        });
    });

    return data;
}


// function moveCursor(step){
//     var point = val1.categoryToPoint(chart.data[step]["dist"]);
//     chart.cursor.triggerMove(point, false);
// };



//chart for one line
// function chartDisplay(dforChar, n){
//     // Themes begin
//     // am4core.useTheme(am4themes_animated);

//     var chart = am4core.create("chartdiv" + n, am4charts.XYChart);


//     chart.data = dforChar;

//     // Create axes
//     var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
//     categoryAxis.renderer.minGridDistance = 100;
//     categoryAxis.title.text = "Dist";
//     categoryAxis.dataFields.category = "dist";


//     var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
//     // Create series
//     var series = chart.series.push(new am4charts.LineSeries());
//     series.dataFields.categoryX = "dist";
    
//     switch(n) {
//         case 'T':
//             valueAxis.title.text = "Температура С"; //ax name
//             series.dataFields.valueY = "temp";
//             break;
//         case 'C':
//             valueAxis.title.text = "CO";
//             series.dataFields.valueY = "co";
//             break;
//         case 'N':
//             valueAxis.title.text = "NO2";
//             series.dataFields.valueY = "no2";
//             break;
//     };
    
//     series.tooltipText = "{categoryX}: [bold]{valueY}[/]"
//     // series.tooltip.pointerOrientation = "vertical";

//     chart.cursor = new am4charts.XYCursor();
//     // chart.cursor.snapToSeries = series;
//     // chart.cursor.xAxis = distAxis;
//     // chart.cursor.yAxes = valueAxis;

//     //chart.scrollbarY = new am4core.Scrollbar();
//     chart.scrollbarX = new am4core.Scrollbar();

//     // chart.events.on("ready", function () {
//     //     dateAxis.zoomToDates(
//     //       new Date(dforChar[0].date),
//     //       new Date(dforChar[1000].date),
//     //       false,
//     //       true
//     //     );
//     //   });
//     return valueAxis;

// };


class chart {
    constructor(data, type) {
        this.chart = am4core.create("chartdiv" + type, am4charts.XYChart);
        this.chart.data = data;

        this.categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
        this.categoryAxis.renderer.minGridDistance = 100;        
        this.categoryAxis.title.text = "Dist";
        this.categoryAxis.dataFields.category = "dist";  

        this.valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis()); 
        this.series = this.chart.series.push(new am4charts.LineSeries());
        this.series.dataFields.categoryX = "dist"; 
        switch(type) {
            case 'T':
                this.valueAxis.title.text = "Температура С"; //ax name
                this.series.dataFields.valueY = "temp";
                break;
            case 'C':
                this.valueAxis.title.text = "CO";
                this.series.dataFields.valueY = "co";
                break;
            case 'N':
                this.valueAxis.title.text = "NO2";
                this.series.dataFields.valueY = "no2";
                break;
        };
        this.series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        this.chart.cursor = new am4charts.XYCursor();
        this.chart.scrollbarX = new am4core.Scrollbar();
    }

    moveCursor(step) {
        var point = this.categoryAxis.categoryToPoint(this.chart.data[step]["dist"]);
        this.chart.cursor.triggerMove(point, false);
    }
}

 
