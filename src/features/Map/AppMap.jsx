import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import maplibregl from "maplibre-gl";
import { useSignal } from "@preact/signals";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import ControlPanel from "./control-panel";
import { useState, useMemo, useRef, useCallback } from "preact/hooks";
import { filteredData } from "../../store/appState";
import { Box, Image, Text, Group, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Pin from "./pin";
import PropertyModal from "../MapSearch/PropertyModal";

// Map.accessToken = import.meta.env.VITE_MAP_BOX_TOKEN

const AppMap = ({ popupInfo, setPopupInfo, scrollToId, add }) => {
  const [viewState, setViewState] = useState({
    longitude: 31.53824,
    latitude: 30.00624,
    zoom: 12,
  });
  const modalData = useSignal(null);
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
          longitude={item.coordinates.lng}
          latitude={item.coordinates.lat}
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

  const [marker, setMarker] = useState({
    latitude: 30.00629,
    longitude: 31.5385,
  });
  const [events, logEvents] = useState({});

  const onMarkerDrag = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  }, []);

  const onMarkerDragEnd = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
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
        mapStyle="https://api.maptiler.com/maps/cbe8b2a4-35f8-4e67-8da7-756e800105fb/style.json?key=Md8YyiA86Xu6krfSho9R"
        attributionControl={true}
      >
        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.coordinates.lng}
            latitude={popupInfo.coordinates.lat}
            onClose={() => setPopupInfo(null)}
          >
            <Paper>
              <Text fz="lg" ta="center">
                {" "}
                {popupInfo.title}
              </Text>
              <Group>
                <Box w={80}>
                  <Image
                    src={
                      new URL(
                        `../../assets/images/${popupInfo.images[0]}.webp`,
                        import.meta.url
                      ).href
                    }
                    alt="vv"
                  />
                </Box>
                <Box>
                  <Text fz="sm">Price: {popupInfo.price} LE</Text>
                  <Text fz="sm">Area: {popupInfo.area} sqm</Text>
                  <Text fz="sm">Rooms: {popupInfo.rooms}</Text>
                </Box>
              </Group>
            </Paper>
          </Popup>
        )}
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
          draggable
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={20} />
        </Marker>
      </Map>
      {add && <ControlPanel events={events} />}
      <PropertyModal
        modalData={modalData.value}
        opened={opened}
        close={close}
      />
    </>
  );
};

export default AppMap;
