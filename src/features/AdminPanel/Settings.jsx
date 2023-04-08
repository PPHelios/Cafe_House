import {  adminSideBarState } from "../../store/appState";

function Settings() {
  adminSideBarState.value=5
  return (
    <div>Settings</div>
  )
}

export default Settings