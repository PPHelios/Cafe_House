import {
  Title,
  Text,
  Container,
  Button,
  Center,
  createStyles,
  rem,
  Box,
  Image,
  Flex,
} from "@mantine/core";
import light from "../../assets/images/light.png";
import line from "../../assets/images/line.png";
import table from "../../assets/images/table.png";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingBottom: rem(130),
    backgroundColor: theme.colors.main[0],
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },
  highlight: {
    color: theme.colors.gray[3],
    textAlign: "center",
    fontFamily: "Damion, cursive",
    fontSize: rem(50),
    fontWeight: 500,
    letterSpacing: rem(2),
  },

  title: {
    fontWeight: 800,
    fontSize: rem(62),
    letterSpacing: rem(3),
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.colors.gold[0],
    marginBottom: theme.spacing.xs,
    textAlign: "center",
    fontFamily: "Times New Roman",

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      textAlign: "left",
    },
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: "center",

    [theme.fn.smallerThan("xs")]: {
      fontSize: theme.fontSizes.md,
      textAlign: "left",
    },
  },

  coloredText: {
    display: "inline",
    color: theme.colors.gold[0],
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,
    display: "flex",
    justifyContent: "center",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  control: {
    height: rem(42),
    fontSize: theme.fontSizes.md,

    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    [theme.fn.smallerThan("xs")]: {
      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: "rgba(255, 255, 255, .4)",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, .45) !important",
    },
  },
}));

export function Hero() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Flex
        w="100%"
        justify="center"
        align="flex-start"
        pos="absolute"
        top={0}
        left={0}
      >
        <Box display={{ base: "none", xs: "block" }}>
          <Image src={light} alt="spot light" />
        </Box>
        <Box>
          <Image src={light} alt="spot light" />
        </Box>
        <Box display={{ base: "none", xs: "block" }}>
          <Image src={light} alt="spot light" />
        </Box>
      </Flex>
      <Box className={classes.inner} pb="calc(2rem + 20vw)">
        <Flex justify="center" align="center" pt={160}>
          <Box w={70}>
            <Image src={line} alt="line" />
          </Box>

          <Title className={classes.highlight} mx={20} pr={12}>
            welcome to{" "}
          </Title>
          <Box w={70}>
            <Image src={line} alt="line" />
          </Box>
        </Flex>

        <Title className={classes.title}>cafehouse</Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Build more <Text className={classes.coloredText}>reliable</Text>{" "}
            software with AI companion. AI is also trained to detect lazy
            developers who do nothing and just complain on Twitter.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} variant="white" size="lg">
            Get started
          </Button>
        </div>
        <Flex
          w="100%"
          justify="center"
          align="flex-start"
          pos="absolute"
          left={0}
          bottom="-13.875rem"
        >
          <Box>
            <Image src={table} alt="bar table" />
          </Box>
        </Flex>
      </Box>
    </div>
  );
}
