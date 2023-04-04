import { useState } from "preact/hooks";
import { useToggle, upperFirst } from "@mantine/hooks";
import Parse from "parse/dist/parse.min.js";
import { useForm } from "@mantine/form";
import {
  TextInput,
  FileInput,
  Text,
  Paper,
  Group,
  Button,
  Box,
  Image,
  Anchor,
  Stack,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-preact";
import {
  userData,
  queryAgentAgency,
  queryAgentsInAgency,
  queryAgency,
  queryAgent,
} from "../../store/appState";
export default function AddProperty() {
  const [result, setResult] = useState({});
  const maxNumberOfPics = 15;
  const form = useForm({
    initialValues: {
      adName: "",
      adNameAr: "rrrr",
      description: "dfgdfg",
      descriptionAr: "fgdfg",
      area: "",
      room: "",
      bath: "",
      pics: [],
    },

    validate: {
      // email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      // password: (val) =>
      //   val.length <= 6
      //     ? "Password should include at least 6 characters"
      //     : null,
    },
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
    // const parseQuery = new Parse.Query("Person");
    let files = [];
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
          files.push(parseFile);
        }
      }

      let property = new Parse.Object("Property");
      property.set("adName", values.adName);
      property.set("adNameAr", values.adNameAr);
      property.set("description", values.description);
      property.set("descriptionAr", values.descriptionAr);
      property.set("area", values.area);
      property.set("room", values.room);
      property.set("bath", values.bath);
      property.set("agentPointer", Parse.User.current().toPointer());
      property.set(
        "agencyPointer",
        Parse.User.current().get("agencyPointer").toPointer()
      );
      if (values.pics.length > 0) {
        for (let i = 0; i < numberOfPics; i++) {
          property.set(`pic${i}`, files[i]);
        }
      }
      const saveproperty = await property.save();
      console.log(saveproperty);
      setResult(saveproperty);
      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
  }

  return (
    <>
      <Paper w={700} mt={100} mx="auto" radius="md" p="xl" withBorder>
        <Text size="lg" weight={500}>
          Add New Property
        </Text>

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
            />
            <TextInput
              required
              label="Ad. nameAr"
              placeholder="Enter Property NameAr"
              value={form.values.adNameAr}
              onChange={(event) =>
                form.setFieldValue("adNameAr", event.currentTarget.value)
              }
              radius="md"
            />
            <TextInput
              required
              label="Description"
              placeholder="Enter Property Description"
              value={form.values.description}
              onChange={(event) =>
                form.setFieldValue("description", event.currentTarget.value)
              }
              radius="md"
            />
            <TextInput
              required
              label="DescriptionAr"
              placeholder="Enter Property DescriptionAr"
              value={form.values.descriptionAr}
              onChange={(event) =>
                form.setFieldValue("descriptionAr", event.currentTarget.value)
              }
              radius="md"
            />
            <TextInput
              required
              label="Area"
              placeholder="Enter Property Area"
              value={form.values.area}
              onChange={(event) =>
                form.setFieldValue("area", event.currentTarget.value)
              }
              radius="md"
            />
            <TextInput
              required
              label="Room"
              placeholder="Enter Property Room"
              value={form.values.room}
              onChange={(event) =>
                form.setFieldValue("room", event.currentTarget.value)
              }
              radius="md"
            />
            <TextInput
              required
              label="Bath"
              placeholder="Enter Property Bath"
              value={form.values.bath}
              onChange={(event) =>
                form.setFieldValue("bath", event.currentTarget.value)
              }
              radius="md"
            />
            <FileInput
              multiple
              label="Upload files"
              placeholder="Upload files"
              value={form.values.pics}
              accept="image/png,image/jpeg"
              onChange={(event) => {
                form.setFieldValue("pics", event);
              }}
              icon={<IconUpload size="1rem" />}
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Button type="submit" radius="xl">
              Add
            </Button>
          </Group>
        </form>
      </Paper>

      {result?.attributes?.pic0 && (
        <Box h={100} w={100}>
          <Image src={`${result?.attributes?.pic0._url}`} />
        </Box>
      )}
      {result?.attributes?.pic1 && (
        <Box h={100} w={100}>
          <Image src={`${result?.attributes?.pic1._url}`} />
        </Box>
      )}
      {result?.attributes?.pic2 && (
        <Box h={100} w={100}>
          <Image src={`${result?.attributes?.pic2._url}`} />
        </Box>
      )}
      <p>{result?.attributes?.adName}</p>
      <p>{result?.attributes?.room}</p>
    </>
  );
}
