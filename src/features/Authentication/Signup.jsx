import React from "react";
import { useState } from "preact/hooks";
// import Parse from "parse/dist/parse.min.js";
import Backendless from "backendless";
import {
  TextInput,
  PasswordInput,
  Box,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const formData = {
    email,
    password,
    username: name,
    phoneNumber: phoneNumber,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const res = await fetch(
    //   "https://eu-api.backendless.com/B4754586-32AD-1A26-FFBD-2D0391803A00/07278997-8FAC-49C2-9837-84BA3FF92DEB/data/Agents",
    //   {
    //     method: "POST",

    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   }
    // );
    // if (!res.ok) {
    //   const err = await res.json();
    //   throw new Error(err.message);
    // } else {
    //   const data = await res.json();
    //   console.log(data);
    // }

    const onSuccess = (user) => {
      console.log("User has been registered:\n", user);
    };

    const onError = (error) => {
      console.error("Server reported an error: ", error.message);
      console.error("error code: ", error.code);
      console.error("http status: ", error.status);
    };

    const user = new Backendless.User();

    user.email = "green.goblin@backendless.com";
    user.password = "sp1dey";
    user.username = "Green Goblin";
    user.phoneNumber = "212-555-1212";

    Backendless.UserService.register(user).then(onSuccess).catch(onError);
  };
  const check = async (e) => {
    e.preventDefault();
    // const agents = await Backendless.Data.of("Agents").find();
    const res = await fetch("https://finebulb.backendless.app/api/data/Agents");
    // const res = await fetch(
    //   "https://eu-api.backendless.com/B4754586-32AD-1A26-FFBD-2D0391803A00/07278997-8FAC-49C2-9837-84BA3FF92DEB/data/Users"
    // );

    const data = await res.json();
    console.log(data);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const user = new Parse.User();
  //   user.set("username", username);
  //   user.set("email", email);
  //   user.set("phoneNumber", phoneNumber);
  //   user.set("name", name);
  //   user.set("password", password);

  //   try {
  //     // Since the signUp method returns a Promise, we need to call it using await
  //     let resultUser = await user.signUp();
  //     alert(
  //       `Success! User ${resultUser.getUsername()} was successfully created!`
  //     );
  //     return true;
  //   } catch (error) {
  //     // signUp can fail if any parameter is blank or failed an uniqueness check on the server
  //     console.dir(`Error: ${error}`);
  //     return false;
  //   }
  // };

  // const check = async (e) => {
  //   e.preventDefault();
  //   const query = new Parse.Query("User");
  //   const results = await query.distinct("username");

  //   // Returns unique emails
  //   try {
  //     const results = await query.find();
  //     console.log(`Unique emails: ${JSON.stringify(results)}`);
  //   } catch (error) {
  //     console.log(`Error: ${JSON.stringify(error)}`);
  //   }
  // };
  return (
    <Box>
      <TextInput
        value={username}
        label="User Name"
        placeholder="Add User Name"
        onChange={(event) => setUsername(event.currentTarget.value)}
      />
      <TextInput
        label="Email"
        placeholder="Add Email"
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />

      <TextInput
        label="Phone Number"
        placeholder="Add Phone Number"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.currentTarget.value)}
      />
      <TextInput
        label="name"
        placeholder="Add name"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
      <PasswordInput
        label="Password"
        placeholder="Add Password"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
      />
      <Button onClick={(e) => handleSubmit(e)}>submit</Button>
      <Button onClick={(e) => check(e)}>check</Button>
    </Box>
  );
}

export default Signup;
