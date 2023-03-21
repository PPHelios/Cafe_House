import { useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import {
  createStyles,
  Header,
  Container,
  Menu,
  Group,
  Center,
  Burger,
  Paper,
  Transition,
  UnstyledButton,
  Text,
  Box,
  Collapse,
  Stack,
  Drawer,
  Button,
  Anchor,
  Image,
} from "@mantine/core";

import IconChevronDown from "../../assets/images/chevron-down.svg";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  header: {
    display: "flex",
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      justifyContent: "space-between",
    },
    [`@media (max-width: ${theme.breakpoints.xs})`]: {
      justifyContent: "center",
    },
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  user: {
    color: "red",
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.1
      ),
    },
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background,
      0.1
    ),
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",

    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
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
  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: 38,
    color: theme.white,
    backgroundColor: "transparent",
    borderColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.1
      ),
    },

    "&[data-active]": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.1
      ),
      borderColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
    },
  },
}));

const links = [
  { link: "/", label: "home" },
  { link: "todaySpecial", label: "todaySpecial" },
  { link: "menu", label: "menu" },
  { link: "contact", label: "contact" },
];
export function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const [opened2, { open, close }] = useDisclosure(false);
  const { t } = useTranslation("common");

  const items = links.map((link) => (
    <Anchor
      component={Link}
      key={link.label}
      to={link.link}
      className={classes.link}
    >
      {t(`navBar.${link.label}`)}
    </Anchor>
  ));

  return (
    <>
      <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
        <Container
          size="xl"
          sx={{
            display: "flex",
            [`@media (min-width: ${theme.breakpoints.sm})`]: {
              justifyContent: "space-between",
            },
            [`@media (max-width: ${theme.breakpoints.xs})`]: {
              justifyContent: "center",
            },

            alignItems: "center",
            height: "100%",
          }}
        >
          <Group
            spacing={7}
            w={{ base: "100%", sm: "fit-content" }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
              mr="auto"
            />
            <Group mr="auto" pl={{ sm: 70 }}>
              <Box>
                <Image
                  maw={50}
                  src={
                    new URL(`../../assets/images/logo.png`, import.meta.url)
                      .href
                  }
                  alt="Random image"
                />
              </Box>

              <Text
                weight={700}
                size="2rem"
                lts="2px"
                sx={{ fontFamily: "Damion, cursive", lineHeight: 1.5 }}
                c="#c79c60"
              >
                Cafe House
              </Text>
            </Group>
          </Group>

          <Group
            spacing={1}
            className={classes.links}
            sx={{
              justifyContent: "center",
              alignItems: "center",

              "& :first-child": {
                fontFamily: "Damion, cursive",
                lineHeight: 2,
                color: "#c79c60",
                fontSize: "1.5rem",
              },
            }}
          >
            {items}
          </Group>

          <Transition
            transition="pop-top-right"
            duration={200}
            mounted={opened}
          >
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>
        </Container>
      </Header>
      <Drawer opened={opened2} onClose={close} title="Authentication">
        {/* Drawer content */}
      </Drawer>

      <Group position="center">
        <Button onClick={open}>Open Drawer</Button>
      </Group>
    </>
  );
}
