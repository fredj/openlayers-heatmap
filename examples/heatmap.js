var raster = new OpenLayers.Layer.OSM("osm");

var vector = new OpenLayers.Layer.Vector("heatmap", {
// use the heatmap renderer instead of the default one (SVG, VML or Canvas)
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
// the 'weight' of the point (between 0.0 and 1.0), used by the heatmap renderer
                weight: function(f) {
                    return Math.min(Math.max((f.attributes.duration || 0) / 43200, 0.25), 1.0);
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
