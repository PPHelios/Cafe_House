import { createStyles, Group, Paper, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-preact';
import { adminSideBarState } from "../../store/appState";
 const data =[
  {
    "title": "Revenue",
    "value": "$13,456",
    "diff": 34
  },
  {
    "title": "Profit",
    "value": "$4,145",
    "diff": -13
  },
  {
    "title": "Coupons usage",
    "value": "745",
    "diff": 18
  }
]


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
    const stats = data.map((stat) => {
      const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
  
      return (
        <Paper withBorder p="md" radius="md" key={stat.title}>
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
  
    return (
      <div className={classes.root}>
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          {stats}
        </SimpleGrid>
      </div>
    );
  }