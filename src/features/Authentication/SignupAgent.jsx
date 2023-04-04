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
import { queryAgency, userData } from "../../store/appState";
export default function SignupAgent() {
  const form = useForm({
    initialValues: {
      agencyName: "",
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
      const agency = await queryAgency(values.agencyName);
      if (agency === undefined) {
        throw new Error("no such Agency");
      }

      const createdUser = await Parse.User.signUp(
        values.email,
        values.password
      );

      let agentProfile = new Parse.Object("Agent");
      agentProfile.set("agencyName", values.agencyName);
      agentProfile.set("firstName", values.firstName);
      agentProfile.set("lastName", values.lastName);
      agentProfile.set("email", values.email);
      agentProfile.set("bio", values.bio);
      agentProfile.set("bioAr", values.bioAr);
      agentProfile.set("role", values.role);
      agentProfile.set("phoneNumber", values.phoneNumber);
      if (values.profilePic) agentProfile.set("profilePic", parseFile);
      agentProfile.set("userPointer", createdUser.toPointer());
      agentProfile.set("agencyPointer", agency.toPointer());
      const updateAgency = await agentProfile.save();

      console.log(updateAgency);
      createdUser.set("firstName", values.firstName);
      createdUser.set("lastName", values.lastName);
      createdUser.set("email", values.email);
      createdUser.set("agencyPointer", agency.toPointer());
      const saveAgent = await createdUser.save();
      userData.value = saveAgent;
      console.log(saveAgent);
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
              label="Agency Name"
              placeholder="Your Agency Name"
              value={form.values.agencyName}
              onChange={(event) =>
                form.setFieldValue("agencyName", event.currentTarget.value)
              }
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
            <TextInput
              required
              label="Agent Account Email"
              placeholder="Enter Agent Account Email"
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
              placeholder="Agency Logo"
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
      </Paper>
    </>
  );
}
