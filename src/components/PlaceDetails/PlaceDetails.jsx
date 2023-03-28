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
      <Text fz="lg"> {item.title}</Text>
                <Group>
              <Box w="100%">
              <Image  src={new URL(`../../assets/images/${item.images[0]}HQ.webp`, import.meta.url).href} alt="vv"
              
              />
             </Box>
             <Box>
             <Text fz="sm" >Price: {item.price} LE</Text>
             <Text fz="sm" >Area: {item.area} sqm</Text>
             <Text fz="sm" >Rooms: {item.rooms}</Text>
             </Box>
            </Group>
      </Paper>
  )
}

export default PlaceDetails