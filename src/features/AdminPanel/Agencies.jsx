import { useState } from "preact/hooks";
import { Link, useNavigate } from "react-router-dom";
import {
  createStyles,
  Table,
  ScrollArea,
  rem,
  Avatar,
  Text,
  Group,
  Button,
} from "@mantine/core";
import { adminSideBarState, agencies } from "../../store/appState";
const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

function Agencies() {
  adminSideBarState.value = 1;
  const navigate= useNavigate()
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
let rowsData = []
if(agencies.value.length>0){
  rowsData = agencies.value.map((row) => {
    const { firstName, lastName, email, phoneNumber, profilePic, agencyName} =
      row?.get("userPointer").attributes;
      const {credits , numberOfAds} = row?.attributes;
      const userId = row?.get("userPointer").id
    return (
      <tr key={userId}>
        <td>
          <Group spacing="sm">
            <Avatar size={26} src={profilePic?._url} radius={26} />
            <Text size="sm" weight={500}>
              {firstName} {lastName}
            </Text>
          </Group>
        </td>
        <td>{agencyName}</td>
        <td>{email}</td>
        <td>{phoneNumber}</td>
        <th>{numberOfAds}</th>
        <th>{credits}</th>
      </tr>
    );
  });

}
  
  return (
    <>
    <Button my={20} ml="auto" mr={30} display="block" variant="gradient" onClick={()=>navigate("/signupagency")} >Add New Agency</Button>
    <ScrollArea
      w="calc(100vw - 100px)"
      maw={1000}
      h="calc(100vh - 80px)"
      scroll
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table w="max-content">
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Name</th>
            <th>agencyName</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>numberOfAds</th>
            <th>credits</th>
            
          </tr>
        </thead>
        <tbody>{rowsData.length>0 && rowsData}
        
        </tbody>
      </Table>
    </ScrollArea>
    </>
  );
}

export default Agencies;
