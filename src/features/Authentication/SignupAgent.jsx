import { useState } from "preact/hooks";

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
  Select
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconUpload } from "@tabler/icons-preact";
import { queryAgency, userData } from "../../store/appState";
export default function SignupAgent() {

  const [loading, setLoading] = useState(false)
  const form = useForm({
    initialValues: {
      firstName: "ag1",
      lastName: "yyyyyyyyy",
      firstNameAr: "qqqqqqqq",
      lastNameAr: "aaaaaaaa",
      email: "ag1@gmail.com",
      password: "hzompieh",
      phoneNumber: "4535345",
      bio: "dfgdfgddddddddddd",
      bioAr: "fgdfgggggggggggggg",
      role:"",
      profilePic: null,
    },

    validate: {
      firstName: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      lastName: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (val) => (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
          // phoneNumber:(val) => (/ ^[0-9]*$/.test(val) ? null : "Invalid Phone Number"),
          bio: (value) => (value.length < 10 ? 'Name must have at least 700 letters' : value.length>2000?'Name must have Maxmimum 2000 letters': null),
          bioAr: (value) => (value.length < 10 ? 'Name must have at least 700 letters' : value.length>2000?'Name must have Maxmimum 2000 letters': null),

    },
  });

  const userRole = userData.value?.attributes?.userRole
  console.log(userRole);
  let options =[]
  if(userRole==="Agency"){
     options=["Moderator","AdCreator","SeniorAgent" ,"Agent",]
  } else if(userRole==="Moderator"){
    options=["AdCreator","SeniorAgent" ,"Agent",]
  }
  
  async function addAgent(values) {
    setLoading(true)

    let parseFile = null;
    if (values.profilePic) {
      parseFile = new Parse.File(values.profilePic.name.slice(-5), values.profilePic);
      await parseFile.save()
      values.profilePic = parseFile
    }
    // console.log(values.profilePic.name)
    try {
     const addAgent =await Parse.Cloud.run("addAgent" ,values)
    console.log(addAgent);
      setLoading(false)
      notifications.show({
        title: "Agent Added Successfully",
      });
      return true;


    //   const agency = await queryAgency(values.agencyName);
    //   console.log(agency);
    //   if (agency === undefined) {
    //     throw new Error("no such Agency");
    //   }

    //   const createdUser = await Parse.User.signUp(
    //     values.email,
    //     values.password
    //   );

    //   let agentProfile = new Parse.Object("Agent");
    //   agentProfile.set("agencyName", values.agencyName);
    //   agentProfile.set("firstName", values.firstName);
    //   agentProfile.set("lastName", values.lastName);
    //   agentProfile.set("email", values.email);
    //   agentProfile.set("bio", values.bio);
    //   agentProfile.set("bioAr", values.bioAr);
    //   agentProfile.set("phoneNumber", values.phoneNumber);
    //   agentProfile.set("userRole", "Agent");
    //   if (values.profilePic) agentProfile.set("profilePic", parseFile);
    //   agentProfile.set("userPointer", createdUser.toPointer());
    //   agentProfile.set("agencyPointer", agency.toPointer());
    //   let agentProfileACL= new Parse.ACL()
    //   agentProfileACL.setPublicReadAccess(true)
    //   agentProfileACL.setWriteAccess(Parse.User.current(), true)
    //   agentProfileACL.setRoleWriteAccess("SuperAdmin", true)
    //   agentProfileACL.setRoleWriteAccess("SubAdmin", true)
    //   agentProfileACL.setWriteAccess(agency.get("userPointer").id, true)
    //   agentProfile.setACL(agentProfileACL);
    //   const addAgent = await agentProfile.save();

    //   console.log(addAgent);

    //   createdUser.set("firstName", values.firstName);
    //   createdUser.set("lastName", values.lastName);
    //   createdUser.set("email", values.email);
    //   createdUser.set("userRole", "Agent");
    //   createdUser.set("profilePicUrl", addAgent?.attributes?.profilePic?._url);
    //   createdUser.set("agencyPointer", agency.toPointer());
    //   createdUser.set("agentPointer", addAgent.toPointer());
      
    //   let userACL= new Parse.ACL()
    //   userACL.setPublicReadAccess(true)
    //   userACL.setWriteAccess(Parse.User.current(), true)
    //   userACL.setRoleWriteAccess("SuperAdmin", true)
    //   userACL.setRoleWriteAccess("SubAdmin", true)
    // //  agentProfileACL.setWriteAccess(agency.get("userPointer").id, true)
    //   createdUser.setACL(userACL);
    //   const updateAgent = await createdUser.save();
    //   // revert to agency profile
    //  await Parse.User.become(sessionToken);
    //   navigate(0)
    
   
    } catch (error) {
      setLoading(false)
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
    <Title my={30} order={1} weight={700} ta="center" c="blue.4">  Create An Agent</Title>
      <Paper w="90%" maw={700} mt={10} mx="auto" radius="md" p="xl" withBorder>

        <form onSubmit={form.onSubmit((values) => addAgent(values))}>
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
            <TextInput
              required
              label="First Name Arabic"
              placeholder="Your First Name in Arabic"
              value={form.values.firstNameAr}
              onChange={(event) =>
                form.setFieldValue("firstNameAr", event.currentTarget.value)
              }
              radius="md"
                            {...form.getInputProps('firstNameAr')}

            />
            <TextInput
              required
              label="Last Name Arabic"
              placeholder="Your Last Name in Arabic"
              value={form.values.lastNameAr}
              onChange={(event) =>
                form.setFieldValue("lastNameAr", event.currentTarget.value)
              }
              radius="md"
                            {...form.getInputProps('lastNameAr')}

            />
            <TextInput
              required
              label="Agent Account Email"
              placeholder="Enter Agent Account Email"
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
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
                       {...form.getInputProps('password')}

              radius="md"
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
                            {...form.getInputProps('phoneNumber')}

            />
            <Textarea
              required
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
                            {...form.getInputProps('bio')}

            />
            <Textarea
              required
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
                            {...form.getInputProps('bioAr')}

            />
              <Select
              required
              w={200}
           
              data={options}
              display="inline-block"
              {...form.getInputProps("role")}
              label="Agent Role"
              placeholder="Pick Agent Role"
              aria-label="Pick Agent Role"
              // sx={(theme) => ({
              //   "& .mantine-Select-input": {
              //     paddingRight: 20,
              //     textAlign: "center",
              //   },
              // })}
            />
            <FileInput
              label="Profile Picture"
              placeholder="Upload Your Profile Picture"
              value={form.values.profilePic}
              accept="image/png,image/jpeg"
              onChange={(event) => {
                form.setFieldValue("profilePic", event);
              }}
              icon={<IconUpload size="1rem" />}
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
