
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
import { useState } from "preact/hooks";

export default function Login() {
const [loading, setLoading] = useState(false)


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
    setLoading(true)
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
      if(loggedInUser){
        userData.value = loggedInUser;
      setLoading(false)
      notifications.show({
        title: "Logged In Successfully",
      });
      navigate("/");
      return true;
      } else{
       
        throw new Error("Something Went Wrong, Couldn't Sign In")
      }
      
    } catch (error) {
      setLoading(false)
      console.log(error)
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
              <Anchor
                component={Link}
                to="/resetpassword"
                type="button"
                color="dimmed"
                size="xs"
              >
               Forgot Your Password?
              </Anchor>
            
            </Group>
            <Button mt={20} type="submit" radius="xl" loading={loading}>
                Login
              </Button>
          </form>
        </Paper>
      ) : (
        <>
          <p>You Are Logged In {userData.value.get("firstName")}</p>
          {/* <button
            onClick={async () =>{
let roleACL= new Parse.ACL()
roleACL.setPublicReadAccess(true)
roleACL.setRoleWriteAccess("SuperAdmin", true)
roleACL.setRoleWriteAccess("SubAdmin", true)
let role = new Parse.Role("AgencyModerators", roleACL)
const savedRole = await role.save()
// savedRole.getUsers().add(Parse.User.current())
// const updateRoll = await savedRole.save()
// console.log(updateRoll)
// const x =await Parse.Cloud.run("hello" ,{y:"hellowsssssuuu"})
// console.log(x)

            }
             
            }
          >
            pic
          </button> */}
        </>
      )}
    </>
  );
}
