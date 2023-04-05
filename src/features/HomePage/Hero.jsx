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
    height: rem(600),
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
        <Text size={{ base: "xs", sm: "md" }} color="dimmed">
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

      <main className={classes.inner}>
        <Title className={classes.title}>
          Find your home with the people{" "}
          <Text component="span" inherit className={classes.highlight}>
            you trust.
          </Text>
        </Title>

        <Box
          display="flex"
          w={{ base: "94%", sm: "100%" }}
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
          <MultiSelect
            w="100%"
            size="xl"
            radius="xl"
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
            nothingFound="Nothing Found"
            placeholder="search for property"
            aria-label="search for property"
            sx={{
              display: "inline-block",
              flexGrow: 1,
              "& .mantine-MultiSelect-input": {
                paddingRight: 40,
              },
            }}
          />

          <Box px={20}>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <Group position="center" mb={5}>
                <Button
                  size="md"
                  variant="filled"
                  color="blue.4"
                  title=" Advanced Search"
                  aria-label=" Advanced Search"
                  rightIcon={opened ? <IconChevronUp /> : <IconChevronDown />}
                  onClick={toggle}
                >
                  Advanced Search
                </Button>

                <Select
                  size="md"
                  w={{ base: 98, xs: "fit-content" }}
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

                      "&:hover": {
                        backgroundColor: theme.colors.blue[5],
                      },
                    },
                  })}
                />

                <ActionIcon
                  type="submit"
                  w={{ base: 314, sm: 90 }}
                  h={42}
                  variant="filled"
                  color="blue.4"
                  title="Search"
                  aria-label="Search"
                >
                  <IconSearch size="1rem" />
                </ActionIcon>
              </Group>
            </form>
            <Collapse in={opened}>
              <Paper shadow="xs" p="xs" ta="center">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                  {/* /// svg error */}
                  <Select
                    w={{ base: 110, sm: 140 }}
                    m={5}
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
                    w={{ base: 110, sm: 140 }}
                    m={5}
                    data={["1", "2", "3", "4", "5"]}
                    display="inline-block"
                    {...form.getInputProps("propertyRooms")}
                    placeholder="Rooms"
                    aria-label="property Number of Rooms"
                    sx={(theme) => ({
                      "& .mantine-Select-input": {
                        paddingRight: 20,
                        textAlign: "center",
                      },
                    })}
                  />

                  <TextInput
                    w={{ base: 110, sm: 140 }}
                    m={5}
                    display="inline-block"
                    {...form.getInputProps("propertyminArea")}
                    placeholder="Min Area"
                    aria-label="property min Area"
                  />
                  <TextInput
                    w={{ base: 110, sm: 140 }}
                    m={5}
                    display="inline-block"
                    {...form.getInputProps("propertymaxArea")}
                    placeholder="Max Area"
                    aria-label="property max Area"
                  />
                  <TextInput
                    w={{ base: 110, sm: 140 }}
                    m={5}
                    display="inline-block"
                    {...form.getInputProps("propertyminPrice")}
                    placeholder="Min Price"
                    aria-label="property min Price"
                  />
                  <TextInput
                    w={{ base: 110, sm: 140 }}
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
      </main>
    </div>
  );
}
