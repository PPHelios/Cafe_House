import { adminSideBarState } from "../../store/appState";
import Parse from "parse/dist/parse.min.js";
import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from "@mantine/core";
import {
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconHomeEdit,
  IconUser,
  IconSettings,
  IconLogout,
  IconSubtask,
  IconUsers,
  IconBuildingBank,
} from "@tabler/icons-preact";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  link: {
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.white,
    opacity: 0.85,

    "&:hover": {
      opacity: 1,
      backgroundColor: theme.colors.cyan[6],
    },
  },

  active: {
    opacity: 1,
    "&, &:hover": {
      backgroundColor: theme.colors.cyan[4],
    },
  },
}));

function NavbarLink({ icon: Icon, label, active, onClick, to }) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        component={Link}
        to={to}
        w={{ base: 25, xs: 50 }}
        h={{ base: 25, xs: 50 }}
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const sideBarItems = [
  {
    icon: IconDeviceDesktopAnalytics,
    label: "Analytics",
    target: "adminpanel/agentanalytics",
    role: ["SuperAdmin", "SubAdmin", "Agency", "Admin", "Moderator"],
  },

  {
    icon: IconBuildingBank,
    label: "Agencies",
    target: "adminpanel/agencies",
    role: ["SuperAdmin", "SubAdmin"],
  },
  {
    icon: IconUsers,
    label: "Agents",
    target: "adminpanel/agents",
    role: ["SuperAdmin", "SubAdmin", "Agency", "Admin", "Moderator"],
  },
  {
    icon: IconSubtask,
    label: "Listed Properties",
    target: "adminpanel/listedproperties",
    role: [
      "SuperAdmin",
      "SubAdmin",
      "Agency",
      "Admin",
      "Moderator",
      "SeniorAgent",
      "Agent",
    ],
  },
  {
    icon: IconHomeEdit,
    label: "Add Property",
    target: "adminpanel/addproperty",
    role: ["Agency", "Admin", "Moderator", "SeniorAgent", "Agent"],
  },

  //{ icon: IconUser, label: 'Account', target:"adminpanel/account" },
  // { icon: IconFingerprint, label: 'Security', target:"adminpanel/security" , role:"Moderator"},
  // { icon: IconSettings, label: 'Settings', target:"adminpanel/settings" },
];

export default function AdminSideBar() {
  const role = Parse.User.current()?.get("userRole");

  const links = sideBarItems.map((link, index) => {
    if (link.role.includes(role)) {
      return (
        <NavbarLink
          {...link}
          key={link.label}
          to={`/${link?.target}`}
          active={index === adminSideBarState.value}
          onClick={() => (adminSideBarState.value = index)}
        />
      );
    }
  });

  return (
    <Navbar
      height="calc(100vh - 80px)"
      width={{ base: 40, xs: 80 }}
      p={{ base: "xs", sm: "md" }}
      pos="sticky"
      top={0}
      sx={(theme) => ({
        backgroundColor: theme.fn.variant({
          variant: "filled",
          color: theme.primaryColor,
        }).background,
      })}
    >
      {/* <Center>
        <MantineLogo type="mark" inverted size={30} />
      </Center> */}
      <Navbar.Section grow mt={50}>
        <Stack justify="center" align="center">
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" align="center">
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
