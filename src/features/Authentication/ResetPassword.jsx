
import Parse from "parse/dist/parse.min.js";

import { useForm } from "@mantine/form";
import {
  TextInput,

  Paper,

  Button,

  Title,

  Stack,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function ResetPassword() {


  const form = useForm({
    initialValues: {
    
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
    try {

      const emailQuery = new Parse.Query("User")
      emailQuery.equalTo("email",values.email)
      const searchForUser = await emailQuery.first()
      console.log(searchForUser)
      if(searchForUser){
        await Parse.User.requestPasswordReset(values.email);
         notifications.show({
       title: `Success! Please check ${values.email} to proceed with password reset.`,
     });
      } else {
        throw new Error("This Email Doesn't Exist")
      }

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
       Reset Password
      </Title>
     
        <Paper w="90%" maw={700} mx="auto" radius="md" p="xl" withBorder>
         
   

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

    
            </Stack>

           
            <Button mt={20} type="submit" radius="xl">
                Reset Password
              </Button>
          </form>
        </Paper>
    
        </>
   
  );
}
