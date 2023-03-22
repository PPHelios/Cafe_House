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
  Text,
  Box,
  Collapse,
  Stack,
  Drawer,
  Button,
  Anchor,
  Image,
  Flex,
} from "@mantine/core";

import navUnderline from "../../assets/images/nav-underline.png";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";

const HEADER_HEIGHT = 70;

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  link: {
    py: 12,
    display: "block",
    lineHeight: 1,
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    color: theme.colors.gray[3],
    "&:hover": {
      textDecoration: "none",
      color: theme.colors.gold[0],
    },
  },

  linkActive: {
    fontFamily: "Damion, cursive",
    fontSize: theme.fontSizes.xl,
    fontWeight: 500,
    color: theme.colors.gold[0],
    backgroundImage: `url(${navUnderline})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 90%",
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
  const { classes, theme, cx } = useStyles();
  const [opened2, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(0);
  const { t } = useTranslation("common");

  const items = links.map((link, index) => (
    <Anchor
      component={Link}
      key={link.label}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: index === active,
      })}
      onClick={() => {
        setActive(index);
      }}
      py={24}
      px={{ xs: 7, md: 12 }}
      textDecoration="none"
      // bg="teal"
    >
      {t(`navBar.${link.label}`)}
    </Anchor>
  ));

  return (
    <>
      <Header height={HEADER_HEIGHT} className={classes.root}>
        <Container size="xl" height="100%" bg="black">
          <Flex h={70} justify={{ xs: "center", sm: "space-between" }}>
            <Group
              spacing={7}
              w={{ base: "100%", sm: "fit-content" }}
              position="center"
            >
              <Burger
                opened={opened}
                onClick={toggle}
                display={{ xs: "block", sm: "none" }}
                c="gold.0"
                size="sm"
                mr="auto"
                title="Open navigation menu"
                aria-label="Open navigation menu"
              />
              <Group mr="auto" pl={{ md: 70 }}>
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
                  weight={500}
                  size="2rem"
                  lts="2px"
                  sx={{ fontFamily: "Damion, cursive", lineHeight: 1.5 }}
                  c="gold.0"
                >
                  Cafe House
                </Text>
              </Group>
            </Group>

            <Group
              spacing={1}
              display={{ base: "none", sm: "flex" }}
              justify="center"
              align="center"
            >
              {items}
            </Group>
          </Flex>

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
    </>
  );
}
