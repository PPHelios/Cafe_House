import { useState} from "preact/hooks";
import { createStyles, Table, ScrollArea, rem ,Avatar, Text,Group,} from '@mantine/core';
import {  adminSideBarState, properties } from "../../store/appState";
const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',
    zIndex:100,

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
 
}));




function ListedProperties() {


  adminSideBarState.value=2
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

 
const rows = properties.value.map((row) => {
    const {adName, price, area, room, bath,pic0, propertyType,listingType, adStatus, isFeatured} = row?.attributes
    return(
    
    <tr key={row.name}>
       <td>
          <Group spacing="sm">
            <Avatar size={26} src={pic0._url} radius={26} />
            <Text size="sm" weight={500}>
              {adName} 
            </Text>
          </Group>
        </td>
        <td>{price}</td>
        <td>{area}</td>
        <td>{room}</td>
        <td>{bath}</td>
        <td>{propertyType}</td>
        <td>{listingType}</td>
        <td>{adStatus}</td>
        <td>{isFeatured}</td>
        
    </tr>
  )})

  return (
    <ScrollArea w="calc(100vw - 80px)" h={300} type="auto" offsetScrollbars onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Ad. Name</th>
            <th>Price</th>
            <th>Area</th>
            <th>Rooms</th>
            <th>Bath</th>
            <th>Property Type</th>
        <th>Listing Type</th>
        <th>Ad Status</th>
        <th>Is Featured</th>
          </tr>
        </thead>
        <tbody>{properties.value && rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default ListedProperties

