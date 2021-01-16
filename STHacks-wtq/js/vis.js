//References
//https://github.com/jasonicarter/toronto-geojson
//

//Basic initializations

var basicPosition = [43.6532, -79.3832];

var switchingData = "default";

var counter = 0;

var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var marker; // The only marker

var markersForCommunity = [];


var map = L.map('map', { scrollWheelZoom: false }).setView(basicPosition, 15);

function showTorotoMap(nameValue = null) {
    // create map object, tell it to live in 'map' div and give initial latitude, longitude, zoom values
    // pass option to turn scroll wheel zoom off

    if (nameValue == null) {
        nameValue = "Toronto";
    }

    if (!nameValue.toLowerCase().includes("toronto")) {
        nameValue += " Toronto";
    }


    var entrance = encodeURIComponent(nameValue.trim())
    var url = "https://maps.googleapis.com/maps/api/geocode/json?&address=" + entrance + "&key=AIzaSyCE49BN6D8b2asUONTB1kInR22mJ7iCJEQ"

    //console.log(url);

    createScale();

    $.getJSON(url, function(data) {
        $.getJSON("./data/toronto.geojson", function(myLines) {
            d3.csv("./data/covid_cases_total.csv").then(data2 => {

                    var dictForTotal = new Object();
                    //console.log(data2);

                    //remove marker
                    if (marker) {
                        map.removeLayer(marker);
                    }

                    paint = d3.scaleLinear().range(["yellow", "red"])


                    //preprocess data from total cases.
                    for (let i = 0; i < data2.length; i++) {
                        dictForTotal[data2[i]["Neighbourhood ID"]] = data2[i]["Rate per 100,000 people"] / 100000;

                    }


                    function getColor(d) {
                        return d < 0.005 ? '#FFEDA0' :
                            d < 0.01 ? '#FED976' :
                            d < 0.015 ? '#FEB24C' :
                            d < 0.02 ? '#FD8D3C' :
                            d < 0.025 ? '#FC4E2A' :
                            d < 0.035 ? '#E31A1C' :
                            d < 0.045 ? '#BD0026' :
                            '#800026';
                    }

                    function myStyle(feature) {
                        var number = +feature.properties.AREA_S_CD;
                        //console.log(number);
                        return {
                            "weight": 2,
                            "opacity": 1,
                            "fillColor": getColor(dictForTotal[data2[number]["Neighbourhood ID"]]),
                            "color": getColor(dictForTotal[data2[number]["Neighbourhood ID"]]),
                        };
                    }


                    /*()                    */


                    if (counter == 0) {
                        L.geoJson(myLines, { style: myStyle })
                            .addTo(map);
                        counter++;
                    }

                    /*
                    L.geoJson(myLines, {
                            style: myStyle,
                            onEachFeature: function(feature, layer) {
                                layer.bindTooltip("<h4>" + feature.properties.AREA_S_CD + "</h4>");
                            }
                        })
                        .addTo(map);
                        */

                    //use data
                    //basicPosition = [data.results[0].geometry.location.lat, data.results.geometry.location.lng];
                    var lat = data.results[0].geometry.location.lat;
                    var lng = data.results[0].geometry.location.lng;
                    basicPosition = [lat, lng];


                    var popupContent = "<strong>Your Current Location</strong><br/>";
                    popupContent += "In Toronto";
                    map.panTo(basicPosition);

                    //var newLatLng = new L.LatLng(lat, lng);
                    marker = L.marker([lat, lng], { icon: greenIcon })
                        .bindPopup(popupContent)
                        .addTo(map);

                    function switcher() {
                        if (switchingData == "default") {
                            for (let i = 0; i < markersForCommunity.length; i++) {
                                map.removeLayer(markersForCommunity[i]);
                            }
                            markersForCommunity = [];


                            //get all neighbourhood names, pin them all

                            var allNeighborhood = [];

                            for (let i = 0; i < data2.length; i++) {
                                let urlReplacer = data2[i]["Neighbourhood Name"] + " Canada";
                                var urlReplacer2 = encodeURIComponent(urlReplacer)
                                var urlForCommunity = "https://maps.googleapis.com/maps/api/geocode/json?&address=" + urlReplacer2 + "&key=AIzaSyCE49BN6D8b2asUONTB1kInR22mJ7iCJEQ";
                                $.getJSON(urlForCommunity, function(newData) {
                                    var popupModifier = data2[i]["Neighbourhood Name"];
                                    var popupContent = "<strong>Name of Neighborhood</strong><br/>" + popupModifier + "<br/>" + dictForTotal[data2[i]["Neighbourhood ID"]] * 100 + "%";
                                    console.log(newData);
                                    let lat1 = newData.results[0].geometry.location.lat;
                                    let lng1 = newData.results[0].geometry.location.lng;
                                    markersForCommunity.push(L.marker([lat1, lng1])
                                        .bindPopup(popupContent)
                                        .addTo(map));


                                });
                            }
                        } else if (switchingData == "testing") {
                            for (let i = 0; i < markersForCommunity.length; i++) {
                                map.removeLayer(markersForCommunity[i]);
                            }
                            markersForCommunity = [];
                            d3.csv("./data/assessment_centre_locations.csv").then(dataForTesting => {
                                console.log(dataForTesting);
                                for (let i = 0; i < dataForTesting.length; i++) {
                                    var popupModifier = dataForTesting[i]["location_name"];
                                    var popupContent = "<strong>Name of Neighborhood</strong><br/>" + popupModifier + "<br/>" + dataForTesting[i]["address"];
                                    let lat1 = +dataForTesting[i]["latitude"];
                                    let lng1 = +dataForTesting[i]["longitude"];
                                    markersForCommunity.push(L.marker([lat1, lng1])
                                        .bindPopup(popupContent)
                                        .addTo(map));
                                }

                            });
                        }

                    }
                    //end of switcher

                    switcher(switchingData)


                    //console.log(json); // this will show the info it in firebug console

                    //toronto
                    //console.log(data)
                })
                .catch(error => {
                    //console.error("Error loading the data")
                });
        });
    }).fail(function() {
        console.log("failed");
    });






    // add base map tiles from OpenStreetMap and attribution info to 'map' div
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);



    // add polygon from area array points to map with some basic styling

}


