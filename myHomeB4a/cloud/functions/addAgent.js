Parse.Cloud.define("addAgent", async (req, res) => {
  const user =await req.user.fetchWithInclude(["agencyPointer"],{useMasterKey: true })
  const userRole = user.get("agencyPointer").get("userRole");
   const agency = req.user.get("agencyPointer").get("agencyName");
  //  if(userRole !== "Agency" || userRole !== "Moderator" || userRole !== "AdCreator"){
  //    throw new Error("Unauthorized");
  //  }
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
    profilePic,
  } = req.params;
 // console.log(firstName);
 
  try {
    if (
      (userRole === "Agency" && role !== "Moderator") ||
      role !== "AdCreator" ||
      role !== "Agent"
    ) {
      throw new Error("Unauthorized");
    } else if (
      (userRole === "Moderator" && role !== "AdCreator") ||
      role !== "Agent"
    ) {
      throw new Error("Unauthorized");
    } else if (userRole === "AdCreator" && role !== "Agent") {
      throw new Error("Unauthorized");
    } else {
      let createdUser = await Parse.User.signUp(email, password, {
        firstName,
        lastName,
        firstNameAr,
        lastNameAr,
        email,
        bio,
        bioAr,
        phoneNumber,
        userRole: role,
      
      });
      console.log({ createdUser });

      const newAgent = new Parse.Object("Agent");
      newAgent.set("agency", agency);
      newAgent.set("userRole", role);
      newAgent.set("creator", req.user);
      newAgent.set("creatorEmail", req.user.get("email"));
      createdUser.set("userPointer", createdUser.toPointer());
      const saveAgent = newAgent.save(null, { useMasterKey: true });

      if (profilePic) {
        createdUser.set("profilePic", profilePic);
        createdUser.set("profilePicUrl", profilePic._url);
      }
      
      createdUser.set("agentPointer", saveAgent.toPointer());
      let userACL = new Parse.ACL();
      userACL.setPublicReadAccess(true);
      userACL.setWriteAccess(createdUser.id, true);
      userACL.setRoleWriteAccess("SuperAdmin", true);
      userACL.setRoleWriteAccess("SubAdmin", true);
      userACL.setReadAccess(createdUser.id, true);
      userACL.setRoleReadAccess("SuperAdmin", true);
      userACL.setRoleReadAccess("SubAdmin", true);
      createdUser.setACL(userACL);
      const updateAgency = await createdUser.save(null, { useMasterKey: true });
      console.log({ updateAgency });
     res.send(updateAgency);
    }
    
    return 
  } catch (err) {
    throw new Error(err.message);
  }
});
