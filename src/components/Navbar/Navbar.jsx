import { useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  createStyles,
  Header,
  Group,
  ActionIcon,
  Container,
  Burger,
  rem,
  Box,
  Button,
  Image,
  Text,
  Drawer,
  Avatar,
  UnstyledButton,
  Menu,
  Collapse,
  List,
  ThemeIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconWorld,
  IconLogout,
  IconHeart,
  IconStar,
  IconHomeEdit,
  IconSettings,
  IconChevronDown,
  IconChevronLeft, IconChevronRight ,
  IconAirBalloon ,
  IconHeartHandshake 
} from "@tabler/icons-preact";
import { userData, logout } from "../../store/appState";
import { ThemeToggler } from "../ThemeToggler/ThemeToggler";

import logo from "../../assets/images/logo.png";

const useStyles = createStyles((theme) => ({
  inner: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  actions: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
  burger: {
    marginRight: theme.spacing.md,
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  burgerProfileLinks: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));


const links = [
  { label: "login", link: "/login" },
  { label: "signup", link: "/signup" },
];
export function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const [opened2, { open, close }] = useDisclosure(false);
  const [opened3, setOpened] = useState( false);
  const [listWithUsOpened, setListWithUsOpened] = useState( false);
  const [active, setActive] = useState(links[0].label);
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const avatarUrl = userData.value?.attributes?.profilePicUrl;
  const role = userData.value?.attributes?.role;
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;

  const items = links.map((link) => (
    <Box
      component={Link}
      key={link.label}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.label,
      })}
      onClick={() => {
        setActive(link.label);
      }}
    >
      {link.label}
    </Box>
  ));

  return (
    <>
      <Header>
        <Container className={classes.inner} h={80}>
          <Burger
            opened={opened}
            onClick={() => {
              toggle();
              open();
            }}
            size="sm"
            className={classes.burger}
            title="side menu"
            aria-label="side menu"
          />

          <Group
            spacing={3}
            position="center"
            component={Link}
            to="/"
            td="none"
          >
            <Text c="blue" ff="Times New Roman" fz={40}>
              My{" "}
            </Text>
            <Box w={66} h={60}>
              {" "}
              <Image src={logo} alt="logo" />
            </Box>

            <Text c="blue" ff="Times New Roman" fz={40}>
              ome
            </Text>
          </Group>

          <Group
            spacing={10}
            className={classes.actions}
            position="center"
            noWrap
          >
            {!userData.value?.id ? (
              <Group spacing={2}>{items}</Group>
            ) : (
              <Menu
                width={260}
                position="bottom-end"
                transitionProps={{ transition: "pop-top-right" }}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                withinPortal
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, {
                      [classes.userActive]: userMenuOpened,
                    })}
                  >
                    <Group spacing={7}>
                       
                        <Avatar
                          src={avatarUrl}
                          alt="user avatar picture"
                          radius="xl"
                          size={42}
                        />
                     
                      <Text
                        weight={500}
                        size="sm"
                        sx={{ lineHeight: 1 }}
                        mr={3}
                      >
                        Hi, {userData.value?.attributes?.firstName}
                      </Text>
                      <IconChevronDown size={rem(12)} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    icon={
                      <IconHeart
                        size="0.9rem"
                        color={theme.colors.red[6]}
                        stroke={1.5}
                      />
                    }
                  >
                  <Text component={Link} to="/user/likedproperties"> Liked Properties</Text>
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      <IconStar
                        size="0.9rem"
                        color={theme.colors.yellow[6]}
                        stroke={1.5}
                      />
                    }
                  >
                     <Text component={Link} to="/user/savedsearches"> Saved Searches</Text>
                   
                  </Menu.Item>
                  {role !== "viewer" && (
                    <Menu.Item
                      icon={
                        <IconHomeEdit
                          size="0.9rem"
                          color={theme.colors.blue[6]}
                          stroke={1.5}
                        />
                      }
                    >
                     <Text component={Link} to="/adminpanel/addproperty"> Manage Ads.</Text>

                    </Menu.Item>
                  )}

                  <Menu.Label>Settings</Menu.Label>
                  <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
                  <Text component={Link} to="/user/accountsettings">Account settings</Text>

                  </Menu.Item>

                  <Menu.Item
                    icon={<IconLogout size="0.9rem" stroke={1.5} />}
                    onClick={() => logout()}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
            <ActionIcon size="lg">
              <IconWorld size="2rem" stroke={1.5} />
            </ActionIcon>
            <ThemeToggler />
            <Button
              component={Link}
              to="/Listwithus"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
            >
              List With Us
            </Button>
          </Group>
        </Container>
      </Header>
      <Drawer
        opened={opened2}
        size={300}
        onClose={() => {
          close();
          toggle();
        }}
        title="My Home"
      >
        {!userData.value?.id ? <Group position="center" my="0.4rem" spacing={42}>{items}</Group>:
                <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
                    <Group position="apart" spacing={0} pl={10}>
                      <Group>

                        
                        <Avatar
                          src={avatarUrl}
                          alt="user avatar picture"
                          radius="xl"
                          size={42}
                        />
                      
                      <Text
                        weight={500}
                        size="sm"
                        sx={{ lineHeight: 1 }}
                        mr={3}
                      >
                        Hi, {userData.value?.id ? userData.value?.attributes?.firstName : "There"}
                      </Text>
                      </Group>
                     
                         <ChevronIcon
              className={classes.chevron}
              size="1rem"
              stroke={1.5}
              style={{
                transform: opened3 ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
              }}
            />
                    </Group>
                 
                    </UnstyledButton>
}
                    <Collapse in={opened3}>
                    <List>
                    <List.Item
                    className={classes.burgerProfileLinks}
        icon={
          <IconHeart
            size="1rem"
            color={theme.colors.yellow[6]}
            stroke={1.5}
          />
        }
      >
        <Text component={Link} to="\user/likedproperties"> Liked Properties</Text>
       
      </List.Item>
      <List.Item
       className={classes.burgerProfileLinks}
        icon={
          <IconStar
          size="1rem"
          color={theme.colors.yellow[6]}
          stroke={1.5}
        />
        }
      >
        <Text component={Link} to="\user/savedsearches"> Saved Searches</Text>
       
      </List.Item>
      {role !== "viewer" &&
 <List.Item
 className={classes.burgerProfileLinks}
  icon={
    <IconHomeEdit
    size="1rem"
    color={theme.colors.yellow[6]}
    stroke={1.5}
  />
  }
>
  <Text component={Link} to="/adminpanel/addproperty">Manage Ads.</Text>
 
</List.Item>
}
<List.Item
 className={classes.burgerProfileLinks}
  icon={
    <IconSettings
    size="1rem"
    color={theme.colors.yellow[6]}
    stroke={1.5}
  />
  }
