import { useEffect, useState } from "preact/hooks";

import { Link, useNavigate ,useParams} from "react-router-dom";
import Parse from "parse/dist/parse.min.js";

import { useForm } from "@mantine/form";
import {
  Title,
  Paper,
  Group,
  Button,
  Stack,
  Select
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

//import Backendless from "backendless";
import { userData, agents } from "../../store/appState";
export default function EditAgentRole() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  let { agentId } = useParams();
  
  useEffect(() => {
let agentToEdit = []
    const getAgentData = () => {
    agentToEdit = agents.value.filter(agent => agent.attributes.userPointer.id === agentId)
    console.log({agentToEdit})
    setUser(agentToEdit[0])
    };
    getAgentData();
    const userRole = agentToEdit[0].get("userRole")
    const agentStatus = agentToEdit[0].get("agentStatus")
    console.log({userRole})
    console.log({agentStatus})
    form.setValues({
      userRole:userRole,
      agentStatus:agentStatus
    })
  }, [agents.value]);

  //console.log({user})

  
  const form = useForm({
    initialValues: {
      userRole:"",
      agentStatus:""
    },

    validate: {
     // email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      // password: (val) =>
      //   val.length <= 6
      //     ? "Password should include at least 6 characters"
      //     : null,
    },
  });

  const handleSubmit = async (values) => {
     setLoading(true);
     try {
values.agentId = agentId
      const editAgent =await Parse.Cloud.run("editAgentRole" ,values)
      setLoading(false);
     // form.reset();
      notifications.show({
        title: "Agent Edited Successfully",
      });
      console.log({editAgent});
    } catch (error) {
      setLoading(false);
      notifications.show({
        title: "Error",
        message: `Error! ${error.message} 🤥`,
        color: "red",
      });
      return false;
  };
}
  const editingAgentRole = userData.value?.userRole
  let roleOptions =[]
  if(["Agency","SuperAdmin","SubAdmin"].includes(editingAgentRole)){
     roleOptions=["Admin","Moderator","SeniorAgent" ,"Agent",]
  }else if(editingAgentRole==="Admin"){
    options=["Moderator","SeniorAgent" ,"Agent",]
  } else if(editingAgentRole==="Moderator"){
    roleOptions=["Agent",]
  }else {
    roleOptions=[]
  }

  const statusOptions = ["active", "inactive"]
  return (
    <>
      <Title my={30} order={1} weight={700} ta="center" c="blue.4">Edit Agent</Title>
{user &&
         <>
      <Paper w="90%" maw={700} mx="auto" radius="md" p="xl" withBorder>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
         
         <Stack>
         <Select
              required
              m={5}
              data={roleOptions}
              display="inline-block"
              {...form.getInputProps("userRole")}
              label="Agent Role"
              placeholder="Agent Role"
              aria-label="pick Agent Role"
              radius="md"
              {...form.getInputProps("userRole")}
            />
              <Select
              required
              m={5}
              data={statusOptions}
              display="inline-block"
              {...form.getInputProps("agentStatus")}
              label="Agent Status"
              placeholder="Agent Status"
              aria-label="pick Agent Status"
              radius="md"
              {...form.getInputProps("agentStatus")}
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Button type="submit" radius="xl" loading={loading}>
              Update User Data
            </Button>
          </Group>
        
         
        </form>
      </Paper>

    </> }
    </>
  );
}
