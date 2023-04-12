import { useState } from "preact/hooks";

import Parse from "parse/dist/parse.min.js";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Title,
  Paper,
  Group,
  Button,
  FileInput,
  Stack,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconUpload } from "@tabler/icons-preact";
import { queryAgency, userData } from "../../store/appState";
export default function SignupAgent() {
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
//     var sessionToken = Parse.User.current().getSessionToken();

// Parse.User.signUp(username, password).then(function(newUser) {
//     Parse.User.become(sessionToken);
// });
    let parseFile = null;
    if (values.profilePic) {
      parseFile = new Parse.File("img.jpeg", values.profilePic);
    }
    try {
      const agency = await queryAgency(values.agencyName);
      console.log(agency);
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
      agentProfile.set("phoneNumber", values.phoneNumber);
      agentProfile.set("userRole", "Agent");
      if (values.profilePic) agentProfile.set("profilePic", parseFile);
      agentProfile.set("userPointer", createdUser.toPointer());
      agentProfile.set("agencyPointer", agency.toPointer());
      let agentProfileACL= new Parse.ACL()
      agentProfileACL.setPublicReadAccess(true)
      agentProfileACL.setWriteAccess(Parse.User.current(), true)
      agentProfileACL.setRoleWriteAccess("SuperAdmin", true)
      agentProfileACL.setRoleWriteAccess("SubAdmin", true)
      agentProfileACL.setWriteAccess(agency.get("userPointer").id, true)
      agentProfile.setACL(agentProfileACL);
      const addAgent = await agentProfile.save();

      console.log(addAgent);

      createdUser.set("firstName", values.firstName);
      createdUser.set("lastName", values.lastName);
      createdUser.set("email", values.email);
      createdUser.set("userRole", "Agent");
      createdUser.set("profilePicUrl", addAgent?.attributes?.profilePic?._url);
      createdUser.set("agencyPointer", agency.toPointer());
      createdUser.set("agentPointer", addAgent.toPointer());
      
      let userACL= new Parse.ACL()
      userACL.setPublicReadAccess(true)
      userACL.setWriteAccess(Parse.User.current(), true)
      userACL.setRoleWriteAccess("SuperAdmin", true)
      userACL.setRoleWriteAccess("SubAdmin", true)
    //  agentProfileACL.setWriteAccess(agency.get("userPointer").id, true)
      createdUser.setACL(userACL);
      const updateAgent = await createdUser.save();
      setLoading(false)
      userData.value = updateAgent;
      notifications.show({
        title: "Signed Up Successfully",
      });
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
    <>
    <Title my={30} order={1} weight={700} ta="center" c="blue.4">  Create An Agent</Title>
      <Paper w="90%" maw={700} mt={10} mx="auto" radius="md" p="xl" withBorder>

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
              label="Profile Picture"
              placeholder="Upload Your Profile Picture"
              value={form.values.profilePic}
              accept="image/png,image/jpeg"
              onChange={(event) => {
                form.setFieldValue("profilePic", event);
              }}
              icon={<IconUpload size="1rem" />}
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Button type="submit" radius="xl" loading={loading}>
              Add
            </Button>
          </Group>
        </form>
      </Paper>
    </>
  );
}
