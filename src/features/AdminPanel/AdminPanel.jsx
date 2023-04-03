import { Outlet } from "react-router-dom";
import { AdminSideBar } from "../../components/AdminSideBar/AdminSideBar";
import { Box } from "@mantine/core";
function AdminPanel() {
  <>
    <Box mt={130}>
      <p>admin panel</p>
    </Box>
    <Outlet />
  </>;
}
export default AdminPanel;
