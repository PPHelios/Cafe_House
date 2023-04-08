import { Menu, Button } from "@mantine/core";
import {
  IconShape,
  IconSortDescendingNumbers,
  IconSortAscendingNumbers,
  IconArrowsSort,
} from "@tabler/icons-preact";
import {
  sortHighToLow,
  sortLowToHigh,
  sortByArea,
} from "../../store/appState";

function PropertiesFilterMenu() {
  return (
    <Menu mt={10} shadow="md" width={200}>
      <Menu.Target>
        <Button variant="gradient" ml="auto" display="block" leftIcon={<IconArrowsSort size="1rem" />}>Sort</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<IconSortDescendingNumbers stroke={1.3} />}
          onClick={() => sortHighToLow()}
        >
          Price (High To Low)
        </Menu.Item>
        <Menu.Item
          icon={<IconSortAscendingNumbers stroke={1.3} />}
          onClick={() => sortLowToHigh()}
        >
          Price (Low To High)
        </Menu.Item>
        <Menu.Item icon={<IconShape stroke={1.3} />} onClick={() => sortByArea()}>
          Area
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default PropertiesFilterMenu;
