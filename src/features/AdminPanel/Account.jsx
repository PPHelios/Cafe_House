import {  adminSideBarState } from "../../store/appState";

function Account() {
  adminSideBarState.value=3
  return (
    <div>Account</div>
  )
}

export default Account