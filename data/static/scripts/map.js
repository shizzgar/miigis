function playClick(){
    marker.start();
};

function pauseClick(){
    setTimeout(function() {marker.stop();},1);    
};

function stopClick(){
    setTimeout(function() {marker.stop();}, 1);    
    marker._i=0;
};

function prevClick(){
    setTimeout(function() {marker.stop();}, 1);    
    marker._i-=100;
}

function nextClick(){
    setTimeout(function() {marker.stop();}, 1);    
    marker._i+=100;
}

    

function mapDisplay(mapContainer, extent, points, props){
    var mymap = L.map(mapContainer).fitBounds(extent.coordinates);
    var ps=points.coordinates;

    var testps = [
        [55.75885, 37.654221],
        [55.764126, 37.759397],
        [55.75856, 37.851516],
        [55.767799, 37.965985],
        [55.757339, 37.849662],
        [55.793652, 37.706783],
        [55.809139, 37.631266],
        [55.797466, 37.512353]
    ];

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoic2hpenpnYXIiLCJhIjoiY2pxa3p0bHg1MW9oejN4bWJobWZpZDNpOSJ9.q3iuyK04zDch7wRAHp48dg'
    }).addTo(mymap);

    for (index=0; index<ps.length; index++){
        new L.circleMarker([ps[index][0], ps[index][1]],{radius:1})
        .bindPopup(
            '<strong>CO</strong>:'+props[index]['CO']
            +"<br><strong>NO2</strong>:"+props[index]['NO2']
            +"<br><strong>TEMP</strong>:"+props[index]['TEMP']
        ).addTo(mymap);
    }

    var pulsingIconStart = L.icon.pulse({iconSize:[3,3],color:'red'});
    var markerStart = L.marker([ps[0][0], ps[0][1]],{icon: pulsingIconStart}).addTo(mymap);

    var pulsingIconFinish = L.icon.pulse({iconSize:[3,3],color:'blue'});
    var markerFinish = L.marker([ps[ps.length-1][0], ps[ps.length-1][1]],{icon: pulsingIconFinish}).addTo(mymap);


    var line = L.polyline(ps)
    marker = L.animatedMarker(line.getLatLngs(), {
        autoStart: false,
        interval: 200,
        distance: 300,
        onStep: function() {
            $('#mysuperdiv').text(this._i);
        }
    });
    

    mymap.addLayer(marker);

    // $("#pausebtn").click(function(){
    //     setTimeout(function() {
    //         // Stop the animation
    //         marker.stop();},
    //         5000);    
    // });



    // marker.start();
    
    // return marker
    

    
    // move = L.Marker.movingMarker(ps,
    //     Array(ps.length).fill(1000),{loop:true}).addTo(mymap);
    // // move.addStation(2, 20000);
    

    // move.start();

//...

}