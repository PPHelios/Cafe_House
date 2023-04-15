import { useState, useRef } from "preact/hooks";

import { Box, Flex } from "@mantine/core";
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails";
import AppMap from "../Map/AppMap";
import { filteredData } from "../../store/appState";
import PropertySearchBar from "../../components/PropertySearchBar/PropertySearchBar";
import PropertiesFilterMenu from "../../components/PropertiesFilterMenu/PropertiesFilterMenu";

function MapSearch() {
  const [popupInfo, setPopupInfo] = useState(null);

  // const itemsRef = useRef(null);
  // const containerRef = useRef(null);
  // function scrollToId(itemId) {
  //   const map = getMap();
  //   const node = map.get(itemId);
  //   node.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //     inline: "nearest",
  //   });
  // }

  // function getMap() {
  //   if (!itemsRef.current) {
  //     // Initialize the Map on first usage.
  //     itemsRef.current = new Map();
  //   }
  //   return itemsRef.current;
  // }

  return (
    <>
      <PropertySearchBar />
      <Flex
        mt={20}
        py={10}
        h={{ base: 700, xs: 600 }}
        direction={{ base: "column", xs: "row" }}
        gap={{ base: 60, sm: 0 }}
       
      >
        <Box
          w={{ base: "94vw", xs: "48vw" }}
          h={{ base: 500, xs: 600 }}
          mx="auto"
        >
          <AppMap
            popupInfo={popupInfo}
            setPopupInfo={(item) => setPopupInfo(item)}
            scrollToId={(i) => scrollToId(i)}
            add={true}
          />
        </Box>
        <Box
          w={{ base: "94vw", xs: "40vw" }}
          h={{ base: 700, xs: 600 }}
          mx="auto"
          pt={5}
          px={9}
          bg="gray.3"
          // ref={containerRef}
          sx={{ overflowY: "auto", overflowX: "hidden" }}
        >
          <PropertiesFilterMenu />
          {filteredData.value &&
            filteredData.value.map((item, i) => (
              <Box
                mt={10}
              
                // ref={(node) => {
                //   const map = getMap();
                //   if (node) {
                //     map.set(i, node);
                //   } else {
                //     map.delete(i);
                //   }
                // }}
                key={i}
              >
                <PlaceDetails
                  item={item}
                  setPopupInfo={(item) => setPopupInfo(item)}
                />
              </Box>
            ))}
        </Box>
      </Flex>
    </>
  );
}

export default MapSearch;
