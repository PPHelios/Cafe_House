import {
  createStyles,
  Text,
  Container,
  ActionIcon,
  Group,
  rem,
  Image,
  Box,
  Paper 
} from "@mantine/core";

function PlaceDetails({ item, setPopupInfo }) {
  return (
    <Paper p={10}  onClick={() => {
      setPopupInfo(item)
    }}>
      <Text fz="lg"> {item?.get("adName")}</Text>
                <Group>
              <Box w="100%">
              <Image  src={item?.get("pic0")?._url} alt="property picture"
              
              />
             </Box>
             <Box>
             <Text fz="sm" >Price: {item?.get("price")} LE</Text>
             <Text fz="sm" >Area: {item?.get("area")} m</Text>
             <Text fz="sm" >Rooms: {item?.get("room")}</Text>
             <Text fz="sm" >Baths: {item?.get("bath")}</Text>
             </Box>
            </Group>
      </Paper>
  )
}

export default PlaceDetails