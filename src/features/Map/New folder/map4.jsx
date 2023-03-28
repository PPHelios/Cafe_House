import mapboxgl from "mapbox-gl";
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import {useState, useEffect,useRef  } from "preact/hooks";
import { render, Component, createRef } from "preact";
import {

  Box,

} from "@mantine/core";

import geoJson from "./chicago-parks.json";
import "./Map.css";

mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_TOKEN

// if (mapboxgl.getRTLTextPluginStatus() === 'unavailable') {
//   mapboxgl.setRTLTextPlugin(
//     'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
//     () => {},
//     true // Lazy load the plugin only when text is in arabic
//   )
// }

const Marker = ({ onClick, children, feature }) => {
  const _onClick = () => {
    onClick(feature.properties.description);
  };

  return (
    <button onClick={_onClick} className="marker">
      {children}
    </button>
  );
};


const Map = () => {
  const mapContainerRef = useRef(null);
  const [viewState, setViewState] = useState("")

  console.log(viewState)
  // Initialize map when component mounts
  useEffect(() => {
    if (mapboxgl.getRTLTextPluginStatus() === 'unavailable') {
      mapboxgl.setRTLTextPlugin(
      'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',null,true
      // Lazy load the plugin
      );
    }
    
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
     // center: [-87.65, 41.84],
     center: [44.3763, 33.2788],
      zoom: 10,
    });




  


    map.on('load', () => {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      map.addSource('data', {
      type: 'geojson',
      // Point to GeoJSON data. This example visualizes all M1.0+ data
      // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
      data: geoJson,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });
       
      map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'data',
      filter: ['has', 'point_count'],
      paint: {
      // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      // with three steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 100
      //   * Yellow, 30px circles when point count is between 100 and 750
      //   * Pink, 40px circles when point count is greater than or equal to 750
      'circle-color': [
      'step',
      ['get', 'point_count'],
      'red',
      100,
      '#f1f075',
      750,
      '#f28cb1'
      ],
      'circle-radius': [
      'step',
      ['get', 'point_count'],
      20,
      100,
      30,
      750,
      40
      ]
      }
      });
       
      map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'data',
      filter: ['has', 'point_count'],
      layout: {
      'text-field': ['get', 'point_count_abbreviated'],
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12
      }
      });
       
      map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'data',
      filter: ['!', ['has', 'point_count']],
      paint: {
      'circle-color': '#11b4da',
      'circle-radius': 12,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff'
      }
      });
       
      // inspect a cluster on click
      map.on('click', 'clusters', (e) => {
      const features = map.queryRenderedFeatures(e.point, {
      layers: ['clusters']
      });
      const clusterId = features[0].properties.cluster_id;
      map.getSource('data').getClusterExpansionZoom(
      clusterId,
      (err, zoom) => {
      if (err) return;
       
      map.easeTo({
      center: features[0].geometry.coordinates,
      zoom: zoom
      });
      }
      );
      });
       
      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      map.on('click', 'unclustered-point', (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const mag = e.features[0].properties.mag;
      const tsunami =
      e.features[0].properties.tsunami === 1 ? 'yes' : 'no';
       
      // Ensure that if the map is zoomed out such that
      // multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
       
      new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(
      `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
      )
      .addTo(map);
      setViewState("koko")
      console.log(e.features[0].properties.title)
      });
       
      map.on('mouseenter', 'clusters', () => {
      map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'clusters', () => {
      map.getCanvas().style.cursor = '';
      });
      });
    // const language = new MapboxLanguage({defaultLanguage: 'mul'});
    // map.addControl(language);
    map.addControl(new MapboxLanguage({
      defaultLanguage: 'mul'
    }));

    // Render custom marker components
    // geoJson.features.forEach((feature) => {
    //   // Create a React ref
    //   const ref = createRef();
    //   // Create a new DOM node and save it to the React ref
    //   ref.current = document.createElement("div");
    //   // Render a Marker Component on our new DOM node
      
    //  render(
    //     <Marker onClick={markerClicked} feature={feature}/>,
    //     ref.current
    //   );

    //   // Create a Mapbox Marker at our new DOM node
    //   new mapboxgl.Marker(ref.current)
    //     .setLngLat(feature.geometry.coordinates)
    //     .addTo(map);
    // });

    // Add navigation control (the +/- zoom buttons)
   // map.addControl(new mapboxgl.NavigationControl(), "top-right");
    // map.setLayoutProperty('country-label', 'text-field', [
    //   'get',
    //   `name_Arabic`
    //   ]);
    // Clean up on unmount
    return () => map.remove();
  }, []);

  const markerClicked = (title) => {
    window.alert(title);
  };

  return(
    <Box  sx={{position:"relative"}}  w="80%" h={500} mx="auto" mt={40}>
        <div className="map-container" ref={mapContainerRef} />
    </Box>
  
  ) 
};

export default Map;