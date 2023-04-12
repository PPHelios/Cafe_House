import { useEffect, useState } from "preact/hooks";

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

//import Backendless from "backendless";
import { userData } from "../../store/appState";
export default function EditAgent() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(false)
  const navigate = useNavigate();
  
useEffect(()=>{
  const getAgentData=async()=>{
    let agentQuery= new Parse.Query("Agent")
    agentQuery.equalTo("objectId","Nn2qfpaxme")
    const searchResults = await agentQuery.first()
    console.log({searchResults})
    setUser(searchResults)
    form.setValues({
      firstName: searchResults.attributes.firstName,
      lastName: searchResults.attributes.lastName,
      email: searchResults.attributes.email,
    })
  }
  getAgentData()
},[])

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
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
      // Since the signUp method returns a Promise, we need to call it using await
    
      if(user){

// let agentQuery= new Parse.Query("Agent")
// agentQuery.equalTo("email","adamsag1@gmail.com")
// let editableUser = await agentQuery.first()
// console.log({editableUser})
let editableUser = user
         editableUser.set("firstName", values.firstName);
      editableUser.set("lastName", values.lastName);
    //  editableUser.set("email", values.email);
     // editableUser.set("password", values.password);
      const saveUser = await editableUser.save();
      if(saveUser){
        console.log({saveUser})
      
      setLoading(false)
      notifications.show({
        title: "User Data Updated Successfully",
      });
     // navigate("/");
      return true;
      }else{
        console.log("bbbbbbbbb")
        throw new Error("Something Went Wrong, Couldn't Sign Up")
      }
     
      }  else{
        console.log("yyyyyyyy")
        throw new Error("Something Went Wrong, Couldn't Sign Up")
      }
     
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
      
      </Title>
     
      <Paper w="90%" maw={700} mx="auto" radius="md" p="xl" withBorder>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Stack>
          
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

             
            </Stack>

            <Group position="apart" mt="xl">
              
              <Button type="submit" radius="xl" loading={loading}>
              Update User Data
              </Button>
            </Group>
          </form>
        </Paper>
     </>
  );
}