>
  <Text component={Link} to="\user/accountsettings">Account settings</Text>
 
</List.Item>
<List.Item
 className={classes.burgerProfileLinks}
  icon={
    <IconLogout
    size="1rem"
    color={theme.colors.yellow[6]}
    stroke={1.5}
  />
  }
  onClick={() => logout()}
>
  <Text> Logout</Text>
 
</List.Item>
                    </List>
                   
                    </Collapse>

                    <UnstyledButton onClick={() => setListWithUsOpened((o) => !o)} className={classes.control}>
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <IconHeartHandshake  size="1.1rem" />
            </ThemeIcon>
            <Box ml="md">List With Us</Box>
          </Box>
        
            <ChevronIcon
              className={classes.chevron}
              size="1rem"
              stroke={1.5}
              style={{
                transform: listWithUsOpened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
              }}
            />
          
        </Group>
      </UnstyledButton>
      <Collapse in={listWithUsOpened}>
      <List>
                    <List.Item
 className={classes.burgerProfileLinks}>
                  <Box component={Link} to="/signupagency">Agency</Box>

 </List.Item>
 <List.Item
 className={classes.burgerProfileLinks}>
                  <Box component={Link} to="/signupagent">Agent</Box>

 </List.Item>
                    </List>
      </Collapse>
                    <List>
                    <Box sx={{ display: 'flex', alignItems: 'center' }} className={classes.control}>
            <ThemeIcon variant="light" size={30}>
              <IconAirBalloon  size="1.1rem" />
            </ThemeIcon>
            <Box ml="md">Quick Links</Box>
          </Box>
                    <List.Item
 className={classes.burgerProfileLinks}>
                  <Text component={Link} to="/">Buy</Text>

 </List.Item>
 <List.Item
 className={classes.burgerProfileLinks}>
                  <Text component={Link} to="/">Sell</Text>

 </List.Item>
 <List.Item
 className={classes.burgerProfileLinks}>
                  <Text component={Link} to="/contactus">Contact Us</Text>

 </List.Item>
                    </List>
      </Drawer>
    </>
  );
}
