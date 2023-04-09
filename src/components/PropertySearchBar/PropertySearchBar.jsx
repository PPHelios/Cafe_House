import { useNavigate } from "react-router";
import { forwardRef } from "preact/compat";

import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

import {
  Box,
  Group,
  MultiSelect,
  Paper,
  Select,
  Collapse,
  ActionIcon,
  Button,
  TextInput,
  Text
} from "@mantine/core";
import {
  IconSearch,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-preact";
import { search, searchOptions } from "../../store/appState";


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
function PropertySearchBar() {

  const [opened, { toggle }] = useDisclosure(false);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      searchValue: "",
      listingType: "",
      propertyType: "",
      propertyRooms: "",
      propertyBaths: "",
      propertyArea: "",
      propertyminPrice: "",
      propertymaxPrice: "",
    },

    transformValues: (values) => ({
      searchValue: values.searchValue || ["New Cairo"],
      listingType: values.listingType,
      propertyType: values.propertyType,
      propertyRooms: Number(values.propertyRooms) || 1,
      propertyBaths: Number(values.propertyBaths) || 1,
      propertyArea: Number(values.propertyArea) || 1,
      propertyminPrice: Number(values.propertyminPrice) || 1,
      propertymaxPrice: Number(values.propertymaxPrice) || 1000000000,
    }),
  });

  const handleSubmit = (values) => {
    search(values);
    navigate("/search");
  };

  return (
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
        radius="md"
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
                borderRadius:"8px",
                // color: theme.white,
                 border: `1px solid ${theme.colors.blue[4]}`,
               
                "&:hover": {
                  // backgroundColor: theme.colors.blue[5],
                },
              },
            })}
          />
          <Button
          h={50}
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
  )
}

export default PropertySearchBar