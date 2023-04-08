import { useState } from 'preact/hooks'; 
import { Outlet } from "react-router-dom";
import  AdminSideBar  from "../components/AdminSideBar/AdminSideBar";
import { Box, Flex } from "@mantine/core";
function AdminPanel() {
  return(
     <>
    <Flex  justify="flex-start" gap={20}>
        <AdminSideBar />
      <Box sx={{flexGrow:1}}>
       <Outlet />
      </Box>
     
    
    </Flex>
   
  </>
  )
 
}
export default AdminPanel;
