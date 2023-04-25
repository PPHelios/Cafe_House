Parse.Cloud.define("addAgent", async (req, res) => {
  let user,
    userRole,
    agency,
    agencyName = null;

  if (["Agency","Admin", "Moderator"].includes(req.user.get("userRole"))) {
 
    user =req.user

    userRole = user.get("userRole");

    agency = user.get("agencyPointer");

    agencyName = user.get("agencyName");
  }  else {
    throw new Error("Unauthorized");
  }
  //  if(userRole !== "Agency" || userRole !== "Admin" || userRole !== "Moderator"){
  //    throw new Error("Unauthorized");
  //  }
  let parseFile = null;
  const {
    firstName,
    lastName,
    firstNameAr,
    lastNameAr,
    email,
    password,
    bio,
    bioAr,
    phoneNumber,
    role,
    agentStatus,
    profilePic,
  } = req.params;
  // console.log(req.params);
  // console.log({ userRole });
  // console.log({ agency });
  // console.log({ role });
  try {
    if (
      userRole === "Agency" &&
      !["Admin", "Moderator", "SeniorAgent", "Agent"].includes(role)
    ) {
      throw new Error("Unauthorized");
    } else if (
      userRole === "Admin" &&
      !["Moderator", "SeniorAgent", "Agent"].includes(role)
    ) {
      throw new Error("Unauthorized");
    } else if (userRole === "Moderator" && role !== "Agent" ) {
      throw new Error("Unauthorized");
    } else {
      let createdUser = await Parse.User.signUp(
        email,
        password,
        {
          firstName: firstName,
          lastName: lastName,
          firstNameAr: firstNameAr,
          lastNameAr: lastNameAr,
          email: email,
          bio: bio,
          bioAr: bioAr,
          phoneNumber: phoneNumber,
          
        },
        { useMasterKey: true }
      );
      console.log({ createdUser });

      const newAgent = new Parse.Object("Agent");
      newAgent.set("agencyName", agencyName);
    //  newAgent.set("userRole", role);
      newAgent.set("agentStatus", agentStatus);
      newAgent.set("creator", req.user);
      newAgent.set("creatorEmail", req.user.get("email"));
      newAgent.set("userPointer", createdUser.toPointer());
      newAgent.set("agencyPointer", agency.toPointer());
      const saveAgent = await newAgent.save(null, { useMasterKey: true });
      console.log({ saveAgent });
      if (profilePic) {
        createdUser.set("profilePic", profilePic);
        createdUser.set("profilePicUrl", profilePic._url);
      }
      createdUser.set("agencyName", agencyName);
      createdUser.set("userRole", role);
      createdUser.set("agentStatus", agentStatus);

      createdUser.set("agentPointer", saveAgent.toPointer());
      createdUser.set("agencyPointer", agency.toPointer());
      let userACL = new Parse.ACL();
      userACL.setPublicReadAccess(true);
    //  userACL.setWriteAccess(createdUser.id, true);
      userACL.setRoleWriteAccess("SuperAdmin", true);
      userACL.setRoleWriteAccess("SubAdmin", true);
      userACL.setReadAccess(createdUser.id, true);
      userACL.setRoleReadAccess("SuperAdmin", true);
      userACL.setRoleReadAccess("SubAdmin", true);
      createdUser.setACL(userACL);
      const updateAgent = await createdUser.save(null, { useMasterKey: true });
      console.log({ updateAgent });
      return updateAgent;
    }
  } catch (err) {
    throw new Error(err.message);
  }
});
