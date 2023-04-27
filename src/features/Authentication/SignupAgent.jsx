import { useEffect, useState } from "preact/hooks";

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
  Textarea,
  Select,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconUpload } from "@tabler/icons-preact";
import { logout, queryAgency, userData } from "../../store/appState";
import { useNavigate } from "react-router";
export default function SignupAgent({ edit = false, signup = false }) {
  const [editMode, setEditMode] = useState(edit);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate()
  let form = useForm({
    initialValues: {
      firstName: "ag",
      lastName: "bb",
      firstNameAr: "ag",
      lastNameAr: "bb",
      email: "ag@gmail.com",
      phoneNumber: "1234",
      bio: "dfgdfgffffffff",
      bioAr: "fgdfgfffffffffff",
      accountStatus:"active"
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
      newPassword: (val) => {
        if (val && val.length > 0) {
          return val.length <= 6
            ? "Password should include at least 6 characters"
            : null;
        }
      },
      password: (val) => {
        if (signup) {
          return val.length <= 6
            ? "Password should include at least 6 characters"
            : null;
        }
      },
      // phoneNumber:(val) => (/ ^[0-9]*$/.test(val) ? null : "Invalid Phone Number"),
      bio: (value) => {
        if (signup) {
          return value.length < 10
            ? "Name must have at least 700 letters"
            : value.length > 2000
            ? "Name must have Maxmimum 2000 letters"
            : null;
        }
      },
      bioAr: (value) => {
        if (signup) {
          return value.length < 10
            ? "Name must have at least 700 letters"
            : value.length > 2000
            ? "Name must have Maxmimum 2000 letters"
            : null;
        }
      },
      role: (value) => {
        if (signup) {
          return !["Admin", "Moderator", "SeniorAgent", "Agent"].includes(value)
            ? "Agent Role Is Required"
            : null;
        }
      },
      profilePic: (value) => {
        if (signup) {
          return value === null ? "Profile Picture Is Required" : null;
        }
      },
    },
  });

  useEffect(() => {
    if (userData.value?.id && !signup) {
      form.setValues(
        {
          firstName: userData.value.get("firstName"),
          lastName: userData.value.get("lastName"),
          firstNameAr: userData.value.get("firstNameAr"),
          lastNameAr: userData.value.get("lastNameAr"),
          email: userData.value.get("email"),
          phoneNumber: userData.value.get("phoneNumber"),
          bio: userData.value.get("bio"),
          bioAr: userData.value.get("bioAr"),
        }
      );
    }
  },
        [userData.value]);
  const userRole = userData.value.userRole;
  let heading = "";
  let mode = "Signup";
  if (signup) {
    heading = "Signup Agent";
  } else if (editMode === false) {
    heading = "User Profile Info. ";
    mode = "viewProfile";
  } else {
    setEditMode(true);
    heading = "Edit Profile Info. ";
    mode = "editProfile";
  }
  // console.log({edit})
  // console.log({signup})
  // console.log({editMode})
  async function addAgent(values) {
    setLoading(true);

    let parseFile = null;

    try {
      if (values.profilePic) {
        parseFile = new Parse.File(
          `profilePic${values.profilePic.name.slice(-5)}`,
          values.profilePic
        );
        // console.log(parseFile)
        await parseFile.save();
        values.profilePic = parseFile;
      }
      if (signup) {
        const addAgent = await Parse.Cloud.run("addAgent", values);
        console.log({ addAgent });
        form.reset();
        setLoading(false);
        notifications.show({
          title: "Agent Added Successfully",
        });
        return true;
      } else {
        console.log({ values });
        const editAgent = await Parse.Cloud.run("editUserProfile", values);
        console.log({ editAgent });
        logout() 
        navigate("/")
        setLoading(false);
        setEditMode(false);
        userData.value = editAgent;
        userData.value.userRole = editAgent.attributes.userRole;
        notifications.show({
          title: "Agent Edited Successfully",
        });
       
        return true;
      }
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
        {heading}{" "}
      </Title>
      <Paper w="90%" maw={700} mt={10} mx="auto" radius="md" p="xl" withBorder>
        <form onSubmit={form.onSubmit((values) => addAgent(values))}>
          <Stack>
            <TextInput
              disabled={!editMode}
              required={!editMode}
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
              required={!editMode}
              disabled={!editMode}
              label="Last Name"
              placeholder="Your Last Name"
              value={form.values.lastName}
              onChange={(event) =>
                form.setFieldValue("lastName", event.currentTarget.value)
              }
              radius="md"
              {...form.getInputProps("lastName")}
            />
            {userRole !== "Viewer" && (
              <>
                <TextInput
                  required={!editMode}
                  disabled={!editMode}
                  label="First Name Arabic"
                  placeholder="Your First Name in Arabic"
                  value={form.values.firstNameAr}
                  onChange={(event) =>
                    form.setFieldValue("firstNameAr", event.currentTarget.value)
                  }
                  radius="md"
                  {...form.getInputProps("firstNameAr")}
                />
                <TextInput
                  required={!editMode}
                  disabled={!editMode}
                  label="Last Name Arabic"
                  placeholder="Your Last Name in Arabic"
                  value={form.values.lastNameAr}
                  onChange={(event) =>
                    form.setFieldValue("lastNameAr", event.currentTarget.value)
                  }
                  radius="md"
                  {...form.getInputProps("lastNameAr")}
                />
              </>
            )}

            <TextInput
              required={!editMode}
              disabled={!editMode}
              label="Agent Account Email"
              placeholder="Enter Agent Account Email"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              radius="md"
              {...form.getInputProps("email")}
            />
            {signup && (
              <PasswordInput
                required={!editMode}
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                radius="md"
                {...form.getInputProps("password")}
              />
            )}
            {userRole !== "Viewer" && (
              <>
                <TextInput
                  required={!editMode}
                  disabled={!editMode}
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
                  required={!editMode}
                  disabled={!editMode}
                  autosize
                  minRows={2}
                  maxRows={4}
                  label="About Agent"
                  placeholder="About Agent"
                  description="From 400 to 2000 characters"
                  value={form.values.bio}
                  onChange={(event) =>
                    form.setFieldValue("bio", event.currentTarget.value)
                  }
                  radius="md"
                  {...form.getInputProps("bio")}
                />
                <Textarea
                  required={!editMode}
                  disabled={!editMode}
                  autosize
                  minRows={2}
                  maxRows={4}
                  label="Arabic About Agent"
                  placeholder="Arabic About Agent"
                  description="From 400 to 2000 characters"
                  value={form.values.bioAr}
                  onChange={(event) =>
                    form.setFieldValue("bioAr", event.currentTarget.value)
                  }
                  radius="md"
                  {...form.getInputProps("bioAr")}
                />

                <FileInput
                  required={!editMode}
                  disabled={!editMode}
                  label="Profile Picture"
                  placeholder="Upload Your Profile Picture"
                  value={form.values.profilePic}
                  accept="image/png,image/jpeg"
                  onChange={(event) => {
                    form.setFieldValue("profilePic", event);
                  }}
                  icon={<IconUpload size="1rem" />}
                  {...form.getInputProps("profilePic")}
                />
              </>
            )}
            {!signup && editMode && (
              <>
                <PasswordInput
                  required={!editMode}
                  label="Current Password"
                  placeholder="Your Current password"
                  value={form.values.currentPassword}
                  onChange={(event) =>
                    form.setFieldValue(
                      "currentPassword",
                      event.currentTarget.value
                    )
                  }
                  radius="md"
                />
                <PasswordInput
                  required={!editMode}
                  label="New Password"
                  placeholder="Your New password"
                  value={form.values.newPassword}
                  onChange={(event) =>
                    form.setFieldValue("newPassword", event.currentTarget.value)
                  }
                  radius="md"
                  {...form.getInputProps("newPassword")}
                />
              </>
            )}
          </Stack>

          <Group position="apart" mt="xl">
            {mode === "Signup" && (
              <Button type="submit" radius="xl" loading={loading}>
                Signup
              </Button>
            )}
            {mode === "viewProfile" && (
              <Button radius="xl" onClick={() => setEditMode(true)}>
                Edit Profile
              </Button>
            )}
            {mode === "editProfile" && (
              <>
                <Button radius="xl" onClick={() => setEditMode(false)}>
                  cancel
                </Button>
                <Button type="submit" radius="xl" loading={loading}>
                  Update Profile
                </Button>
              </>
            )}
          </Group>
        </form>
      </Paper>
    </>
  );
}
