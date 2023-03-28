import Map, {Source, Layer,Marker, AttributionControl} from 'react-map-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import { useEffect, useState } from "preact/hooks";
import { useRef } from "preact/hooks";
import { render, Component, createRef } from "preact";
import {

  Box,

} from "@mantine/core";

import geoJson from "./chicago-parks.json";
import "./Map.css";

// Map.accessToken = import.meta.env.VITE_MAP_BOX_TOKEN


const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': 'red'
  }
};


const AppMap = () => {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5
  });


  


  return(
    <Box  sx={{position:"relative"}}  w="80%" h={500} mx="auto" mt={40}>
      
     <Map  {...viewState}
     reuseMaps
    onMove={evt => setViewState(evt.viewState)}
    style={{width: '100%', height: '100%'}}
    mapStyle="mapbox://styles/mapbox/streets-v11"
     mapboxAccessToken={import.meta.env.VITE_MAP_BOX_TOKEN}
     attributionControl={true}
    >
       <AttributionControl customAttribution="Map design by me" />
       <Marker longitude={-100} latitude={40} anchor="bottom" onClick={(e)=>console.log(e)}>
     
    </Marker>
      <Source id="my-data" type="geojson" data={geoJson} >
        <Layer {...layerStyle} onClick={(e)=>console.log(e)}/>
      </Source>
    </Map>
    </Box>
  
  ) 
};

export default AppMap;