

import {
  Title,
  Text,

  Overlay,
  createStyles,
  rem,


} from "@mantine/core";
import hero from "../../assets/images/hero.webp";


import PropertySearchBar from "../../components/PropertySearchBar/PropertySearchBar";

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: rem(600),
    position: "relative",
    paddingTop: rem(120),
    paddingBottom: rem(130),
    backgroundImage: `url(${hero})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.fn.smallerThan("sm")]:{
      height: rem(700),
    },
    [theme.fn.smallerThan("xs")]: {
      paddingTop: rem(80),
      paddingBottom: rem(50),
      height: rem(700),
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: rem(-1),
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: "center",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      textAlign: "left",
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: "center",

    [theme.fn.smallerThan("xs")]: {
      fontSize: theme.fontSizes.md,
      textAlign: "left",
    },
  },
}));



export function Hero() {
 
  const { classes } = useStyles();
  
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.25} zIndex={1} />

      <main className={classes.inner}>
        <Title className={classes.title}>
          Find your home with the people{" "}
          <Text component="span" inherit className={classes.highlight}>
            you trust.
          </Text>
        </Title>

<PropertySearchBar/>
      </main>
    </div>
  );
}
