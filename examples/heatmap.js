var raster = new OpenLayers.Layer.XYZ("MapBox Light", [
    "http://a.tiles.mapbox.com/v3/mapbox.mapbox-light/${z}/${x}/${y}.png",
    "http://b.tiles.mapbox.com/v3/mapbox.mapbox-light/${z}/${x}/${y}.png",
    "http://c.tiles.mapbox.com/v3/mapbox.mapbox-light/${z}/${x}/${y}.png",
    "http://d.tiles.mapbox.com/v3/mapbox.mapbox-light/${z}/${x}/${y}.png"
], {
    attribution: "Tiles &copy; <a href='http://mapbox.com/'>MapBox</a> | " +
        "Data &copy; <a href='http://www.openstreetmap.org/'>OpenStreetMap</a> " +
        "and contributors, CC-BY-SA",
    sphericalMercator: true,
    wrapDateLine: true,
    transitionEffect: "resize",
    buffer: 1,
    numZoomLevels: 17
});

var vector = new OpenLayers.Layer.Vector("heatmap", {
    renderers: ['Heatmap'],
    protocol: new OpenLayers.Protocol.HTTP({
        url: "data.geojson",
        format: new OpenLayers.Format.GeoJSON()

    }),
    styleMap: new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            pointRadius: 20,
            weight: "${weight}"
        }, {
            context: {
                weight: function(f) {
                    return Math.min((f.attributes.duration || 0) / 43200, 1.0);
                }
            }
        })
    }),
    strategies: [new OpenLayers.Strategy.Fixed()],
    eventListeners: {
        featuresadded: function(evt) {
            this.map.zoomToExtent(this.getDataExtent());
        }
    }
});
var map = new OpenLayers.Map("map", {
    layers: [raster, vector]
});
