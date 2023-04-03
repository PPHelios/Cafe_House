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
} from "../../store/appState";
export default function AddAgent() {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      firstNameAr: "",
      lastNameAr: "",
      phoneNumber: "4535345",
      email: "",
      password: "",
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
    const parseFile = new Parse.File("img.jpeg", values.pic);
    try {
      const createdUser = await Parse.User.signUp(
        values.email,
        values.password
      );
      let agencyQuery = new Parse.Query("Agency");
      agencyQuery.equalTo("name", "newhome");
      let agencyQueryResult = await agencyQuery.first();
      let Agent = new Parse.Object("Agents");
      Agent.set("firstName", values.firstName);
      Agent.set("lastName", values.lastName);
      Agent.set("firstNameAr", values.firstNameAr);
      Agent.set("lastNameAr", values.lastNameAr);
      Agent.set("bio", values.bio);
      Agent.set("bioAr", values.bioAr);
      Agent.set("email", values.email);
      Agent.set("role", values.role);
      Agent.set("agency", agencyQueryResult.toPointer());
      Agent.set("agencyName", agencyQueryResult);
      Agent.set("userProfile", createdUser.toPointer());
      Agent.set("phoneNumber", values.phoneNumber);
      Agent.set("pic", parseFile);
      // save it on Back4App Data Store
      const saveAgent = await Agent.save();
      createdUser.set("firstName", values.firstName);
      createdUser.set("lastName", values.lastName);
      Agent.set("agencyName", agencyQueryResult);
      createdUser.set("agentProfile", saveAgent.toPointer());

      const updateUser = await createdUser.save();
      //agencyQueryResult.set(agents)
      // Be aware that empty or invalid queries return as an empty array
      // Set results to state variable
      //Book.set("isbd", ISBD);
      console.log(saveAgent);
      console.log(updateUser);
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
          Create An Agent
        </Text>
        <form onSubmit={form.onSubmit((values) => addAgent(values))}>
          <Stack>
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
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
            <FileInput
              label="Upload files"
              placeholder="Upload files"
              value={form.values.pic}
              accept="image/png,image/jpeg"
              onChange={(event) => {
                form.setFieldValue("pic", event);
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
          <button style={{ dispaly: "block" }} onClick={() => queryAgent()}>
            queryAgent
          </button>
        </Stack>
      </Paper>
    </>
  );
}
