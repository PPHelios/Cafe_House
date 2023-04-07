import { Link, useNavigate } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";

import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Title,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { GoogleButton, FacebookButton } from "./SocialButtons";
//import Backendless from "backendless";
import { userData } from "../../store/appState";
export default function Login() {
  const navigate = useNavigate();
  const signup = true;
  const header = "Signup";
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
      // Since the signUp method returns a Promise, we need to call it using await
      const createdUser = await Parse.User.signUp(
        values.email,
        values.password
      );
      createdUser.set("firstName", values.firstName);
      createdUser.set("lastName", values.lastName);
      createdUser.set("email", values.email);
      createdUser.set("role", values.role);
      const saveUser = await createdUser.save();
      userData.value = saveUser;
      notifications.show({
        title: "Signed Up Successfully",
      });
      navigate("/");
      return true;
    } catch (error) {
      // signUp can fail if any parameter is blank or failed an uniqueness check on the server
      if (error.code == 209) logout(await Parse.User.logOut());
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
        Welcome to My Home, Signup with
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
              {signup && (
                <>
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
                </>
              )}

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
                to="/login"
                type="button"
                color="dimmed"
                onClick={() => toggle()}
                size="xs"
              >
                {signup
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </Anchor>
              <Button type="submit" radius="xl">
                {header}
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
