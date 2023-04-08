import {  adminSideBarState } from "../../store/appState";

function Account() {
  adminSideBarState.value=4
  return (
    <div>Account</div>
  )
}

export default Account