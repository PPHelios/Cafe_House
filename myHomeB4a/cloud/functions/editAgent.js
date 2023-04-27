Parse.Cloud.define(
  "editAgentRole",
  async (req, res) => {
    console.log(req.params);
    try {
      const { userRole, accountStatus, agentId } = req.params;

      const agentToEditQuery = new Parse.Query(Parse.User);
      const agentToEdit = await agentToEditQuery.get(agentId, {
        useMasterKey: true,
      });
      agentToEdit.set("userRole", userRole);
      agentToEdit.set("accountStatus", accountStatus);
      const updateUser = await agentToEdit.save(null, { useMasterKey: true });
      //  console.log({updateUser});
      return updateUser;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  {}
);

Parse.Cloud.define("editUserProfile", async (req, res) => {
  let parseFile = null;
  const {
    firstName,
    lastName,
    firstNameAr,
    lastNameAr,
    email,
    currentPassword,
    newPassword,
    bio,
    bioAr,
    phoneNumber,
    profilePic,
  } = req.params;
const editData = req.params
console.log({editData});
  try {
    const userQuery = new Parse.Query(Parse.User);
    const userToUpdate = await userQuery.get(req.user.id);
    console.log({ userToUpdate });
    if (newPassword !== undefined) {
      const verifyPassword = await userToUpdate.verifyPassword(
        currentPassword,
        { useMasterKey: true }
      );
      if (!verifyPassword) {
        throw new Error("Incorrect Password");
      } else {
        console.log("change password");
         userToUpdate.setPassword(newPassword);
      }
    }

    if (email !== req.user.get("email")) {
      console.log("change email");
      userToUpdate.setEmail(email);
      userToUpdate.setUsername(email);
    }
    userToUpdate.set("firstName", firstName);
    userToUpdate.set("lastName", lastName);
    userToUpdate.set("firstNameAr", firstNameAr);
    userToUpdate.set("lastNameAr", lastNameAr);
    userToUpdate.set("bio", bio);
    userToUpdate.set("bioAr", bioAr);
    userToUpdate.set("phoneNumber", phoneNumber);
    if (profilePic) {
      userToUpdate.set("profilePic", profilePic);
      userToUpdate.set("profilePicUrl", profilePic._url);
    }

    const updateUser = await userToUpdate.save(null, { useMasterKey: true });
    console.log({ updateUser });
    return updateUser;
  } catch (err) {
    throw new Error(err.message);
  }
});
