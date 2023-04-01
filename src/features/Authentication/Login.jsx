import { useToggle, upperFirst } from "@mantine/hooks";
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
} from "@mantine/core";
import { GoogleButton, TwitterButton } from "./SocialButtons";
import Backendless from "backendless";
export default function Login(props) {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
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
  const handleGoogleAuth = async () => {
    const res = await fetch(
      "https://sageaddition.backendless.app/api/users/oauth/facebook/request_url",
      {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(formData),
      }
    );
    if (!res.ok) {
      console.log(res);
      const err = await res.json();
      throw new Error(err.message);
    } else {
      console.log(res);
      const data = await res.json();
      console.log(data);
    }
  };
  const handleSubmit = (data) => {
    const onSuccess = (user) => {
      console.log("User has been logged in:\n", user);
    };

    const onError = (error) => {
      console.error("Server reported an error: ", error.message);
      console.error("error code: ", error.code);
      console.error("http status: ", error.status);
    };

    Backendless.UserService.login(data.email, data.password)
      .then(onSuccess)
      .catch(onError);
  };
  return (
    <Paper w={700} mt={100} mx="auto" radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to My Home, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl" onClick={handleGoogleAuth}>
          Google
        </GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
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
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
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
          <Button onClick={() => handleGoogleAuth()}>test auth</Button>
        </Group>
      </form>
    </Paper>
  );
}
