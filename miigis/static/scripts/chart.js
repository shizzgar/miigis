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



class chart {
    constructor(data, type) {
        am4core.useTheme(am4themes_material);
        var opposite = false;
        this.chart = am4core.create("chartdiv" + type, am4charts.XYChart);
        this.chart.data = data;

        this.categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
        this.categoryAxis.renderer.minGridDistance = 100;        
        this.categoryAxis.title.text = "Dist";
        this.categoryAxis.dataFields.category = "dist";  
        


        //valAx and Series for temp
        this.valueAxisT = this.chart.yAxes.push(new am4charts.ValueAxis());
        this.valueAxisT.title.text = "Температура С"; //ax name    
        this.valueAxisT.renderer.minGridDistance = 50;
        
    
        this.seriesT = this.chart.series.push(new am4charts.LineSeries());
        this.seriesT.tooltip.getFillFromObject = false;
        this.seriesT.dataFields.categoryX = "dist"; 
        this.seriesT.dataFields.valueY = "temp";
        this.seriesT.stroke = am4core.color("#0013A8");

        this.seriesT.yAxis = this.valueAxisT; // new line
        this.seriesT.tooltip.background.fill = am4core.color("#0013A8");
        this.seriesT.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        this.seriesT.tensionX = 0.8;
        this.seriesT.status = true;


        this.valueAxisT.renderer.line.strokeOpacity = 1;
        this.valueAxisT.renderer.line.strokeWidth = 2;
        this.valueAxisT.renderer.line.stroke = this.seriesT.stroke;
        this.valueAxisT.renderer.labels.template.fill = this.seriesT.stroke;
        this.valueAxisT.renderer.opposite = opposite;
        this.valueAxisT.renderer.grid.template.disabled = true;    
            



        //valAx and Series for CO
        this.valueAxisC = this.chart.yAxes.push(new am4charts.ValueAxis());
        this.valueAxisC.title.text = "CO";   
        this.valueAxisC.renderer.minGridDistance = 50;
        
        this.seriesC = this.chart.series.push(new am4charts.LineSeries());
        this.seriesC.dataFields.categoryX = "dist"; 
        this.seriesC.dataFields.valueY = "co";
        this.seriesC.yAxis = this.valueAxisC; // new line
        this.seriesC.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        this.seriesC.tensionX = 0.8;
        this.seriesC.status = true;


        this.valueAxisC.renderer.line.strokeOpacity = 1;
        this.valueAxisC.renderer.line.strokeWidth = 2;
        this.valueAxisC.renderer.line.stroke = this.seriesC.stroke;
        this.valueAxisC.renderer.labels.template.fill = this.seriesC.stroke;
        this.valueAxisC.renderer.opposite = opposite;
        this.valueAxisC.renderer.grid.template.disabled = true;        



        //valAx and Series for NO2
        this.valueAxisN = this.chart.yAxes.push(new am4charts.ValueAxis());
        this.valueAxisN.title.text = "NO2";    
        this.valueAxisN.renderer.minGridDistance = 50;
        
        this.seriesN = this.chart.series.push(new am4charts.LineSeries());
        this.seriesN.dataFields.categoryX = "dist"; 
        this.seriesN.dataFields.valueY = "no2";
        this.seriesN.yAxis = this.valueAxisN; // new line
        this.seriesN.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        this.seriesN.tensionX = 0.8;
        this.seriesN.status = true;
        
        

        this.valueAxisN.renderer.line.strokeOpacity = 1;
        this.valueAxisN.renderer.line.strokeWidth = 2;
        this.valueAxisN.renderer.line.stroke = this.seriesN.stroke;
        this.valueAxisN.renderer.labels.template.fill = this.seriesN.stroke;
        this.valueAxisN.renderer.opposite = opposite;
        this.valueAxisN.renderer.grid.template.disabled = true;

        



        this.chart.cursor = new am4charts.XYCursor();
        this.chart.scrollbarX = new am4charts.XYChartScrollbar();
        this.chart.scrollbarX.series.push(this.seriesT);
        this.chart.scrollbarX.series.push(this.seriesC);
        this.chart.scrollbarX.series.push(this.seriesN);

        

        
    }

    

    moveCursor(step) {
        var point = this.categoryAxis.categoryToPoint(this.chart.data[step+50]["dist"]);
        this.categoryAxis.zoomToCategories(this.chart.data[step]["dist"], this.chart.data[step+100]["dist"]);
        this.chart.cursor.triggerMove(point, false);
        // this.chart.slider.moveTo(point);
    }


    hideT() {
        if (this.seriesT.status) {
            this.seriesT.hide();
            this.seriesT.status = false;
        } else {
            this.seriesT.show();
            this.seriesT.status = true;
        };  
    }

    hideC() {
        if (this.seriesC.status) {
            this.seriesC.hide();
            this.seriesC.status = false;
        } else {
            this.seriesC.show();
            this.seriesC.status = true;
        };  
    }

    hideN() {
        if (this.seriesN.status) {
            this.seriesN.hide();
            this.seriesN.status = false;
        } else {
            this.seriesN.show();
            this.seriesN.status = true;
        };  
    }

    

}

 
