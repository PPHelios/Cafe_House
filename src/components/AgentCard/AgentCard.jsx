import {
  createStyles,
  rem,
  Text,
  ActionIcon,
  Group,
  Card,
  Avatar,
  Anchor,
} from "@mantine/core";
import { IconPhoneCall, IconMail,IconBrandWhatsapp  } from "@tabler/icons-preact";
const useStyles = createStyles((theme) => ({
  card: {
    position: 'sticky',
    top: 90,
    overflow:"visible",
    alignSelf: "flex-start",
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

 
}));

function AgentCard({ item }) {
  
  const { classes } = useStyles();
  const { firstName, lastName, bio, agencyName, email, phoneNumber } =
    item?.get("agentPointer").attributes;

  return (
    <>
      <Card
        withBorder
        radius="md"
        p="md"
        className={classes.card}

      >
        <Card.Section>
          <Group position="center">
            <Avatar
              size={90}
              radius="xl"
              src={item?.get("agentPointer")?.get("profilePic")?._url}
              alt="agent profile picture"
            />
          </Group>
        </Card.Section>

        <Card.Section className={classes.section} mt="md">
          <Group position="apart">
            <Text fz="lg" fw={500} ta="center">
              {firstName} {lastName}
            </Text>
          </Group>
          <Group>
            <Text fz="xl" fw={600} c="blue.4">
              Agency:
            </Text>
            <Text fz="md" fw={500} c="blue.4">
              {agencyName}
            </Text>
          </Group>
          <Group mt="xs" position="start" sx={{flexWrap:"nowrap",justifyContent:"flex-start" ,alignItems:"flex-start"}} >
            <Text  fz="xl" fw={600}>
              Bio:
            </Text><Text  fz="sm">
              {bio}
            </Text>
          </Group>

          <Group mt={10}>
            <ActionIcon variant="default" radius="md" size={36}>
              <IconPhoneCall size="1.1rem" stroke={1.5} color="blue"/>
            </ActionIcon>
            <Text fz="md" fw={500}>{phoneNumber}</Text>
          </Group>

          <Group mt={10}>
            <ActionIcon variant="default" radius="md" size={36}>
              <IconMail size="1.1rem" stroke={1.5} color="blue"/>
            </ActionIcon>
            <Text fz="md" fw={500}>{email}</Text>
          </Group>
           <Anchor td="none" target="_blank" href={`https://wa.me/+2${phoneNumber}?text=I'm%20inquiring%20about%20the%20apartment%20listing%${item.get("adName")}`}>  
           <Group mt={10}>
           
            <ActionIcon variant="default" radius="md" size={36} >
              <IconBrandWhatsapp  size="1.1rem" stroke={1.5} color="blue"/>
            </ActionIcon>
            <Text fz="md" fw={500}>{phoneNumber}</Text>
          </Group>
          </Anchor>
        
        </Card.Section>
      </Card>
      
    </>
  );
}

export default AgentCard;
