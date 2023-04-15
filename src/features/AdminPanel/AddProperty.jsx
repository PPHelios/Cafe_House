import { useState } from "preact/hooks";
import { forwardRef } from "preact/compat";
import { searchOptions, adminSideBarState } from "../../store/appState";
import Parse from "parse/dist/parse.min.js";
import { useForm } from "@mantine/form";
import AppMap from "../Map/AppMap";

import {
  TextInput,
  FileInput,
  Text,
  Paper,
  Group,
  Button,
  Box,
  MultiSelect,
  Select,
  Stack,
  Title,
  Textarea
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconUpload } from "@tabler/icons-preact";

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

export default function AddProperty() {

  const [propertLocation, setPropertLocation] = useState({});
  const [loading, setLoading] = useState(false)
  adminSideBarState.value=1

  const maxNumberOfPics = 15;
  const maxNumberOfVideos = 2;
  const form = useForm({
    initialValues: {
      adName: "",
      adNameAr: "",
      description: "",
      descriptionAr: "",
      propertyCode:"",
      propertyType: "",
      listingType: "",
      price: "",
      area: "",
      room: "",
      bath: "",
      pics: [],
      videos:[],
      isFeatured: false,
      adStatus: "",
      locationTags: [],
    },

    validate: {
      adName: (value) => (value.length < 10 ? 'Name must have at least 10 letters' : value.length>200?'Name must have Maxmimum 200 letters': null),
      lastName: (value) => (value.length < 10 ? 'Name must have at least 10 letters' : value.length>200?'Name must have Maxmimum 200 letters': null),
      description: (value) => (value.length < 700 ? 'Description must have at least 700 letters' : value.length>2000?'Description must have Maxmimum 2000 letters': null),
      descriptionAr: (value) => (value.length < 700 ? 'Description must have at least 700 letters' : value.length>2000?'Description must have Maxmimum 2000 letters': null),
      price: (value) => (value < 1 ? 'Room Must Be 1 At Least' : value>1000000?'Room Must Be 1000000000 Maximum': null),
      area: (value) => (value < 1 ? 'Area Must Be 1 At Least' : value>1000000?'Area Must Be 1000000000 Maximum': null),

    },
    transformValues: (values) => ({
      adName: values.adName,
      adNameAr: values.adNameAr,
      description: values.description,
      descriptionAr: values.descriptionAr,
      propertyCode: values.propertyCode,
      propertyType: values.propertyType || "Apartment",
      listingType: values.listingType || "Buy",
      price: Number(values.price) || 1,
      area: Number(values.area) || 1,
      room: Number(values.room) || 1,
      bath: Number(values.bath) || 1,
      pics: values.pics,
      videos: values.videos,
      isFeatured: values.isFeatured || false,
      adStatus: values.adStatus || "pending",
      locationTags: values.locationTags,
    }),
  });
  const fileTypes = [
    "image/apng",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/webp",
  ];

  function validFileType(file) {
    return fileTypes.includes(file.type);
  }
  function returnFileSize(number) {
    if (number < 1024) {
      return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
      return `${(number / 1048576).toFixed(1)} MB`;
    }
  }
  async function addnewProperty(values) {
    setLoading(true)
    // const parseQuery = new Parse.Query("Person");
    let picFiles = [];
    let videoFiles = [];
    if (!propertLocation?.onDrag) {
      alert("Please Select A Location");
    }
    try {
      let numberOfPics =
        values.pics.length < maxNumberOfPics
          ? values.pics.length
          : maxNumberOfPics;
      if (values.pics.length > 0) {
        for (let i = 0; i < numberOfPics; i++) {
          const typeIsValid = validFileType(values.pics[i]);
          const fileSize = returnFileSize(values.pics[i].size);
          console.log(typeIsValid);
          console.log(fileSize);

          const parseFile = new Parse.File("img.jpeg", values.pics[i]);
          picFiles.push(parseFile);
        }
      }
      let numberOfVideos =
      values.videos.length < maxNumberOfVideos
        ? values.videos.length
        : maxNumberOfVideos;
    if (values.videos.length > 0) {
      for (let i = 0; i < numberOfVideos; i++) {
        const typeIsValid = validFileType(values.videos[i]);
        const fileSize = returnFileSize(values.videos[i].size);
        console.log(typeIsValid);
        console.log(fileSize);

        const parseFile = new Parse.File("img.mp4", values.videos[i]);
        videoFiles.push(parseFile);
      }
    }
      let property = new Parse.Object("Property");
      property.set("adName", values.adName);
      property.set("adNameAr", values.adNameAr);
      property.set("description", values.description);
      property.set("descriptionAr", values.descriptionAr);
      property.set("propertyCode", values.propertyCode);
      property.set("listingType", values.listingType);
      property.set("propertyType", values.propertyType);
      property.set("price", values.price);
      property.set("area", values.area);
      property.set("room", values.room);
      property.set("bath", values.bath);
      property.set("isFeatured", values.isFeatured);
      property.set("adStatus", values.adStatus);
      property.set(
        "location",
        new Parse.GeoPoint(
          propertLocation.onDrag.lat,
          propertLocation.onDrag.lng
        )
      );
      property.set("locationTags", values.locationTags);
      property.set("agentPointer", Parse.User.current().get("agentPointer"));
      property.set("agencyPointer", Parse.User.current().get("agencyPointer"));
      if (values.pics.length > 0) {
        for (let i = 0; i < numberOfPics; i++) {
          property.set(`pic${i}`, picFiles[i]);
        }
      }
      if (values.videos.length > 0) {
        for (let i = 0; i < numberOfVideos; i++) {
          property.set(`video${i}`,videoFiles[i]);
        }
      }

//ACL
// only current user has read/write access
// property.setACL(new Parce.ACL(Parse.User.current()))
// let propertyACL = new Parse.ACL()
// propertyACL.setWriteAccess(Parse.User.current(), true)
// //propertyACL.setWriteAccess(admin, true)
// propertyACL.setPublicWriteAccess(false)
// property.setACL(propertyACL)


      const saveproperty = await property.save();
      setLoading(false)
      form.reset()
      notifications.show({
        title: "Property Added Successfully",
      });
      console.log(saveproperty);

      //       let PicsUrls=[]

      //       saveproperty.set("PicsUrls", PicsUrls);
      // const savePicsUrls = await property.save();

      // console.log(savePicsUrls);

      return true;
    } catch (error) {
      setLoading(false)
      // Error can be caused by lack of Internet connection
      notifications.show({
        title: "Error",
        message: `Error! ${error.message} 🤥`,
        color: 'red',
      });

      return false;
    }
  }

  return (
    <Box h="calc(100vh - 90px)" sx={{overflowY:"auto"}}>
      <Title my={30} order={1} weight={700} ta="center" c="blue.4">
        Add New Property
      </Title>
      <Paper w="90%"  maw={700} mx="auto" radius="md" p="xl" withBorder>
        <form onSubmit={form.onSubmit((values) => addnewProperty(values))}>
          <Stack>
            <TextInput
              required
              label="Ad. name"
              placeholder="Enter Ad. Name"
              value={form.values.adName}
              onChange={(event) =>
                form.setFieldValue("adName", event.currentTarget.value)
              }
              radius="md"
              {...form.getInputProps('adName')}
            />
            <TextInput
              label="Ad. Arabic Name"
              placeholder="Enter Ad. Arabic Name"
              value={form.values.adNameAr}
              onChange={(event) =>
                form.setFieldValue("adNameAr", event.currentTarget.value)
              }
              radius="md"
              {...form.getInputProps('adNameAr')}
            />
            <Textarea
              required
              autosize
        minRows={2}
        maxRows={4}
              label="Property Description"
              placeholder="Enter Property Description"
              description="From 700 to 2000 characters"
              value={form.values.description}
              onChange={(event) =>
                form.setFieldValue("description", event.currentTarget.value)
              }
              radius="md"
              {...form.getInputProps('description')}
            />
            <Textarea
              required
              autosize
        minRows={2}
        maxRows={4}
              label="Property Arabic Description"
              placeholder="Enter Property Arabic Description"
              description="From 700 to 2000 characters"
              value={form.values.descriptionAr}
              onChange={(event) =>
                form.setFieldValue("descriptionAr", event.currentTarget.value)
              }
              radius="md"
              {...form.getInputProps('descriptionAr')}
            />
              <TextInput
              required
              label="Property Code"
              placeholder="Enter Property Code"
              value={form.values.adName}
              onChange={(event) =>
                form.setFieldValue("propertyCode", event.currentTarget.value)
              }
              radius="md"
              {...form.getInputProps('propertyCode')}
            />
            <Select
              required
              m={5}
              data={["Apartment", "Villa"]}
              display="inline-block"
              {...form.getInputProps("propertyType")}
              label="Property Type"
              placeholder="Property Type"
              aria-label="pick property type "
              radius="md"
              {...form.getInputProps('propertyType')}
            />
            <Select
              required
              {...form.getInputProps("listingType")}
              data={["Buy", "Rent"]}
              display="inline-block"
              label="pick Listing Type"
              placeholder="pick Listing Type"
              aria-label="pick Listing Type"
              radius="md"
              {...form.getInputProps('listingType')}

            />

            <TextInput
              required
              label="Property price"
              placeholder="Enter Property price"
              value={form.values.price}
              onChange={(event) =>
                form.setFieldValue("price", event.currentTarget.value)
              }
              radius="md"
              {...form.getInputProps('price')}
            />
            <TextInput
              required
              label="Property Area"
              placeholder="Enter Property Area"
              value={form.values.area}
              onChange={(event) =>
                form.setFieldValue("area", event.currentTarget.value)
              }
              radius="md"
              {...form.getInputProps('area')}
            />
            <TextInput
              required
              label="Number Of Rooms"
              placeholder="Enter Number Of Rooms"
              value={form.values.room}
              onChange={(event) =>
                form.setFieldValue("room", event.currentTarget.value)
              }
              radius="md"
              {...form.getInputProps('room')}
            />
            <TextInput
              required
              label="Number Of Baths"
              placeholder="Enter Number Of Baths"
              value={form.values.bath}
              onChange={(event) =>
                form.setFieldValue("bath", event.currentTarget.value)
              }
              radius="md"
              {...form.getInputProps('bath')}
            />
            <FileInput
              multiple
              label="Upload Property Photos"
              placeholder="Upload Property Photos"
              value={form.values.pics}
              accept="image/png,image/jpeg"
              onChange={(event) => {
                form.setFieldValue("pics", event);
              }}
              icon={<IconUpload size="1rem" />}
            />
<FileInput
              multiple
              label="Upload Property Videos"
              placeholder="Upload Property Videos"
              value={form.values.videos}
              accept="video/*"
              onChange={(event) => {
                form.setFieldValue("videos", event);
              }}
              icon={<IconUpload size="1rem" />}
            />
            <MultiSelect
              {...form.getInputProps("locationTags")}
              maxDropdownHeight={300}
              data={searchOptions.value}
              itemComponent={SelectItem}
              clearable
              clearButtonProps={{ "aria-label": "Clear selection" }}
              maxSelectedValues={4}
              limit={4}
              searchable
              filter={(searchValue, selected, item) => {
                return (
                  !selected &&
                  item.label
                    .toLowerCase()
                    .includes(searchValue.toLowerCase().trim())
                );
              }}
              label="Location Tags"
              nothingFound="Nothing Found"
              placeholder="Add Location Tags"
              aria-label="Add Location Tags"
              sx={{
                display: "inline-block",
                flexGrow: 1,
                "& .mantine-MultiSelect-input": {
                  paddingRight: 40,
                },
              }}
              {...form.getInputProps('locationTags')}
            />
          </Stack>
          <Box w="100%" mt={50} h={{base:250,sm:400}} mx="auto">
            <AppMap add={false} setPropertLocation={setPropertLocation} />
          </Box>
          <Group position="center" mt="xl">
            <Button type="submit" radius="xl" loading={loading}>
              Add Property
            </Button>
          </Group>
        </form>
      </Paper>
    </Box>
  );
}
