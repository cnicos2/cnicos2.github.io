var map = L.map('map').setView([38, -95], 4);
var basemapUrl = 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}.png';
var basemap = L.tileLayer(basemapUrl).addTo(map);
var radarUrl = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
  layers: 'nexrad-n0r-900913',
  format: 'image/png',
  transparent: true
};
var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);
var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';
$.getJSON(weatherAlertsUrl, function(data) {
  L.geoJSON(data).addTo(map);
});
L.geoJSON(data, {
  style: function(feature){
  var alertColor = 'orange';
  if (feature.properties.severity === 'Severe') alertColor = 'red';
  if (feature.properties.extreme === 'Extreme') alertColor = 'pink';
  return { color: alertColor };
},
  onEachFeature: function(feature, layer) {
  layer.bindPopup(feature.properties.headline);
}
}).addTo(map);
