// anower one chart
function generateChartData(dforChar) {

    var data = [];
    var dist = 0;
    var temp = 0;
    var co = 0;
    var no2 = 0;
    var index=0;
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
            no2 : no2,
            index : index
        });
        index+=1;
    });

    return data;
}


var tt;
var cnt = 0;
var guideBank = [];
var legendContainer;



function isChartDistEqual(element,index,array){
    return element['dist']==this.distValueToSearch;
}

class chart {

    constructor(data, type) {
        am4core.useTheme(am4themes_material);
        var opposite = false;
        this.chart = am4core.create("chartdiv" + type, am4charts.XYChart);
        this.chart.data = data;

        // this.categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
        this.categoryAxis = this.chart.xAxes.push(new am4charts.ValueAxis());
        this.categoryAxis.renderer.minGridDistance = 50;        
        this.categoryAxis.title.text = "Dist";
        this.categoryAxis.dataFields.value = "dist";  

        this.categoryAxis.min = 0;
        this.categoryAxis.max = data[data.length-1]['dist'];
        this.categoryAxis.strictMinMax = true; 
        this.categoryAxis.cursorTooltipEnabled = false;
        
        
        // this.positionX=-1


        //valAx and Series for temp

        //add animation tooltip = 0

        this.valueAxisT = this.chart.yAxes.push(new am4charts.ValueAxis());
        // this.valueAxisT.min = 500;
        // this.valueAxisT.max = 1500;
        // this.valueAxisT.strictMinMax = true;         

        this.valueAxisT.title.text = "Температура С"; //ax name    
        this.valueAxisT.renderer.minGridDistance = 50;
        
    
        this.seriesT = this.chart.series.push(new am4charts.LineSeries());
        this.seriesT.tooltip.getFillFromObject = false;
        this.seriesT.dataFields.valueX = "dist"; 
        this.seriesT.dataFields.valueY = "temp";
        this.seriesT.stroke = am4core.color("#0013A8");

        this.seriesT.yAxis = this.valueAxisT; // new line
        this.seriesT.tooltip.animationDuration = 0;

        this.seriesT.tooltip.background.fill = am4core.color("#0013A8");
        this.seriesT.tooltipText = "{valueX}: [bold]{valueY}[/]";
        this.seriesT.tensionX = 0.8;
        this.seriesT.status = true;
        this.seriesT.legendSettings.labelText = "Temp[bold {color}][/]";
        this.seriesT.legendSettings.itemValueText = "[bold {color}]{valueY}[/bold]";
        this.seriesT.strokeWidth = 2;




        this.valueAxisT.renderer.line.strokeOpacity = 3;
        this.valueAxisT.renderer.line.strokeWidth = 3;
        this.valueAxisT.renderer.line.stroke = this.seriesT.stroke;
        this.valueAxisT.renderer.labels.template.fill = this.seriesT.stroke;
        this.valueAxisT.renderer.opposite = opposite;
        this.valueAxisT.renderer.grid.template.disabled = true;   
        
        this.valueAxisT.cursorTooltipEnabled = false;
            



        //valAx and Series for CO
        this.valueAxisC = this.chart.yAxes.push(new am4charts.ValueAxis());
        this.valueAxisC.title.text = "CO";   
        this.valueAxisC.renderer.minGridDistance = 50;
        
        this.seriesC = this.chart.series.push(new am4charts.LineSeries());
        this.seriesC.dataFields.valueX = "dist"; 
        this.seriesC.dataFields.valueY = "co";
        this.seriesC.yAxis = this.valueAxisC; // new line
        this.seriesC.tooltip.animationDuration = 0;
        this.seriesC.tooltipText = "{valueX}: [bold]{valueY}[/]";
        this.seriesC.tensionX = 0.8;
        this.seriesC.status = true;
        this.seriesC.legendSettings.labelText = "CO[bold {color}][/]";
        this.seriesC.legendSettings.itemValueText = "[bold {color}]{valueY}[/bold]";
        this.seriesC.strokeWidth = 2;
        this.seriesC.stroke = am4core.color("#808080");


        this.valueAxisC.renderer.line.strokeOpacity = 3;
        this.valueAxisC.renderer.line.strokeWidth = 3;
        this.valueAxisC.renderer.line.stroke = this.seriesC.stroke;
        this.valueAxisC.renderer.labels.template.fill = this.seriesC.stroke;
        this.valueAxisC.renderer.opposite = opposite;
        this.valueAxisC.renderer.grid.template.disabled = true;        
        this.valueAxisC.cursorTooltipEnabled = false;



        //valAx and Series for NO2
        this.valueAxisN = this.chart.yAxes.push(new am4charts.ValueAxis());
        this.valueAxisN.title.text = "NO2";    
        this.valueAxisN.renderer.minGridDistance = 50;
        
        this.seriesN = this.chart.series.push(new am4charts.LineSeries());
        this.seriesN.dataFields.valueX = "dist"; 
        this.seriesN.dataFields.valueY = "no2";
        this.seriesN.yAxis = this.valueAxisN; // new line
        // this.seriesN.tooltip.animationDuration = 0;
        // this.seriesN.tooltipText = "{valueX}: [bold]{valueY}[/]";
        this.seriesN.tensionX = 0.8;
        this.seriesN.status = true;
        this.seriesN.legendSettings.labelText = "NO2[bold {color}][/]";
        this.seriesN.legendSettings.itemValueText = "[bold {color}]{valueY}[/bold]";
        this.seriesN.strokeWidth = 2;
        

        this.valueAxisN.renderer.line.strokeOpacity = 3;
        this.valueAxisN.renderer.line.strokeWidth = 3;
        this.valueAxisN.renderer.line.stroke = this.seriesN.stroke;
        this.valueAxisN.renderer.labels.template.fill = this.seriesN.stroke;
        this.valueAxisN.renderer.opposite = opposite;
        this.valueAxisN.renderer.grid.template.disabled = true;
        this.valueAxisN.cursorTooltipEnabled = false;

        



        
        
        
        

        this.chart.cursor = new am4charts.XYCursor();
        this.chart.cursor.animationDuration = 0;
        
        this.chart.cursor.xAxis = this.categoryAxis;
        // this.chart.cursor.behavior = 'none';
        
        // this.chart.cursor.fullWidthLineX = true;
        this.chart.cursor.lineY.disabled = true;
        this.chart.cursor.lineX.stroke = am4core.color("#FFD700");
        this.chart.cursor.lineX.strokeWidth = 4;
        this.chart.cursor.lineX.strokeOpacity = 0.7;
        this.chart.cursor.lineX.strokeDasharray = "";   
        
        //fix title of axis 
        this.chart.paddingTop = 40;


        this.valueAxisT.renderer.grid.template.disabled = true;
        this.valueAxisT.paddingLeft = 10;
        this.valueAxisT.paddingRight = 10;
        this.valueAxisT.layout = "absolute";
         
        // Set up axis title
        this.valueAxisT.title.text = "Temp";
        this.valueAxisT.title.rotation = 0;
        this.valueAxisT.title.align = "center";
        this.valueAxisT.title.valign = "top";
        this.valueAxisT.title.dy = -40;
        this.valueAxisT.title.fontWeight = 600;

        this.valueAxisN.renderer.grid.template.disabled = true;
        this.valueAxisN.paddingLeft = 10;
        this.valueAxisN.paddingRight = 10;
        this.valueAxisN.layout = "absolute";
        this.valueAxisN.title.text = "NO2";
        this.valueAxisN.title.rotation = 0;
        this.valueAxisN.title.align = "center";
        this.valueAxisN.title.valign = "top";
        this.valueAxisN.title.dy = -40;
        this.valueAxisN.title.fontWeight = 600;

                
        this.valueAxisC.renderer.grid.template.disabled = true;
        this.valueAxisC.paddingLeft = 10;
        this.valueAxisC.paddingRight = 10;
        this.valueAxisC.layout = "absolute";
        this.valueAxisC.title.text = "CO";
        this.valueAxisC.title.rotation = 0;
        this.valueAxisC.title.align = "center";
        this.valueAxisC.title.valign = "top";
        this.valueAxisC.title.dy = -40;
        this.valueAxisC.title.fontWeight = 600;        


        
        
        this.chart.legend = new am4charts.Legend();
        var legendContainer = am4core.create("legendDiv", am4core.Container);
        legendContainer.width = am4core.percent(100);
        legendContainer.height = am4core.percent(100);

        this.chart.legend.parent = legendContainer;


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
        this.chart.cursor.events.on("cursorpositionchanged",this.onCursorHit,this);


        this.chart.events.on("hit", this.makeGuide, this); 
        this.categoryAxis.events.on('selectionextremeschanged', function(ev) {
            $('#distDiv').text("Distance between grid lines |" + this.categoryAxis.step + "|");
            console.log('here');
        }, this);

        

        // tt is inicilized above class 
        tt = this.chart.createChild(am4core.Tooltip);
        tt.fontSize = 14;
        tt.autoTextColor = false;
        tt.label.fill = am4core.color("#000000");
        tt.background.fill = am4core.color("#0285b4");
        tt.pointerOrientation = "horizontal";
        
        this.chart.plotContainer.events.on("out", function(ev) {
            tt.hide();
        });
        
        this.chart.plotContainer.events.on("over", function(ev) {
            //tt.appear();
            tt.show();
        });
        
        var last_idx = -1;
        
        this.chart.cursor.events.on("cursorpositionchanged", function(ev) {
          // get cursor x coordinate
          let xAxis = ev.target.chart.xAxes.getIndex(0);
          let yAxis = ev.target.chart.yAxes.getIndex(0);
          
          let x = xAxis.positionToValue(xAxis.toAxisPosition(ev.target.xPosition));
           
          // search closest data point
          let idx = searchval(x);
           
          // tooltip update only after data point change
          if(idx != last_idx) {
            // data point coordinates
            let xpos = xAxis.valueToPoint(data[idx].dist);
            let ypos = yAxis.valueToPoint(data[idx].temp);
            // plot container offset
            let xOffset = tChart.chart.plotContainer.pixelX;
            let yOffset = tChart.chart.plotContainer.pixelY;
            
            let txt = "dist: " + data[idx].dist + "\ntemp: " + data[idx].temp + "\nco: " + data[idx].co + "\nno2: " + data[idx].no2;
            //txt = txt  + "\nxpos: "+ xpos.x + "\nypos: "+ypos.y + "\nxOff: " + xOffset;
            //console.log(txt);
        
            // set content and move to data point
            tt.text = txt;
            tt.pointTo({"x": xpos.x + xOffset, "y": ypos.y + yOffset});
            
            last_idx = idx;
          }
        });
        
        function searchval(x) {
            let center;
            let left = 0;
            let maxidx = data.length - 1;
            let right = maxidx;
            
            // bisect data array 
            // worst-case performance: O(log2(n))
            while (left < right) {  
                center = Math.floor((left + right) / 2);
        
                if(data[center].dist < x) {
                    left = center + 1;
                }
                else {
                    right = center;
                }   
            }
            
            // check which data point is closer to the cursor
            if(x > data[center].dist) {
                if((center < maxidx) && (x - data[center].dist) > (data[center + 1].dist - x)) {
                    center = center + 1;
                }
            }   
        
            if(x < data[center].dist) {
                if((center > 0) && (data[center].dist - x) > (x - data[center - 1].dist)) {
                    center = center - 1;
                }
            }
            
            return center;
        }
    }

    

