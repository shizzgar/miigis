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

        //add animation tooltip = 0
        this.valueAxisT = this.chart.yAxes.push(new am4charts.ValueAxis());
        this.valueAxisT.title.text = "Температура С"; //ax name    
        this.valueAxisT.renderer.minGridDistance = 50;
        
    
        this.seriesT = this.chart.series.push(new am4charts.LineSeries());
        this.seriesT.tooltip.getFillFromObject = false;
        this.seriesT.dataFields.categoryX = "dist"; 
        this.seriesT.dataFields.valueY = "temp";
        this.seriesT.stroke = am4core.color("#0013A8");

        this.seriesT.yAxis = this.valueAxisT; // new line
        this.seriesT.tooltip.animationDuration = 0;

        this.seriesT.tooltip.background.fill = am4core.color("#0013A8");
        this.seriesT.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        this.seriesT.tensionX = 0.8;
        this.seriesT.status = true;
        this.seriesT.legendSettings.labelText = "[bold {color}]Temp:[/]";
        this.seriesT.legendSettings.itemValueText = "[bold {color}]{valueY}[/bold]";
        this.seriesT.strokeWidth = 2;




        this.valueAxisT.renderer.line.strokeOpacity = 3;
        this.valueAxisT.renderer.line.strokeWidth = 3;
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
        this.seriesC.tooltip.animationDuration = 0;
        this.seriesC.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        this.seriesC.tensionX = 0.8;
        this.seriesC.status = true;
        this.seriesC.legendSettings.labelText = "[bold {color}]CO:[/]";
        this.seriesC.legendSettings.itemValueText = "[bold {color}]{valueY}[/bold]";
        this.seriesC.strokeWidth = 2;


        this.valueAxisC.renderer.line.strokeOpacity = 3;
        this.valueAxisC.renderer.line.strokeWidth = 3;
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
        this.seriesN.tooltip.animationDuration = 0;
        this.seriesN.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        this.seriesN.tensionX = 0.8;
        this.seriesN.status = true;
        this.seriesN.legendSettings.labelText = "[bold {color}]NO2:[/]";
        this.seriesN.legendSettings.itemValueText = "[bold {color}]{valueY}[/bold]";
        this.seriesN.strokeWidth = 2;
        

        this.valueAxisN.renderer.line.strokeOpacity = 3;
        this.valueAxisN.renderer.line.strokeWidth = 3;
        this.valueAxisN.renderer.line.stroke = this.seriesN.stroke;
        this.valueAxisN.renderer.labels.template.fill = this.seriesN.stroke;
        this.valueAxisN.renderer.opposite = opposite;
        this.valueAxisN.renderer.grid.template.disabled = true;

        



        this.chart.cursor = new am4charts.XYCursor();
        this.chart.cursor.animationDuration = 0;
        this.chart.cursor.lineY.disabled = true;
        this.chart.cursor.xAxis = this.categoryAxis;
        this.chart.cursor.behavior = 'none';
        // this.chart.cursor.fullWidthLineX = true;


        this.chart.legend = new am4charts.Legend();


        this.chart.scrollbarX = new am4charts.XYChartScrollbar();
        this.chart.scrollbarX.series.push(this.seriesT);
        this.chart.scrollbarX.series.push(this.seriesC);
        this.chart.scrollbarX.series.push(this.seriesN);

        this.seriesT.segments.template.interactionsEnabled = true;
        this.seriesC.segments.template.interactionsEnabled = true;
        this.seriesN.segments.template.interactionsEnabled = true;
        this.seriesT.segments.template.events.on("hit", this.onMap, this);
        this.seriesC.segments.template.events.on("hit", this.onMap, this); 
        this.seriesN.segments.template.events.on("hit", this.onMap, this);  
        // this.chart.cursor.events.off("hit", onMap, this); 


        

        
    }

    
    onMap(ev){
        var category = ev.target.dataItem.component.tooltipDataItem.dataContext;
        // point = category.positionToIndex(category.toAxisPosition(ev.target.xPosition));
        console.log(category.dist);
        var index = tChart.chart.data.indexOf(category)
        var point = points.coordinates[index]
        console.log(point);
        map.setView(point, 17)
        markers[index].openPopup();
        
    }


    moveCursor(step) {


        var index=step;
        // console.log(step)
        var dist = this.chart.data[index]['dist'];


        var ldist = 0;
        var rdist = 0;
        var delta1 = 0;
        while ((delta1<=200)&&(ldist<index)) {
            delta1 = dist - this.chart.data[index-ldist]["dist"];
            ldist+=1;
        }
        var delta2 = 0;
        var len=this.chart.data.length;
        while ((delta2<=200)&&((index+rdist)<(len-1))) {
            delta2 = this.chart.data[index+rdist]["dist"] - dist;
            rdist+=1;       
        }
    

        
        var point = this.categoryAxis.categoryToPoint(dist);
        // if (step==1){
            
        // };
        this.categoryAxis.zoomToCategories(tChart.chart.data[index-ldist]["dist"], tChart.chart.data[index+rdist]["dist"]);  
        // setTimeout(function() {
        //     this.chart.cursor.triggerMove(point, "soft");
        // }, 100);  
            
        this.chart.cursor.triggerMove(point, 'soft');
        

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

 
