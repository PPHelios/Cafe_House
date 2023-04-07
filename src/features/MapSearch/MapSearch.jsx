import { useState, useRef } from "preact/hooks";

import {
  createStyles,
  Text,
  Container,
  ActionIcon,
  Group,
  rem,
  Image,
  Box,
  Stack,
  Flex,
} from "@mantine/core";
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails";
import AppMap from "../Map/AppMap";
import { filteredData } from "../../store/appState";

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
    <Flex py={30} h={600}>
      <Box w="68vw" h={600}>
        <AppMap
          popupInfo={popupInfo}
          setPopupInfo={(item) => setPopupInfo(item)}
          scrollToId={(i) => scrollToId(i)}
          add={true}
        />
      </Box>
      <Box
        w="30vw"
        px={9}
        bg="gray.3"
        // ref={containerRef}
        sx={{ overflowY: "auto", overflowX: "hidden" }}
      >
        {filteredData?.value.map((item, i) => (
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
  );
}

export default MapSearch;
