import  {Map, useMap, Source, Layer,Marker,useControl, AttributionControl} from 'react-map-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import { useEffect, useState , useCallback,useRef } from "preact/hooks";
import { render, Component, createRef } from "preact";
import {

  Box,

} from "@mantine/core";
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './layers';
import geoJson from "./chicago-parks.json";
import "./Map.css";

const AppMap = () => {
  const mapRef = useRef(null);
  const [viewState, setViewState] = useState({
    latitude: 44.3763,
    longitude: 33.2788,
    zoom: 3
  });
  

  function onMapLoad() {
    console.log(mapRef.current)
    mapRef.current.setLanguage("ar")
    //setMapLoaded(true);
  }
  const onClick = event => {
    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;

    const mapboxSource = mapRef.current.getSource('earthquakes') 

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      mapRef.current.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500
      });

      console.log("kkk")
    });
  };

  return(
    <Box  sx={{position:"relative"}}  w="80%" h={500} mx="auto" mt={40}>
      
     <Map  {...viewState}
     onLoad={onMapLoad}
      ref={mapRef} 
      interactiveLayerIds={[clusterLayer.id]}
      onClick={onClick}
      

     reuseMaps={true}
    onMove={evt => setViewState(evt.viewState)}
    style={{width: '100%', height: '100%'}}
    mapStyle="mapbox://styles/mapbox/streets-v11"
     mapboxAccessToken={import.meta.env.VITE_MAP_BOX_TOKEN}
     attributionControl={true}
    >
    
       <Marker longitude={-100} latitude={40} anchor="bottom" >
       {/* onClick={(e)=>console.log(e)} */}
    </Marker>
    <Source
          id="earthquakes"
          type="geojson"
          data={geoJson}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      

 
    </Map>
    </Box>
  
  ) 
};

export default AppMap;