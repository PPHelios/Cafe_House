import {
  Badge,
  createStyles,
  rem,
  Text,
  ActionIcon,
  Group,
  Image,
  Card,
  Box,
} from "@mantine/core";
import Parse from "parse/dist/parse.min.js";
import { IconHeart, IconShare } from "@tabler/icons-preact";
import {
  addToFavorites,
  userData,
  userFavorites,
  removeFromFavorites,
} from "../../store/appState";
import { useState } from "preact/hooks";
import { effect, signal } from "@preact/signals";
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  actionButtons: {
    display: "flex",
    justifyContent: "flex-end",
    padding: `${theme.spacing.sm} ${theme.spacing.sm}`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

function PlaceDetails({ item, setPopupInfo, modal }) {
  const fav = userFavorites.value.some(
    (favorite) => item.id === favorite.get("propertyPointer").id
  );

  const [isFavorite, setIsFavorite] = useState(fav);

  console.log(isFavorite);

  const { classes } = useStyles();

  const data = [
    {
      title: "Rooms",
      value: item?.get("room"),
    },
    {
      title: "Baths",
      value: item?.get("bath"),
    },
    {
      title: "Area",
      value: `${item?.get("area")} m`,
    },
  ];
  const items = data.map((stat) => (
    <div key={stat.title}>
      <Text size="xs" color="dimmed">
        {stat.title}
      </Text>
      <Text weight={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ));

  const handleClick = async () => {
    if (!isFavorite) {
      try {
        await addToFavorites(item);
        setIsFavorite(true);
      } catch (err) {
        setIsFavorite(false);
      }
    } else {
      try {
        await removeFromFavorites(item);
        setIsFavorite(false);
      } catch (err) {
        setIsFavorite(true);
      }
    }
  };

  return (
    <>
      <Card
        withBorder
        radius="md"
        className={classes.card}
        onClick={() => {
          setPopupInfo(item);
        }}
      >
        {!modal && (
          <Card.Section sx={{ position: "relative" }}>
            <Box>
              <Image
                src={item?.get("pic0")?._url}
                alt="property picture"
                height={180}
              />
            </Box>

            <Box w={50} sx={{ position: "absolute", bottom: 0, right: 0 }}>
              <Image
                w="100%"
                src={item?.get("agencyPointer").get("profilePic")?._url}
                alt="agency logo"
              />
            </Box>
          </Card.Section>
        )}

        <Card.Section className={classes.section} mt="md">
          <Group position="apart">
            <Text fz="lg" fw={500}>
              {item?.get("adName")}
            </Text>
            <Text fz="md" fw={500}>
              Price: {item?.get("price")} LE
            </Text>
            <Text fz="md" fw={500} c="blue.4">
              Agency: {item?.get("agencyPointer").get("agencyName")}
            </Text>
          </Group>

          <Group my={10}>
            {" "}
            {item?.get("locationTags").map((item) => (
              <Badge size="sm" key={item}>
                {item}
              </Badge>
            ))}
          </Group>
          <Text fz="sm" mt="xs">
            {item?.get("description")}
          </Text>
        </Card.Section>

        <Card.Section className={classes.footer}>{items}</Card.Section>

        <Group mt="xs" className={classes.actionButtons}>
          <ActionIcon
            variant="default"
            radius="md"
            size={36}
            onClick={() => handleClick()}
          >
            <IconHeart
              size="1.1rem"
              className={classes.like}
              stroke={1.5}
              fill={isFavorite ? "red" : "white"}
            />
          </ActionIcon>
          {/* <ActionIcon variant="default" radius="md" size={36} >
            <IconShare size="1.1rem" className={classes.like} stroke={1.5} />
          </ActionIcon> */}
           <Anchor td="none" target="_blank" href={`https://wa.me/+2${item?.get("agentPointer").get("phoneNumber")}?text=I'm%20inquiring%20about%20the%20apartment%20listing%${item.get("adName")}`}>  
           
           
            <ActionIcon variant="default" radius="md" size={36} >
              <IconBrandWhatsapp  size="1.1rem" stroke={1.5} color="blue"/>
            </ActionIcon>
          
          </Anchor>
        </Group>
      </Card>
    </>
  );
}

export default PlaceDetails;
