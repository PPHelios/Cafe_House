import {  adminSideBarState } from "../../store/appState";

function Settings() {
  adminSideBarState.value=6
  return (
    <div>Settings</div>
  )
}

export default Settings