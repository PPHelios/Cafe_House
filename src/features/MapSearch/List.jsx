import {
  createStyles,
  Text,
  Container,
  ActionIcon,
  Group,
  rem,
  Image,
  Box,
  Stack 
} from "@mantine/core";
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails";
import geoJson from "../Map/chicago-parks.json";
function List({}) {
  return (
    <Box>
      {geoJson.features.map(item=><PlaceDetails item={item} setPopupInfo={(item)=>setPopupInfo(item)}/>)}
    </Box>
  )
}

export default List