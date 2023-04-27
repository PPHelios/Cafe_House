import { useState } from "preact/hooks";

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
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const signup = true;
  const header = "Signup";
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      accountStatus:"active",
      user: "viewer",
    },

    validate: {
      firstName: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      lastName: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (val) => (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const saveUser =await Parse.Cloud.run("userSignup" ,values)
 console.log({saveUser})
 setLoading(false);
      // Since the signUp method returns a Promise, we need to call it using await
      // const createdUser = await Parse.User.signUp(
      //   values.email,
      //   values.password
      // );
      // if(createdUser){
      //    createdUser.set("firstName", values.firstName);
      // createdUser.set("lastName", values.lastName);
      // createdUser.set("email", values.email);
      // createdUser.set("userRole", values.role);
      // let userACL= new Parse.ACL()
      // userACL.setPublicReadAccess(true)
      // userACL.setWriteAccess(Parse.User.current(), true)
      // userACL.setRoleWriteAccess("SuperAdmin", true)
      // userACL.setRoleWriteAccess("SubAdmin", true)
      // createdUser.setACL(userACL);
      // const saveUser = await createdUser.save();
      Parse.User.become(saveUser.get("sessionToken"))
      if(saveUser){
         userData.value = saveUser;
      setLoading(false)
      notifications.show({
        title: "Signed Up Successfully",
      });
      navigate("/");
      return true;
      }else{
        
        throw new Error("Something Went Wrong, Couldn't Sign Up")
      }
     
      // }  else{
      //   throw new Error("Something Went Wrong, Couldn't Sign Up")
      // }
     
    } catch (error) {
      setLoading(false)
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
                    {...form.getInputProps('firstName')}
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
                    {...form.getInputProps('lastName')}
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
              
                radius="md"
                {...form.getInputProps('email')}
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                description="Password Must Be 6 Characters At Least"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                radius="md"
                {...form.getInputProps('password')}
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
              <Button type="submit" radius="xl" loading={loading}>
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
