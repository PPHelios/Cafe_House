import { useState } from "preact/hooks";
import Parse from "parse/dist/parse.min.js";

import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Button,
  Divider,
  Title,
  Anchor,
  Stack,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { GoogleButton, FacebookButton } from "./SocialButtons";
//import Backendless from "backendless";
import { userData } from "../../store/appState";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "viewer",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      // password: (val) =>
      //   val.length <= 6
      //     ? "Password should include at least 6 characters"
      //     : null,
    },
  });

  const handleSubmit = async (values) => {
    try {
      const loggedInUser = await Parse.User.logIn(
        values.email,
        values.password
      );
      // logIn returns the corresponding ParseUser object
      // alert(
      //   `Success! User ${loggedInUser.get(
      //     "username"
      //   )} has successfully signed in!`
      // );
      // Clear input fields

      // Update state variable holding current user
      userData.value = loggedInUser;
      notifications.show({
        title: "Logged In Successfully",
      });
      navigate("/");
      return true;
    } catch (error) {
      // Error can be caused by wrong parameters or lack of Internet connection
      notifications.show({
        title: "Error",
        message: `Error! ${error.message} 🤥`,
        color: 'red',
      });
      return false;
    }
  };
  return (
    <>
      <Title my={30} order={1} weight={700} ta="center" c="blue.4">
        Welcome to My Home, Login with
      </Title>
      {!userData?.value?.id ? (
        <Paper w="90%" maw={700} mx="auto" radius="md" p="xl" withBorder>
          <Group grow mb="md" mt="md">
            <GoogleButton radius="xl">Google</GoogleButton>

            <FacebookButton radius="xl">Facebook</FacebookButton>
          </Group>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />

          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
            </Stack>

            <Group position="apart" mt="xl">
              <Anchor
                component={Link}
                to="/signup"
                type="button"
                color="dimmed"
                size="xs"
              >
                Don't have an account? Register
              </Anchor>
              <Button type="submit" radius="xl">
                Login
              </Button>
            </Group>
          </form>
        </Paper>
      ) : (
        <>
          <p>You Are Logged In {userData.value.get("firstName")}</p>
          {/* <button
            onClick={() =>
              console.log(Parse.User.current().get("agencyPointer"))
            }
          >
            pic
          </button> */}
        </>
      )}
    </>
  );
}
