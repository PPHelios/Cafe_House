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
import { Carousel } from "@mantine/carousel";
import Autoplay from 'embla-carousel-autoplay';

//import Parse from "parse/dist/parse.min.js";
import { IconHeart, IconWashTemperature1} from "@tabler/icons-preact";
import {
  addToFavorites,
  userFavorites,
  removeFromFavorites,
} from "../../store/appState";
import { useRef, useState } from "preact/hooks";
import WhatsappButton from "../Buttons/WhatsappButton";
import PhoneNumberButton from "../Buttons/PhoneNumberButton";
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
    justifyContent: "center",
    alignItems: "center",
    padding: `${theme.spacing.sm} ${theme.spacing.sm}`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

function PlaceDetails({ item, setPopupInfo, modal, favoritesPage,handlePropertyAction,handlePropertyView }) {
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  const fav = userFavorites.value.some((favorite) => {
    return item.id === favorite.get("propertyPointer").id;
  });

  const [isFavorite, setIsFavorite] = useState(fav);

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
    {
      title: "Views",
      value: `${item?.get("userViews")}`,
    }
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

  const handleClick = async (e) => {
    e.stopPropagation();
    if (!isFavorite) {
      try {
        setIsFavorite(true);
        const saveFavorite = await addToFavorites(item);
        if (!saveFavorite) setIsFavorite(false);
      } catch (err) {
        setIsFavorite(false);
      }
    } else {
      try {
        setIsFavorite(false);
        const removeFavorite = await removeFromFavorites(item);
        if (!removeFavorite) setIsFavorite(true);
      } catch (err) {
        setIsFavorite(true);
      }
    }
  };
const handleView = ()=>{
  if (!favoritesPage){
    setPopupInfo(item);
    handlePropertyView(item)
  }  
}

let carouselSlides =[]
if(item){
   carouselSlides = item?.get("picUrls").map(url=>(
<Carousel.Slide>
                    <Image
                      src={url}
                      alt="property picture"
                    />
                  </Carousel.Slide>
))
}
  const phoneNumber = item?.get("agentPointer")?.attributes?.phoneNumber;
  const propertyCode = item?.get("agentPointer")?.attributes?.propertyCode;
  return (
    <>
      <Card
        withBorder
        radius="md"
        className={classes.card}
       
      >
        {!modal && (
          <Card.Section sx={{ position: "relative" }}  onClick={handleView}>
             <Carousel
                maw={600}
                mx="auto"
                slideSize="100%"
                slideGap="xs"
                controlsOffset="xs"
                withIndicators
                loop
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
              >
                {carouselSlides}
               
                {/*          
                {item?.get("video1")?._url && (
                  <Carousel.Slide>
                    <video
                      src={item.get("video1")._url}
                      alt="property video"
                      video controls="controls"
                      type="video/mp4"
                    />
                  </Carousel.Slide>
                )} */}
              </Carousel>

            <Box w={50} sx={{ position: "absolute", bottom: 0, right: 0 }}>
              <Image
                w="100%"
                src={item?.get("agencyPointer")?.get("userPointer")?.get("profilePic")?._url}
                alt="agency logo"
              />
            </Box>
          </Card.Section>
        )}

        <Card.Section className={classes.section} mt="md"  onClick={handleView}>
          <Group position="apart">
            <Text fz="lg" fw={500}>
              {item?.get("adName")}
            </Text>
            <Text fz="md" fw={500}>
              Price: {item?.get("price")} LE
            </Text>
            <Text fz="md" fw={500} c="blue.4">
              Agency: {item?.get("agencyPointer")?.get("agencyName")}
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

        <Card.Section className={classes.footer}  onClick={handleView}>{items}</Card.Section>

        <Group mt="xs" className={classes.actionButtons}>
       
          <ActionIcon
            variant="default"
            radius="md"
            size={36}
            onClick={(e) => handleClick(e)}
          >
             <div onClick={()=>handlePropertyAction(item)}>
            <IconHeart
              size="1.1rem"
              className={classes.like}
              stroke={1.5}
              fill={isFavorite ? "red" : "white"}
            />
             </div>
          </ActionIcon>
         
          {/* <ActionIcon variant="default" radius="md" size={36} >
            <IconShare size="1.1rem" className={classes.like} stroke={1.5} />
          </ActionIcon> */}
         {!modal && <> 
         <div onClick={()=>handlePropertyAction(item)}>
                   <PhoneNumberButton phoneNumber={phoneNumber} />

         </div>
<div onClick={()=>handlePropertyAction(item)}>
  <WhatsappButton
            phoneNumber={phoneNumber}
            propertyCode={propertyCode}
           
          /> 
</div>
          
          </>
          }
        </Group>
      </Card>
    </>
  );
}

export default PlaceDetails;
