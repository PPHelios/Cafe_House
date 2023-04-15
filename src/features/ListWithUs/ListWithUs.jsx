import { Link } from "react-router-dom";
import {
  Title,
  Text,
  Box,
  Stack,
createStyles,
  UnstyledButton,
  Overlay,
  SimpleGrid,
  rem,

} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  categoryCard: {
    width: rem(300),
    height: rem(200),
    position: "relative",
    backgroundSize: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: theme.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    overflow: "hidden",
    transition: "background-size 300ms ease",

    "&:hover": {
      backgroundSize: "105%",
    },
  },

  categoryLabel: {
    color: theme.white,
    zIndex: 2,
    position: "relative",
  },
}));

const categories = [
  {
    label: "Agency",
    link: "/signupagency",
    image: new URL("../../assets/images/agency.webp", import.meta.url).href,
    alt: " smiling agent holding small house",
  },
  {
    label: "Agent",
    link: "/signupagent",
    image: new URL("../../assets/images/agent.webp", import.meta.url).href,
    alt: " group of confident agents",
  },
];
function ListWithUs() {
  const { classes } = useStyles();
  const items = categories.map((category) => (
    <UnstyledButton
      style={{ backgroundImage: `url(${category.image})` }}
      className={classes.categoryCard}
      key={category.label}
    >
      <Box component={Link} to={category.link}>
        <Overlay color="#000" opacity={0.6} zIndex={1} />
        <Text
          size="xl"
          align="center"
          weight={700}
          className={classes.categoryLabel}
         sx={{textDecoration:"none"}}
        >
          {category.label}
        </Text>
      </Box>
    </UnstyledButton>
  ));
  return (
    <Box component="main" mt={80}>
      <Stack
        w={{ base: "90%", sm: "80%" }}
        maw={900}
        mx="auto"
        mb="2rem"
        spacing={25}
      >
        <Title order={1}>
          Let
          <Title order={1} c="blue.4">
            My Home
          </Title>
          Build Your Business
        </Title>
        <Text fz="xl" fw={500}>
          Reach millions of buyers, sellers and renters on the featured real
          estate network.
        </Text>
      </Stack>

      <SimpleGrid
        w={{ base: "90%", sm: "80%" }}
        maw={900}
        mx="auto"
        justify="center"
        align="center"
        cols={2}
        sx={{ justifyItems: "center" }}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        {items}
      </SimpleGrid>
    </Box>
  );
}
export default ListWithUs;