    makeGuide(ev){
        let xAxes = this.categoryAxis.toAxisPosition(this.chart.cursor.xPosition);
        let x = this.categoryAxis.positionToValue(xAxes);
        console.log(xAxes, x);
        let range = tChart.categoryAxis.axisRanges.create();
        guideBank[cnt] = range;
        range.value = x;
        range.grid.stroke = am4core.color("#ff2400");
        range.grid.strokeWidth = 2;
        range.grid.strokeOpacity = 1;
        // range.axisFill.fill = am4core.color("#ff2400");
        cnt+=1;
    }

    
    onCursorHit(ev){
        this.positionX=ev.target.xPosition;
    }

    onMap(ev){
        var category = tt.label.currentText;
        var numbers = category.match(/[+-]?\d+\.*\d+/g);
        this.distValueToSearch=parseInt(numbers[0])
        var dataItem=this.chart.data.find(isChartDistEqual,this);
        if (dataItem){
            console.log('data: dist='+dataItem['dist']+', CO='+dataItem['co']+', index='+dataItem['index']);

            if (parseFloat(numbers[3])){
                var search = [parseInt(numbers[0]), parseFloat(numbers[1]), parseFloat(numbers[2]), parseFloat(numbers[3])]
            } else {
                var search = [parseInt(numbers[0]), parseFloat(numbers[1]), parseFloat(numbers[2]), 0]
            }
            console.log(search);
            var index = dataItem['index'];
            var point = points.coordinates[index];
            var cursorPoint = this.categoryAxis.valueToPoint(numbers[0]);
            this.categoryAxis.zoomToValues(numbers[0]-300, parseInt(numbers[0])+300);    
            this.chart.cursor.triggerMove(cursorPoint, 'none');
            console.log(index + ' ' + point + ' ' + cursorPoint);
            map.setView(point, 17);
            markers[index].openPopup();
    
        }else{
            console.log('not found');
        }
        
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
    

        
        var point = this.categoryAxis.valueToPoint(dist);
        // if (step==1){
            
        // };
        this.categoryAxis.zoomToValues(tChart.chart.data[index-ldist]["dist"], tChart.chart.data[index+rdist]["dist"]);  
        // setTimeout(function() {
        //     this.chart.cursor.triggerMove(point, "soft");
        // }, 100);  
            
        this.chart.cursor.triggerMove(point, 'none');
        

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

 
