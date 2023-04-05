import { useToggle, upperFirst } from "@mantine/hooks";
import Parse from "parse/dist/parse.min.js";
const PARSE_APPLICATION_ID = import.meta.env.VITE_PARSE_APPLICATION_ID;
const PARSE_HOST_URL = import.meta.env.VITE_PARSE_HOST_URL;
const PARSE_JAVASCRIPT_KEY = import.meta.env.VITE_PARSE_JAVASCRIPT_KEY;
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  FileInput,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-preact";
import { GoogleButton, FacebookButton } from "./SocialButtons";
//import Backendless from "backendless";
import { userData } from "../../store/appState";
export default function Login(props) {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "viewer",
      profilePic: null,
      terms: true,
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
    if (type === "register") {
      console.log(values.profilePic);
      let parseFile = null;
      if (values.profilePic !== null) {
        parseFile = new Parse.File("img.jpeg", values.profilePic);
      }

      try {
        // Since the signUp method returns a Promise, we need to call it using await
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
        return true;
      } catch (error) {
        // signUp can fail if any parameter is blank or failed an uniqueness check on the server
        if (error.code == 209) logout(await Parse.User.logOut());
        alert(`Error! ${error}`);
        return false;
      }
    }
    try {
      const loggedInUser = await Parse.User.logIn(
        values.email,
        values.password
      );
      // logIn returns the corresponding ParseUser object
      alert(
        `Success! User ${loggedInUser.get(
          "username"
        )} has successfully signed in!`
      );
      // Clear input fields

      // Update state variable holding current user
      userData.value = loggedInUser;
      return true;
    } catch (error) {
      // Error can be caused by wrong parameters or lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
  };
  return (
    <Paper w={700} mt={100} mx="auto" radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to My Home, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>

        <FacebookButton radius="xl">Facebook</FacebookButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          {type === "register" && (
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

          {type === "register" && (
            <>
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
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            </>
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
