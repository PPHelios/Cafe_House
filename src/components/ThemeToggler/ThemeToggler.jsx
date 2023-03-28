import { ActionIcon, Group } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-preact';
import { themeColor, changethemeColor } from "../../store/appState";
export function ThemeToggler() {
  return (
    <Group position="center" my="xl">
      <ActionIcon
        onClick={() => changethemeColor()}
        size="lg"
        sx={(theme) => ({
          backgroundColor:
         themeColor.value === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color:themeColor.value === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
        })}
        title="theme changer"
        aria-label="theme changer"
      >
        {themeColor.value === 'dark' ? <IconSun size="1.2rem" /> : <IconMoonStars size="1.2rem" />}
       
      </ActionIcon>
    </Group>
  );
}