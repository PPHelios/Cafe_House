Parse.Cloud.define("addAgent", async (req, res) => {
  const user = await req.user.fetchWithInclude(["agencyPointer"], {
    useMasterKey: true,
  });
  const userRole = user.get("agencyPointer").get("userRole");
  const agency = req.user.get("agencyPointer");
  const agencyName = req.user.get("agencyPointer").get("agencyName");
  //  if(userRole !== "Agency" || userRole !== "Moderator" || userRole !== "AdCreator"){
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
    profilePic,
  } = req.params;
  // console.log(req.params);
  // console.log({ userRole });
  // console.log({ agency });
  // console.log({ role });
  try {
    if (
      userRole === "Agency" &&
      !["Moderator", "AdCreator", "SeniorAgent", "Agent"].includes(role)
    ) {
      throw new Error("Unauthorized1");
    } else if (
      userRole === "Moderator" &&
      !["AdCreator", "SeniorAgent", "Agent"].includes(role)
    ) {
      throw new Error("Unauthorized2");
    } else if (userRole === "AdCreator" && role !== "Agent") {
      throw new Error("Unauthorized3");
    } else {
      let createdUser = await Parse.User.signUp(email, password, {
        firstName:firstName,
        lastName:lastName,
        firstNameAr:firstNameAr,
        lastNameAr:lastNameAr,
        email:email,
        bio:bio,
        bioAr:bioAr,
        phoneNumber:phoneNumber,
      },{useMasterKey:true});
      console.log({ createdUser });

      const newAgent = new Parse.Object("Agent");
      newAgent.set("agencyName", agencyName);
      newAgent.set("userRole", role);
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
      createdUser.set("agentPointer", saveAgent.toPointer());
      createdUser.set("agencyPointer", agency.toPointer());
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
      return (updateAgency);
    }

  
  } catch (err) {
    throw new Error(err.message);
  }
});
