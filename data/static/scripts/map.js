


function mapDisplay(mapContainer, extent, points,props){
    var mymap = L.map(mapContainer).fitBounds(extent.coordinates)
        
    //     {
    //     // center: [37.662127, 55.763552],
    //     maxBounds: extent.coordinates
    // }).setView(extent.coordinates[0], 15);


    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoic2hpenpnYXIiLCJhIjoiY2pxa3p0bHg1MW9oejN4bWJobWZpZDNpOSJ9.q3iuyK04zDch7wRAHp48dg'
    }).addTo(mymap);

    ps=points.coordinates;
    for (index=0; index<ps.length; index++){
        marker=new L.circleMarker([ps[index][0], ps[index][1]],{radius:4})
           .bindPopup('<strong>CO</strong>:'+props[index]['CO']
                     +"<br><strong>NO2</strong>:"+props[index]['NO2']
                     +"<br><strong>TEMP</strong>:"+props[index]['TEMP'])
           .addTo(mymap);

    }
    // mymap.setZoom(13);
}