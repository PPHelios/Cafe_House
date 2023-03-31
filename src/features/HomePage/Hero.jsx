import { forwardRef } from "preact/compat";
import { batch } from "@preact/signals";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router";
import {
  Title,
  Text,
  Paper,
  Box,
  Overlay,
  createStyles,
  rem,
  MultiSelect,
  Group,
  Select,
  Collapse,
  ActionIcon,
  Button,
  TextInput,
} from "@mantine/core";
import hero from "../../assets/images/hero.webp";
import {
  IconSearch,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-preact";
import { stateSearchValues, searchOptions } from "../../store/appState";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: rem(120),
    paddingBottom: rem(130),
    backgroundImage: `url(${hero})`,
    backgroundSize: "cover",
    backgroundPosition: "center",

    [theme.fn.smallerThan("xs")]: {
      paddingTop: rem(80),
      paddingBottom: rem(50),
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

const SelectItem = forwardRef(
  ({ value, color, label, name, ...others }, ref) => (
    <Box ref={ref} {...others}>
      <Group>
        <Text>{label}</Text>
        <Text size="xs" color="dimmed">
          {name}
        </Text>
      </Group>
    </Box>
  )
);

export function Hero() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      searchValue: "",
      searchPurpose: "Buy",
      propertyType: "Apartment",
      propertyRooms: "",
      propertyminArea: "",
      propertymaxArea: "",
      propertyminPrice: "",
      propertymaxPrice: "",
    },

    transformValues: (values) => ({
      searchValue: values.searchValue || ["New Cairo"],
      searchPurpose: values.searchPurpose,
      propertyType: values.propertyType,
      propertyRooms: Number(values.propertyRooms) || 0,
      propertyminArea: Number(values.propertyminArea) || 0,
      propertymaxArea: Number(values.propertymaxArea) || 1000000,
      propertyminPrice: Number(values.propertyminPrice) || 0,
      propertymaxPrice: Number(values.propertymaxPrice) || 1000000000,
    }),
  });

  const handleSubmit = (values) => {
    stateSearchValues.value = values;
    navigate("/search");
  };

  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.25} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Find your home with the people{" "}
          <Text component="span" inherit className={classes.highlight}>
            you trust.
          </Text>
        </Title>

        <Box
          display="flex"
          w={{ base: "90%", sm: "70%" }}
          h={300}
          maw={650}
          mx="auto"
          p={0}
          pt={20}
          sx={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Group h={90} spacing={0}>
              <Select
                size="xl"
                w={{ base: "20%", sm: "15%" }}
                {...form.getInputProps("searchPurpose")}
                data={["Buy", "Rent"]}
                display="inline-block"
                placeholder="pick search type"
                aria-label="pick search type"
                sx={(theme) => ({
                  "& .mantine-Select-input": {
                    paddingRight: 20,
                    textAlign: "center",
                    color: theme.white,
                    backgroundColor: theme.colors.blue[4],
                    border: "none",
                    borderRadius: "50px 0px  0px 50px",
                    "&:hover": {
                      backgroundColor: theme.colors.blue[5],
                    },
                  },
                })}
              />
              <MultiSelect
                size="xl"
                w={{ base: "60%", sm: "70%" }}
                {...form.getInputProps("searchValue")}
                maxDropdownHeight={300}
                data={searchOptions.value}
                itemComponent={SelectItem}
                clearable
                clearButtonProps={{ "aria-label": "Clear selection" }}
                maxSelectedValues={3}
                limit={3}
                // creatable
                // getCreateLabel={(query) => `${query}`}
                // onCreate={(query) => {
                //   const item = { value: query, label: query };
                //   setSearchData((current) => [...current, item]);
                //   return item;
                // }}
                searchable
                filter={(searchValue, selected, item) => {
                  return (
                    !selected &&
                    item.label
                      .toLowerCase()
                      .includes(searchValue.toLowerCase().trim())
                  );
                }}
                nothingFound="Nothing found"
                placeholder="search for property"
                aria-label="search for property"
                sx={{
                  display: "inline-block",
                  flexGrow: 1,
                  "& .mantine-MultiSelect-input": {
                    paddingRight: 40,
                    borderRadius: "0px",
                  },
                  "& .mantine-MultiSelect-label": { color: "white" },
                }}
              />
              <ActionIcon
                type="submit"
                w={{ base: "20%", sm: "15%" }}
                h={60}
                variant="filled"
                color="blue.4"
                title="Search"
                aria-label="Search"
                sx={{ borderRadius: "0px 50px 50px 0px" }}
              >
                <IconSearch size="2rem" />
              </ActionIcon>
            </Group>
          </form>
          <Box w="100%">
            <Group position="right" mb={5}>
              <Button
                variant="filled"
                ml="auto"
                color="blue.4"
                title=" Advanced Search"
                aria-label=" Advanced Search"
                rightIcon={opened ? <IconChevronDown /> : <IconChevronUp />}
                onClick={toggle}
              >
                Advanced Search
              </Button>
            </Group>
            <Collapse in={opened}>
              <Paper shadow="xs" p="xs" ta="center">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                  <Select
                    w={140}
                    m={5}
                    size="xs"
                    data={["Apartment", "Villa"]}
                    display="inline-block"
                    {...form.getInputProps("propertyType")}
                    placeholder="Property Type"
                    aria-label="pick search type"
                    sx={(theme) => ({
                      "& .mantine-Select-input": {
                        paddingRight: 20,
                        textAlign: "center",
                      },
                    })}
                  />

                  <Select
                    size="xs"
                    w={140}
                    m={5}
                    data={["1", "2", "3", "4", "5"]}
                    display="inline-block"
                    {...form.getInputProps("propertyRooms")}
                    placeholder="Number Of Rooms"
                    aria-label="property Number of Rooms"
                    sx={(theme) => ({
                      "& .mantine-Select-input": {
                        paddingRight: 20,
                        textAlign: "center",
                      },
                    })}
                  />

                  <TextInput
                    size="xs"
                    w={140}
                    m={5}
                    display="inline-block"
                    {...form.getInputProps("propertyminArea")}
                    placeholder="Min Area"
                    aria-label="property min Area"
                  />
                  <TextInput
                    size="xs"
                    w={140}
                    m={5}
                    display="inline-block"
                    {...form.getInputProps("propertymaxArea")}
                    placeholder="Max Area"
                    aria-label="property max Area"
                  />
                  <TextInput
                    size="xs"
                    w={140}
                    m={5}
                    display="inline-block"
                    {...form.getInputProps("propertyminPrice")}
                    placeholder="Min Price"
                    aria-label="property min Price"
                  />
                  <TextInput
                    size="xs"
                    w={140}
                    m={5}
                    display="inline-block"
                    {...form.getInputProps("propertymaxPrice")}
                    placeholder="Max Price"
                    aria-label="property max Price"
                  />
                </form>
              </Paper>
            </Collapse>
          </Box>
        </Box>
      </div>
    </div>
  );
}
