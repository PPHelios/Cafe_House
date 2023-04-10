import {
  Box,
} from "@mantine/core";
import PlaceDetails from "../../components/PlaceDetails/PlaceDetails";

import { userFavorites } from "../../store/appState";


function UserFavoritesPage() {


  return (

  
    <Box
     
      px={20}
      bg="gray.3"
      // ref={containerRef}
      
    >

      {userFavorites.value && userFavorites.value.map((item, i) => (
        <Box
          mt={10}
          key={i}
        >
          <PlaceDetails
            item={item.get("propertyPointer")}
          />
        </Box>
      ))}
    </Box>

  )
}

export default UserFavoritesPage