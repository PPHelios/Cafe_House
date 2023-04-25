import { useState } from "preact/hooks";
import { Link } from "react-router-dom";
import {
  createStyles,
  Table,
  ScrollArea,
  rem,
  Avatar,
  Text,
  Group,
} from "@mantine/core";
import { adminSideBarState, agents } from "../../store/appState";
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

function Agents() {
  adminSideBarState.value = 3;
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
let rowsData = []
if(agents.value.length>0){
  rowsData = agents.value.map((row) => {
    const { firstName, lastName, email, phoneNumber, profilePic, userRole } =
      row?.get("userPointer").attributes;
      const userId = row?.get("userPointer").id
    return (
      <tr key={row.name}>
        <td>
          <Group spacing="sm">
            <Avatar size={26} src={profilePic?._url} radius={26} />
            <Text size="sm" weight={500}>
              {firstName} {lastName}
            </Text>
          </Group>
        </td>
        <td>{userRole}</td>
        <td>{email}</td>
        <td>{phoneNumber}</td>
        <td>
          <Link to={`/adminpanel/editagent/${userId}`} >edit</Link>
        </td>
      </tr>
    );
  });

}
  
  return (
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
            <th>Role</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Ads.</th>
          </tr>
        </thead>
        <tbody>{rowsData.length>1 && rowsData}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default Agents;
