import Parse from "parse/dist/parse.min.js";
import { useForm } from "@mantine/form";
import { userData, queryAgency } from "../../store/appState";
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
import { notifications } from "@mantine/notifications";
import { IconUpload } from "@tabler/icons-preact";

export default function SignupAgency() {
  const form = useForm({
    initialValues: {
      agencyName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "1234",
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
      const agency = await queryAgency(values.agencyName);
      if (agency !== undefined) {
        throw new Error("Agency Name Already Exists");
      }
      const createdUser = await Parse.User.signUp(
        values.email,
        values.password
      );

      console.log(createdUser);
      let agencyProfile = new Parse.Object("Agency");
      agencyProfile.set("agencyName", values.agencyName);
      agencyProfile.set("firstName", values.firstName);
      agencyProfile.set("lastName", values.lastName);
      agencyProfile.set("email", values.email);
      agencyProfile.set("bio", values.bio);
      agencyProfile.set("bioAr", values.bioAr);
      agencyProfile.set("phoneNumber", values.phoneNumber);
      if (values.profilePic) agencyProfile.set("profilePic", parseFile);
      agencyProfile.set("userPointer", createdUser.toPointer());
      const addAgency = await agencyProfile.save();

      console.log(addAgency);
      createdUser.set("firstName", values.firstName);
      createdUser.set("lastName", values.lastName);
      createdUser.set("email", values.email);
      agencyProfile.set("bio", values.bio);
      agencyProfile.set("bioAr", values.bioAr);
      agencyProfile.set("phoneNumber", values.phoneNumber);
      createdUser.set("role", values.role);
      createdUser.set("profilePicUrl", addAgency?.attributes?.profilePic?._url);
      createdUser.set("agencyPointer", addAgency.toPointer());
      const updateAgency = await createdUser.save();
      userData.value = updateAgency;
      notifications.show({
        title: "Signed Up Successfully",
      });
      return true;
    } catch (error) {
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
              value={form.values.agencyName}
              onChange={(event) =>
                form.setFieldValue("agencyName", event.currentTarget.value)
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
              label="Agency Logo"
              placeholder="Upload Agency Logo"
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