function createScale() {
    var ordinal = d3.scaleOrdinal()
        .domain(["<0.5%", "0.5%-1%", "1%-1.5%", "1.5%-2%", "2-2.5%", "2.5%-3.5%", "3.5%-4.5%", ">4.5%"])
        .range(['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026']);

    d3.select("#svg-color-ordinal").html("");
    d3.select("#svg-color-ordinal").append("svg").attr("height", 500);

    var svg = d3.select("#svg-color-ordinal svg");

    svg.append("svg").append("g")
        .attr("class", "svg-color-ordinal")
        .attr("transform", "translate(20,20)");

    var legendOrdinal = d3.legendColor()
        //d3 symbol creates a path-string, for example
        //"M0,-8.059274488676564L9.306048591020996,
        //8.059274488676564 -9.306048591020996,8.059274488676564Z"
        .shape("path", d3.symbol().type(d3.symbolTriangle).size(150)())
        .shapePadding(10)
        //use cellFilter to hide the "e" cell
        .cellFilter(function(d) { return d.label !== "e" })
        .scale(ordinal);

    svg.select(".svg-color-ordinal")
        .call(legendOrdinal);

}


function updateTorontoMap(switchingChoice = null) {
    if (switchingChoice == null || switchingChoice == "default") {
        var nameValue = document.getElementById("searchBar").value;
        switchingData = "default";
        showTorotoMap(nameValue);
    } else if (switchingChoice == "testing") {
        switchingData = "testing";
        showTorotoMap(nameValue);
    }


}




//Auto-initialization
showTorotoMap();