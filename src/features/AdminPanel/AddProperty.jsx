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
      let agencyQueryResult = awaitqueryAgentAgency();
      console.log(`agency: ${agencyQueryResult}`);

      let agentQueryResult = awaitqueryAgent();

      let numberOfPics =
        values.pics.length < maxNumberOfPics
          ? values.pics.length
          : maxNumberOfPics;
      for (let i = 0; i < numberOfPics; i++) {
        const typeIsValid = validFileType(values.pics[i]);
        const fileSize = returnFileSize(values.pics[i].size);
        console.log(typeIsValid);
        console.log(fileSize);
        const parseFile = new Parse.File("img.jpeg", values.pics[i]);
        files.push(parseFile);
      }

      let property = new Parse.Object("Property");
      property.set("adName", values.adName);
      property.set("adNameAr", values.adNameAr);
      property.set("description", values.description);
      property.set("descriptionAr", values.descriptionAr);
      property.set("agent", agentQueryResult);
      property.set("agency", agencyQueryResult);

      for (let i = 0; i < numberOfPics; i++) {
        property.set(`pic${i}`, files[i]);
      }

      // save it on Back4App Data Store
      const saveproperty = await property.save();
      // Be aware that empty or invalid queries return as an empty array
      // Set results to state variable
      //Book.set("isbd", ISBD);
      console.log(saveproperty);
      setResult(saveproperty);
      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
    // try {
    //   // create a new Parse Object instance
    //   const Person = new Parse.Object("User");
    //   // define the attributes you want for your Object
    //   Person.set("name", "John");
    //   Person.set("email", "john@back4app.com");
    //   // save it on Back4App Data Store
    //   await Person.save();
    //   alert("Person saved!");
    // } catch (error) {
    //   console.log("Error saving new person: ", error);
    // }
  }

  async function fetchPerson() {
    // create your Parse Query using the Person Class you've created
    const query = new Parse.Query("Property");
    // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
    query.equalTo("adName", "qq");
    // run the query
    const Person = await query.find();
    // access the Parse Object attributes

    console.log("adName: ", Person);
    // setPerson(Person);
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
              label="name"
              placeholder="Enter Property Name"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("adName", event.currentTarget.value)
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
      <button onClick={fetchPerson}>fetch pic</button>
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
    </>
  );
}
