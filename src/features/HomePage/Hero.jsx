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
import { search, searchOptions } from "../../store/appState";

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: rem(600),
    position: "relative",
    paddingTop: rem(120),
    paddingBottom: rem(130),
    backgroundImage: `url(${hero})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.fn.smallerThan("sm")]:{
      height: rem(700),
    },
    [theme.fn.smallerThan("xs")]: {
      paddingTop: rem(80),
      paddingBottom: rem(50),
      height: rem(700),
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
      listingType: "",
      propertyType: "",
      propertyRooms: "",
      propertyBaths: "",
      propertyarea: "",
      propertyminPrice: "",
      propertymaxPrice: "",
    },

    transformValues: (values) => ({
      searchValue: values.searchValue || ["New Cairo"],
      listingType: values.listingType,
      propertyType: values.propertyType,
      propertyRooms: Number(values.propertyRooms) || 1,
      propertyBaths: Number(values.propertyBaths) || 1,
      propertyarea: Number(values.propertyarea) || 1,
      propertyminPrice: Number(values.propertyminPrice) || 1,
      propertymaxPrice: Number(values.propertymaxPrice) || 1000000000,
    }),
  });

  const handleSubmit = (values) => {
    search(values);
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
            placeholder="Search For Property"
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
              <Select
                  size="lg"
                  w={218}
                  {...form.getInputProps("listingType")}
                  data={["Buy", "Rent"]}
                  display="inline-block"
                  placeholder="Pick listing Type"
                  aria-label="pick search type"
                  sx={(theme) => ({
                    "& .mantine-Select-nothingFound":{
                      color: theme.white,
                    },
                    "& .mantine-Select-input": {
                      paddingRight: 20,
                      textAlign: "center",
                      // color: theme.white,
                      // backgroundColor: theme.colors.blue[1],
                      border: "none",
                      "&:hover": {
                        // backgroundColor: theme.colors.blue[5],
                      },
                    },
                  })}
                />
                <Button
                  size="lg"
                  variant="filled"
                  color="gradient"
                  title=" Advanced Search"
                  aria-label=" Advanced Search"
                  rightIcon={opened ? <IconChevronUp /> : <IconChevronDown />}
                  onClick={toggle}
                >
                  Advanced Search
                </Button>

               

                <ActionIcon
                  type="submit"
                  w={{ base: 314, sm: 84 }}
                  h={50}
                  variant="gradient"
                  color="blue.5"
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
                    data={["1", "2", "3", "4", "5","6","7"]}
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
 <Select
                    w={{ base: 110, sm: 140 }}
                    m={5}
                    data={["1", "2", "3", "4", "5"]}
                    display="inline-block"
                    {...form.getInputProps("propertyBaths")}
                    placeholder="Baths"
                    aria-label="property Number of Baths"
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
                    {...form.getInputProps("propertyArea")}
                    placeholder="Min. Area"
                    aria-label="propertyArea"
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
