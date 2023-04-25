import { createStyles, RingProgress, Text, SimpleGrid, Paper, ThemeIcon, Group, Center } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-preact';
import { adminSideBarState, agents, properties, viewStats } from "../../store/appState";
import {signal, effect } from '@preact/signals';
 const data = signal([
  {
    "title": "Views",
    "value": viewStats.value.views,
    "diff": 34
  },
  {
    "title": "Actions",
    "value": viewStats.value.actions,
    "diff": -13
  },
  {
    "title": "Transition",
    "value": `${((viewStats.value.actions/viewStats.value.views)*100).toFixed(0)} %`,
    "diff": 18
  }
])
let data2 = signal([
  {
    "label": "Agents",
    "stats": agents.value.length,
    "progress": agents.value.length,
    "color": "teal",
    "icon": "up"
  },
  {
    "label": "Ads",
    "stats": properties.value.length,
    "progress": properties.value.length,
    "color": "blue",
    "icon": "up"
  },
  {
    "label": "Credits",
    "stats": 100,
    "progress": 52,
    "color": "red",
    "icon": "down"
  }
]) 
effect(() => {
  data.value=[{
    "title": "Views",
    "value": viewStats.value.views,
    "diff": 34
  },
  {
    "title": "Actions",
    "value": viewStats.value.actions,
    "diff": -13
  },
  {
    "title": "Transition",
    "value": `${((viewStats.value.actions/viewStats.value.views)*100).toFixed(0)} %`,
    "diff": 18
  }
  ]
});
effect(() => {
  data2.value=[{
    "label": "Agents",
    "stats": agents.value.length,
    "progress": agents.value.length,
    "color": "teal",
    "icon": "up"
  },
  {
    "label": "Ads",
    "stats": properties.value.length,
    "progress": properties.value.length,
    "color": "blue",
    "icon": "up"
  },
  {
    "label": "Credits",
    "stats": 100,
    "progress": 52,
    "color": "red",
    "icon": "down"
  }
  ]
});
const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));
  
  export default function AdminPanelAnalytics() {
    adminSideBarState.value=0
    const { classes } = useStyles();
    const stats = data.value.map((stat) => {
      const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
      
      return (
      
        <Paper withBorder p="md" radius="md" key={stat.title} >
          <Group position="apart">
            <div>
              <Text c="dimmed" tt="uppercase" fw={700} fz="xs" className={classes.label}>
                {stat.title}
              </Text>
              <Text fw={700} fz="xl">
                {stat.value}
              </Text>
            </div>
            <ThemeIcon
              color="gray"
              variant="light"
              sx={(theme) => ({ color: stat.diff > 0 ? theme.colors.teal[6] : theme.colors.red[6] })}
              size={38}
              radius="md"
            >
              <DiffIcon size="1.8rem" stroke={1.5} />
            </ThemeIcon>
          </Group>
          <Text c="dimmed" fz="sm" mt="md">
            <Text component="span" c={stat.diff > 0 ? 'teal' : 'red'} fw={700}>
              {stat.diff}%
            </Text>{' '}
            {stat.diff > 0 ? 'increase' : 'decrease'} compared to last month
          </Text>
        </Paper>
      );
    });
    const stats2 = data2.value.map((stat) => {
      const Icon = icons[stat.icon];
      return (
        <Paper withBorder radius="md" p="xs" key={stat.label}>
          <Group>
            <RingProgress
              size={80}
              roundCaps
              thickness={8}
              sections={[{ value: stat.progress, color: stat.color }]}
              label={
                <Center>
                  <Icon size="1.4rem" stroke={1.5} />
                </Center>
              }
            />
  
            <div>
              <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                {stat.label}
              </Text>
              <Text weight={700} size="xl">
                {stat.stats}
              </Text>
            </div>
          </Group>
        </Paper>
      );
    });
    return (
      <>
      {agents.value.length 
      && 
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {stats2}
    </SimpleGrid>}
      <div className={classes.root}>
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          {stats}
        </SimpleGrid>
      </div>
     
      </>
    );
  }