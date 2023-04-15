
import {
  ActionIcon,
  Group,
  Text,
} from "@mantine/core";

import { IconPhoneCall } from "@tabler/icons-preact";
import { useState } from "preact/hooks";

function PhoneNumberButton({phoneNumber}) {

  const [showPhoneNumber, setShowPhoneNumber ] = useState(false)
  return (
    <Group  sx={{justifyContent:"center"}} onClick={()=>setShowPhoneNumber(!showPhoneNumber)} >
    <ActionIcon variant="default" radius="md" size={36}>
      <IconPhoneCall size="1.1rem" stroke={1.5} color="blue"/>
    </ActionIcon>
   {showPhoneNumber && <Text fz="md" fw={500}>{phoneNumber}</Text>}
  </Group>
  )
}

export default PhoneNumberButton