import { useState } from "preact/hooks";

import Parse from "parse/dist/parse.min.js";
import { useForm } from "@mantine/form";
import { userData, queryAgency } from "../../store/appState";
import {
  TextInput,
  PasswordInput,
  Title,
  Paper,
  Group,
  Button,
  FileInput,
  Stack,
  Textarea,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconUpload } from "@tabler/icons-preact";

export default function SignupAgency() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      agencyName: "",
      firstName: "ag",
      lastName: "bb",
      email: "ag@gmail.com",
      password: "hzompieh",
      phoneNumber: "1234",
      bio: "dfgdfgffffffff",
      bioAr: "fgdfgfffffffffff",
      role: "Agency",
      agencyStatus:"active",
      profilePic: null,
    },

    validate: {
      firstName: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      lastName: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (val) =>
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          val
        )
          ? null
          : "Invalid email",
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      // phoneNumber: (val) =>
      //   / ^[0-9]*$/.test(val) ? null : "Invalid Phone Number",
      bio: (value) =>
        value.length < 7
          ? "Name must have at least 700 letters"
          : value.length > 20
          ? "Name must have Maxmimum 2000 letters"
          : null,
      bioAr: (value) =>
        value.length < 7
          ? "Name must have at least 700 letters"
          : value.length > 20
          ? "Name must have Maxmimum 2000 letters"
          : null,
      profilePic: (value) =>
        value === null ? "Profile Picture Is Required" : null,
    },
  });

  async function addAgency(values) {
    setLoading(true);
    let parseFile = null;

    if (values.profilePic) {
      //  console.log(values.profilePic)
      parseFile = new Parse.File(
        `profilePic${values.profilePic.name.slice(-5)}`,
        values.profilePic
      );
      await parseFile.save();
      values.profilePic = parseFile;
    }
    try {
      // const agency = await queryAgency(values.agencyName);
      // if (agency !== undefined) {
      //  // console.log({ agency });
      //   throw new Error("Agency Name Already Exists");
      // }
      //  let createdUser = await Parse.User.signUp(values.email, values.password);

      //  console.log(values.profilePic)
      //console.log(parseFile)
      const addAgency = await Parse.Cloud.run("addAgency", values);
      console.log({ addAgency });
      form.reset();
      notifications.show({
        title: "Agency Added Successfully",
      });
      setLoading(false);
      return true;
      // if (createdUser) {

      //   let roleACL = new Parse.ACL();
      //   roleACL.setPublicReadAccess(true);
      //   roleACL.setRoleWriteAccess("SuperAdmin", true);
      //   roleACL.setRoleWriteAccess("SubAdmin", true);
      //   roleACL.setWriteAccess(Parse.User.current(), true);
      //    const agencyRoleName = `${values.agencyName.replace(/\s/g, '')}Agency`
      //   const agencyModeratorName = `${values.agencyName.replace(
      //     /\s/g,
      //     ""
      //   )}Moderator`;
      //    let role = new Parse.Role(agencyRoleName, roleACL)
      //    const savedRole = await role.save()
      //    console.log({savedRole})
      //    savedRole.getUsers().add(Parse.User.current())
      //    const updateRoll = await savedRole.save()
      //    console.log({updateRoll})
      //  roleACL.setRoleWriteAccess(agencyRoleName, true)
      //   let moderatorRole = new Parse.Role(agencyModeratorName, roleACL);
      //   const addModeratorRole = await moderatorRole.save();
      //   addModeratorRole.getUsers().add(Parse.User.current());
      //   const updateModeratorRoll = await addModeratorRole.save();
      //   console.log({ updateModeratorRoll });
      //   let agencyProfile = new Parse.Object("Agency");
      //   agencyProfile.set("agencyName", values.agencyName);
      //   agencyProfile.set("firstName", values.firstName);
      //   agencyProfile.set("lastName", values.lastName);
      //   agencyProfile.set("email", values.email);
      //   agencyProfile.set("bio", values.bio);
      //   agencyProfile.set("bioAr", values.bioAr);
      //   agencyProfile.set("phoneNumber", values.phoneNumber);
      //   agencyProfile.set("userRole", "Agency");
      //    agencyProfile.set("agencyRoleName", role);
      //   agencyProfile.set("moderatorRoleName", agencyModeratorName);
      //   if (values.profilePic) agencyProfile.set("profilePic", parseFile);
      //   agencyProfile.set("userPointer", createdUser.toPointer());
      //   let agencyACL = new Parse.ACL();
      //   agencyACL.setPublicReadAccess(true);
      //   agencyACL.setWriteAccess(Parse.User.current(), true);
      //   agencyACL.setRoleWriteAccess("SuperAdmin", true);
      //   agencyACL.setRoleWriteAccess("SubAdmin", true);
      //   agencyProfile.setACL(agencyACL);
      //   let saveAgency = await agencyProfile.save();
      //   console.log({ saveAgency });

      //   createdUser.set("firstName", values.firstName);
      //   createdUser.set("lastName", values.lastName);
      //   createdUser.set("email", values.email);
      //   createdUser.set("userRole", "Agency");
      //   createdUser.set(
      //     "profilePicUrl",
      //     saveAgency?.attributes?.profilePic?._url
      //   );
      //   createdUser.set("agencyPointer", saveAgency.toPointer());
      //   let userACL = new Parse.ACL();
      //   userACL.setPublicReadAccess(true);
      //   userACL.setWriteAccess(Parse.User.current(), true);
      //   userACL.setRoleWriteAccess("SuperAdmin", true);
      //   userACL.setRoleWriteAccess("SubAdmin", true);
      //   createdUser.setACL(userACL);
      //   const updateAgency = await createdUser.save();
      //   console.log({ updateAgency });

      //   setLoading(false);
      //   userData.value = updateAgency;
      //   notifications.show({
      //     title: "Signed Up Successfully",
      //   });
      //   return true;
      // } else {
      //   throw new Error("Something Went Wrong, Couldn't Sign In");
      // }
    } catch (error) {
      setLoading(false);
      values.profilePic = null;
      // Error can be caused by lack of Internet connection
      notifications.show({
        title: "Error",
        message: `Error! ${error.message} 🤥`,
        color: "red",
      });
      return false;
    }
  }

  return (
    <>
      <Title my={30} order={1} weight={700} ta="center" c="blue.4">
        {" "}
        Create An Agency
      </Title>
      <Paper w="90%" maw={700} mt={10} mx="auto" radius="md" p="xl" withBorder>
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
              {...form.getInputProps("agencyName")}
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
              {...form.getInputProps("email")}
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
              {...form.getInputProps("firstName")}
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
              {...form.getInputProps("lastName")}
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
              {...form.getInputProps("password")}
            />
            <TextInput
              required
              label="Phone Number"
              placeholder="Your Phone Number"
              value={form.values.phoneNumber}
              onChange={(event) =>
                form.setFieldValue("phoneNumber", event.currentTarget.value)
              }
              radius="md"
              {...form.getInputProps("phoneNumber")}
            />
            <Textarea
              required
              autosize
              minRows={2}
              maxRows={4}
              label="About Agency"
              placeholder="About Agency"
              description="From 400 to 2000 characters"
              value={form.values.bio}
              onChange={(event) =>
                form.setFieldValue("bio", event.currentTarget.value)
              }
              radius="md"
              {...form.getInputProps("bio")}
            />
            <Textarea
              required
              autosize
              minRows={2}
              maxRows={4}
              label="Arabic About Agency"
              placeholder="Arabic About Agency"
              description="From 400 to 2000 characters"
              value={form.values.bioAr}
              onChange={(event) =>
                form.setFieldValue("bioAr", event.currentTarget.value)
              }
              radius="md"
              {...form.getInputProps("bioAr")}
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
              {...form.getInputProps("profilePic")}
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
