Parse.Cloud.define(
  "addAgency",
  async (req, res) => {
    const values = req.params;
    let agencyQuery = new Parse.Query("Agency");
    agencyQuery.equalTo("agencyName", values.agencyName);
    let agencyQueryResult = await agencyQuery.first({
      useMasterKey: true,
    });
    
    // console.log(values);

    // let parseFile = values.profilePic;

    //     if (values?.profilePic) {
    //         console.log("values.profilePic")
    //       console.log(values.profilePic)

    //       parseFile = new Parse.File("img.jpeg", values.profilePic )
    //     }
    // console.log("parseFile")
    // console.log(parseFile)
    try {
      if(agencyQueryResult)throw new Error("Agency Name Already Exists")
      let createdUser = await Parse.User.signUp(values.email, values.password, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,

        userRole: "Agency",
        // "profilePicUrl":
        // values.profilePic?._url,
        //  "agencyPointer": agencyProfile.toPointer(),
      });
      console.log({ createdUser });

   
      //  const ProfileRoleQuery = new Parse.Query(Parse.Role);
      // ProfileRoleQuery.equalTo("name", "ProfileAccess");
      // const profileRole =await ProfileRoleQuery.first({
      //   useMasterKey: true,
      // });
      // console.log({profileRole});
      // profileRole.getUsers().add(createdUser);
      // const updateProfileRole = await profileRole.save(null, {
      //   useMasterKey: true,
      // });
      // console.log({ updateProfileRole });

      // const agencyModeratorName = `${values.agencyName.replace(
      //   /\s/g,
      //   ""
      // )}Moderator`;

      // let roleACL = new Parse.ACL();
      // roleACL.setRoleWriteAccess("SuperAdmin", true);
      // roleACL.setRoleWriteAccess("SubAdmin", true);
      // roleACL.setWriteAccess(createdUser.id, true);
      // roleACL.setRoleReadAccess("SuperAdmin", true);
      // roleACL.setRoleReadAccess("SubAdmin", true);
      // roleACL.setReadAccess(createdUser.id, true);
      // let moderatorRole = new Parse.Role(agencyModeratorName, roleACL);
      // // addModeratorRole.add(req.user);
      // const addModeratorRole = await moderatorRole.save(null, {
      //   useMasterKey: true,
      // });
      // console.log({ addModeratorRole });
      // addModeratorRole.getUsers().add(createdUser);
      // const updateModeratorRoll = await addModeratorRole.save(null, {
      //   useMasterKey: true,
      // });

      // console.log({ updateModeratorRoll });
      // const agencyRoleQuery = new Parse.Query(Parse.Role);
      // agencyRoleQuery.equalTo("name", "Agency");
      // const agencyRole =await agencyRoleQuery.first({
      //   useMasterKey: true,
      // });
      // console.log("agencyRole");
      // console.log({ agencyRole });
      // agencyRole.getUsers().add(createdUser);
      // const updateAgencyRoll = await agencyRole.save(null, {
      //   useMasterKey: true,
      // });
      // console.log({ updateAgencyRoll });
      //  const agencyRoleName = `${values.agencyName.replace(/\s/g, '')}Agency`

      // let role = new Parse.Role(agencyRoleName, roleACL)
      // const savedRole = await role.save()
      // console.log({savedRole})
      // savedRole.getUsers().add(Parse.User.current())
      //  const updateRoll = await savedRole.save()
      //  console.log({updateRoll})
      // roleACL.setRoleWriteAccess(agencyRoleName, true)

      let agencyProfile = new Parse.Object("Agency");
      agencyProfile.set("agencyName", values.agencyName);
      // agencyProfile.set("internalRole", "Agency");
      // agencyProfile.set("firstName", values.firstName);
      // agencyProfile.set("lastName", values.lastName);
      // agencyProfile.set("email", values.email);
      // agencyProfile.set("bio", values.bio);
      // agencyProfile.set("bioAr", values.bioAr);
      // agencyProfile.set("phoneNumber", values.phoneNumber);
      agencyProfile.set("userRole", "Agency");
    //  agencyProfile.set("agentStatus", values.agencyStatus);
      agencyProfile.set("credits", 0);
      // agencyProfile.set("agencyRoleName", role);
      // agencyProfile.set("moderatorRoleName", agencyModeratorName);
      //  if (values.profilePic) agencyProfile.set("profilePicObj", values.profilePic);
        agencyProfile.set("userPointer", createdUser.toPointer());
        agencyProfile.set("creator", req.user);
        agencyProfile.set("creatorEmail", req.user.get("email"));
      let agencyACL = new Parse.ACL();
    //  agencyACL.setPublicReadAccess(true);
      agencyACL.setRoleReadAccess("SuperAdmin", true);
      agencyACL.setRoleReadAccess("SubAdmin", true);
      agencyACL.setRoleWriteAccess("SuperAdmin", true);
      agencyACL.setRoleWriteAccess("SubAdmin", true);
      agencyProfile.setACL(agencyACL);
      let saveAgency = await agencyProfile.save(null, { useMasterKey: true });
      console.log({ saveAgency });

      //  await Parse.User.become(createdUser.getSessionToken())

      // createdUser.set("email", values.email);
      createdUser.set("bio", values.bio);
      createdUser.set("bioAr", values.bioAr);
      createdUser.set("userRole", "Agency");
      createdUser.set("accountStatus", values.accountStatus);
      createdUser.set("phoneNumber", values.phoneNumber);
    //  createdUser.set("moderatorRoleName", agencyModeratorName);

      //  createdUser.set("profilePic", parseFile);
      if (values.profilePic) {
        createdUser.set("profilePic", values.profilePic);
        createdUser.set("profilePicUrl", values.profilePic._url);
      }
      //  agencyProfile.set("profilePic", parseFile);
      createdUser.set("agencyName", values.agencyName);
      
      createdUser.set("agencyPointer", saveAgency.toPointer());
      let userACL = new Parse.ACL();
      userACL.setPublicReadAccess(true);
    //  userACL.setWriteAccess(createdUser.id, true);
      userACL.setRoleWriteAccess("SuperAdmin", true);
      userACL.setRoleWriteAccess("SubAdmin", true);
      userACL.setReadAccess(createdUser.id, true);
      userACL.setRoleReadAccess("SuperAdmin", true);
      userACL.setRoleReadAccess("SubAdmin", true);
      createdUser.setACL(userACL);
      const updateAgency = await createdUser.save(null, { useMasterKey: true });
      console.log({ updateAgency });
      return updateAgency;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      throw new Error(err.message);
    }
  },
  { requireAnyUserRoles: ["SuperAdmin", "SubAdmin"] }
);
