import {
  ActionIcon,
  Group,
  Anchor,
  Text,
} from "@mantine/core";

import {  IconBrandWhatsapp } from "@tabler/icons-preact";

function WhatsappButton({phoneNumber, propertyCode=0}) {
  return (
    <Anchor
    td="none"
    c="black"
    target="_blank"
    href={`https://wa.me/+2${phoneNumber}?text=I'm%20inquiring%20about%20the%20apartment%20listing%${propertyCode}`}
  >
    <Group  sx={{justifyContent:"center"}}>
      <ActionIcon variant="default" radius="md" size={36}>
        <IconBrandWhatsapp
          size="1.1rem"
          stroke={1.5}
          color="blue"
        />
      </ActionIcon>
      {/* <Text fz="md" fw={500}>Whatsapp Agent</Text> */}
    </Group>
  </Anchor>
  )
}

export default WhatsappButton