import React from "react";
import { useState } from "preact/hooks";
import Parse from "parse/dist/parse.min.js";
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = new Parse.User();
    user.set("username", username);
    user.set("email", email);
    user.set("phoneNumber", phoneNumber);
    user.set("name", name);
    user.set("password", password);

    try {
      // Since the signUp method returns a Promise, we need to call it using await
      let resultUser = await user.signUp();
      alert(
        `Success! User ${resultUser.getUsername()} was successfully created!`
      );
      return true;
    } catch (error) {
      // signUp can fail if any parameter is blank or failed an uniqueness check on the server
      console.dir(`Error: ${error}`);
      return false;
    }
  };

  const check = async (e) => {
    e.preventDefault();
    const query = new Parse.Query("User");
    const results = await query.distinct("username");

    // Returns unique emails
    try {
      const results = await query.find();
      console.log(`Unique emails: ${JSON.stringify(results)}`);
    } catch (error) {
      console.log(`Error: ${JSON.stringify(error)}`);
    }
  };
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
