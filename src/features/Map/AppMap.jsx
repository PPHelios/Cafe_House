import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import maplibregl from "maplibre-gl";
import { useSignal } from "@preact/signals";
//import MapboxLanguage from "@mapbox/mapbox-gl-language";
import ControlPanel from "./control-panel";
import { useState, useMemo, useRef, useCallback } from "preact/hooks";
import { filteredData } from "../../store/appState";
import { Box, Image, Text, Group, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Pin from "./pin";
import PropertyModal from "../../components/PropertyModal/PropertyModal";
import {
  config,
  geocoding,
  geolocation,
  coordinates,
  data,
  staticMaps,
} from "@maptiler/client";
// Map.accessToken = import.meta.env.VITE_MAP_BOX_TOKEN
config.apiKey = import.meta.env.VITE_MAP_TILER_API_KEY;


const AppMap = ({
  popupInfo,
  setPopupInfo,
  scrollToId,
  add,
  setPropertLocation,
}) => {
  const [viewState, setViewState] = useState({
    longitude: 31.53824,
    latitude: 30.00624,
    zoom: 12,
  });
  const modalData = useSignal(null);
  const [marker, setMarker] = useState({
    latitude: 30.00629,
    longitude: 31.5385,
  });
  const [events, logEvents] = useState({});

  const [opened, { open, close }] = useDisclosure(false);
  const mapRef = useRef(null);
  // function onMapLoad() {
  //   mapRef.current.setLanguage("ar");
  // }
  // useEffect(() => {
  //   if (maplibregl.getRTLTextPluginStatus() === "unavailable") {
  //     maplibregl.setRTLTextPlugin(
  //       "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  //       () => {},
  //       true // Lazy load the plugin only when text is in arabic
  //     );
  //   }
  // }, []);
  const pins = useMemo(
    () =>
      filteredData.value.map((item, i) => (
        <Marker
          key={`marker-${i}`}
          longitude={item.get("location")._longitude}
          latitude={item.get("location")._latitude}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            // elRefs[i]?.current?.scrollIntoView({
            //   behavior: "smooth",
            //   block: "start",
            // });
            //   scrollToId(i);

            open();
          }}
        >
          <Box
            onMouseOver={() => {
              modalData.value = item;
              setPopupInfo(item);
            }}
            onMouseLeave={() => {
              setPopupInfo(null);
            }}
          >
            {<Pin />}
          </Box>
        </Marker>
      )),
    [filteredData.value]
  );
  // location marker

  const onMarkerDrag = useCallback((event) => {
    setPropertLocation((_events) => ({ ..._events, onDrag: event.lngLat }));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  }, []);

  return (
    <>
      <Map
        mapLib={maplibregl}
        {...viewState}
        // onLoad={onMapLoad}
        ref={mapRef}
        reuseMaps
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle={`https://api.maptiler.com/maps/0589890f-74b7-443f-acab-40553ad8f673/style.json?key=${
          import.meta.env.VITE_MAP_TILER_KEY
        }`}
        // mapStyle={`https://api.maptiler.com/maps/openstreetmap/style.json?key=${
        //   import.meta.env.VITE_MAP_TILER_KEY
        // }`}
        attributionControl={true}
      >
        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.get("location")._longitude}
            latitude={popupInfo.get("location")._latitude}
            onClose={() => setPopupInfo(null)}
          >
            <Paper>
              <Text fz="lg" ta="center">
                {" "}
                {popupInfo.get("adName")}
              </Text>
              <Group>
                <Box w={80}>
                  <Image
                    src={popupInfo.get("pic0")._url}
                    alt="property picture"
                  />
                </Box>
                <Box>
                  <Text fz="sm">Price: {popupInfo.get("price")} LE</Text>
                  <Text fz="sm">Area: {popupInfo.get("area")} m</Text>
                  <Text fz="sm">Rooms: {popupInfo.get("room")}</Text>
                  <Text fz="sm">Baths: {popupInfo.get("bath")}</Text>
                </Box>
              </Group>
            </Paper>
          </Popup>
        )}
        {!add && (
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            anchor="bottom"
            draggable
            // onDrag={onMarkerDrag}
            onDragEnd={onMarkerDrag}
          >
            <Pin size={20} />
          </Marker>
        )}
      </Map>
      {/* {add && <ControlPanel events={events} />} */}
      {add && (
        <PropertyModal
          modalData={modalData.value}
          opened={opened}
          close={close}
        />
      )}
      <button
        onClick={async () => {
          const search = await coordinates.search("mivida new cairo");
          console.log(search);
        }}
      >
        test
      </button>
    </>
  );
};

export default AppMap;
