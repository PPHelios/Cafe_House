import { useState } from "preact/hooks";
import { useToggle, upperFirst } from "@mantine/hooks";

import Parse from "parse/dist/parse.min.js";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  FileInput,
  Stack,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-preact";
import {
  userData,
  queryAgency,
  queryAgentsInAgency,
  queryAgentAgency,
  queryAgent,
} from "../../../store/appState";
export default function AddAgent() {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      firstNameAr: "",
      lastNameAr: "",
      phoneNumber: "4535345",
      bio: "dfgdfg",
      bioAr: "fgdfg",
      role: "agent",
      profilePic: null,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      // password: (val) =>
      //   val.length <= 6
      //     ? "Password should include at least 6 characters"
      //     : null,
    },
  });
  async function addAgent(values) {
    let parseFile = null;
    if (values.profilePic) {
      parseFile = new Parse.File("img.jpeg", values.profilePic);
    }
    try {
      const newAgentQuery = new Parse.Query("User");
      newAgentQuery.equalTo("username", values.email);
      let agentQueryResult = await newAgentQuery.first();
      let agentProfile = new Parse.Query("Agent");
      agentProfile.set("firstName", values.firstName);
      agentProfile.set("lastName", values.lastName);
      agentProfile.set("firstNameAr", values.firstNameAr);
      agentProfile.set("lastNameAr", values.lastNameAr);
      agentProfile.set("bio", values.bio);
      agentProfile.set("bioAr", values.bioAr);
      agentProfile.set("agencyName", Parse.User.current().get("name"));
      agentProfile.set("role", values.role);
      agentProfile.set("userPointer", agentQueryResult.toPointer());

      // agentQueryResult.set("userProfile", agentQueryResult.toPointer());
      agentProfile.set("phoneNumber", values.phoneNumber);
      if (values.profilePic) agentProfile.set("profilePic", parseFile);
      // save it on Back4App Data Store
      // const agentQueryResult = await User.save();
      // agentQueryResult.set("firstName", values.firstName);
      // agentQueryResult.set("lastName", values.lastName);
      // agentQueryResult.set("agencyName", agencyQueryResult);
      // agentQueryResult.set("agentProfile", saveAgent.toPointer());

      const updateAgentProfile = await agentProfile.save();
      //agencyQueryResult.set(agents)
      // Be aware that empty or invalid queries return as an empty array
      // Set results to state variable
      //Book.set("isbd", ISBD);
      // console.log(saveAgent);
      console.log(updateAgentProfile);
      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
  }

  return (
    <>
      <Paper w="90%" maw={700} mt={100} mx="auto" radius="md" p="xl" withBorder>
        <Text size="lg" weight={500}>
          Add An Agent
        </Text>
        <form onSubmit={form.onSubmit((values) => addAgent(values))}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="Enter Your Email"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />
            <TextInput
              required
              label="First Name"
              placeholder="Your First Name"
              value={form.values.firstName}
              onChange={(event) =>
                form.setFieldValue("firstName", event.currentTarget.value)
              }
              radius="md"
            />
            <TextInput
              required
              label="Last Name"
              placeholder="Your Last Name"
              value={form.values.lastName}
              onChange={(event) =>
                form.setFieldValue("lastName", event.currentTarget.value)
              }
              radius="md"
            />
            <TextInput
              required
              label="First NameAr"
              placeholder="Your First Name"
              value={form.values.firstNameAr}
              onChange={(event) =>
                form.setFieldValue("firstNameAr", event.currentTarget.value)
              }
              radius="md"
            />
            <TextInput
              required
              label="Last NameAr"
              placeholder="Your Last Name"
              value={form.values.lastNameAr}
              onChange={(event) =>
                form.setFieldValue("lastNameAr", event.currentTarget.value)
              }
              radius="md"
            />

            <FileInput
              label="Upload files"
              placeholder="Upload files"
              value={form.values.profilePic}
              accept="image/png,image/jpeg"
              onChange={(event) => {
                form.setFieldValue("profilePic", event);
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
        <Stack>
          <button style={{ dispaly: "block" }} onClick={() => queryAgency()}>
            queryAgency
          </button>

          <button
            style={{ dispaly: "block" }}
            onClick={() => queryAgentAgency()}
          >
            queryAgentAgency
          </button>
          <button
            style={{ dispaly: "block" }}
            onClick={() => queryAgentsInAgency()}
          >
            queryAgentsInAgency
          </button>
          <button
            style={{ dispaly: "block" }}
            onClick={() => console.log(Parse.User.current().get("name"))}
          >
            current
          </button>
        </Stack>
      </Paper>
    </>
  );
}
