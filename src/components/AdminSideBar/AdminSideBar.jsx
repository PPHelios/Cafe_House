import { adminSideBarState } from '../../store/appState';
import { Navbar, Box, Tooltip, UnstyledButton, createStyles, Stack, rem } from '@mantine/core';
import {
  IconHome2,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconHomeEdit,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
   IconSubtask
} from '@tabler/icons-preact';
import { Link } from 'react-router-dom';


const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.white,
    opacity: 0.85,

    '&:hover': {
      opacity: 1,
      backgroundColor: theme.colors.cyan[6]
    },
  },

  active: {
    opacity: 1,
    '&, &:hover': {
      backgroundColor: theme.colors.cyan[4]
    },
  },
}));



function NavbarLink({ icon: Icon, label, active, onClick, to }) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      
      <UnstyledButton component={Link} to={to} onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
     
    </Tooltip>
  );
}

const mockdata = [
  
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' , target:"adminpanel/agentanalytics"},
  { icon: IconHomeEdit, label: 'Add Property', target:"adminpanel/addproperty" },
  { icon: IconSubtask, label: 'Listed Properties', target:"adminpanel/listedproperties" },
  { icon: IconUser, label: 'Account', target:"adminpanel/account" },
  { icon: IconFingerprint, label: 'Security', target:"adminpanel/security" },
  { icon: IconSettings, label: 'Settings', target:"adminpanel/settings" },
];

export default function AdminSideBar() {
  

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      to={`/${link?.target}`}
      active={index === adminSideBarState.value}
      onClick={() => adminSideBarState.value=index}
    />
  ));

  return (
    <Navbar
      height={750}
      width={{ base: 80 }}
      p="md"
      sx={(theme) => ({
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background,
      })}
    >
      {/* <Center>
        <MantineLogo type="mark" inverted size={30} />
      </Center> */}
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}