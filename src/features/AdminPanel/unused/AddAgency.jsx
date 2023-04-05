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

export default function AddAgency() {
  const form = useForm({
    initialValues: {
      name: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      bio: "dfgdfg",
      bioAr: "fgdfg",
      role: "agency",
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
  async function addAgency(values) {
    let parseFile = null;
    if (values.profilePic) {
      parseFile = new Parse.File("img.jpeg", values.profilePic);
    }
    try {
      const createdUser = await Parse.User.signUp(
        values.email,
        values.password
      );
      createdUser.set("firstName", values.firstName);
      createdUser.set("lastName", values.lastName);
      createdUser.set("email", values.email);
      if (parseFile !== null) {
        console.log("adding file");
        createdUser.set("profilePic", parseFile);
      }
      const saveAgent = await createdUser.save();
      userData.value = saveAgent;
      console.log(saveAgent);
      let agencyProfile = new Parse.Object("Agency");
      agencyProfile.set("name", values.name);
      agencyProfile.set("firstName", values.firstName);
      agencyProfile.set("lastName", values.lastName);
      agencyProfile.set("email", values.email);
      agencyProfile.set("bio", values.bio);
      agencyProfile.set("bioAr", values.bioAr);
      agencyProfile.set("role", values.role);
      agencyProfile.set("phoneNumber", values.phoneNumber);
      if (values.profilePic) agencyProfile.set("profilePic", parseFile);
      agencyProfile.set("userPointer", saveAgent.toPointer());
      const updateAgency = await agencyProfile.save();

      console.log(updateAgency);
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
          Create An Agency
        </Text>
        <form onSubmit={form.onSubmit((values) => addAgency(values))}>
          <Stack>
            <TextInput
              required
              label="Agency Name"
              placeholder="Agency Name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />

            <TextInput
              required
              label="Agency Account Email"
              placeholder="Enter Agency Account Email"
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
