// Crate a new map centered on the continental US
var map = L.map('map').setView([38, -95], 4);

//Add OpenStreet to the map
var basemapUrl = 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}.png';
var basemap = L.tileLayer(basemapUrl).addTo(map);

//Add Westher radar to map
var radarUrl = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
  layers: 'nexrad-n0r-900913',
  format: 'image/png',
  transparent: true
};
var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);

//Get GeoJSON data from the NWS alerts API
var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';
$.getJSON(weatherAlertsUrl, function(data) {
L.geoJSON(data, {
  // Color all alert polygons orange, but color extreme polygons pink
  style: function(feature){
  var alertColor = 'orange';
  if (feature.properties.severity === 'Severe') alertColor = 'red';
  if (feature.properties.extreme === 'Extreme') alertColor = 'pink';
  return { color: alertColor };
},
  //Add a popup on each feature showing the NWS alert headline
  onEachFeature: function(feature, layer) {
  layer.bindPopup(feature.properties.headline);
}
}).addTo(map);
});
