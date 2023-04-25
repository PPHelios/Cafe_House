Parse.Cloud.define("queryPropertiesInAgency", async (req, res) => {
  
    let user = req.user;
    let agency = user.get("agencyPointer");
  let userRole = user.get("userRole");

  //   const  queryPropertiesInAgency = req.user
  //  console.log({userRole});
  try {
    if (userRole === "SuperAdmin" || userRole === "SubAdmin") {
      let propertiesQuery = new Parse.Query("Property");
      let propertiesQueryResult = await propertiesQuery.find({
        useMasterKey: true,
      });
      //  console.log(propertiesQueryResult);
      return propertiesQueryResult;
    } else if (["Agency", "Admin", "SeniorAgent"].includes(userRole)) {
      
      let propertiesQuery = new Parse.Query("Property");
      propertiesQuery.equalTo("agencyPointer", agency);
      let propertiesQueryResult = await propertiesQuery.find({
        useMasterKey: true,
      });
      //  console.log(propertiesQueryResult);
      return propertiesQueryResult;
    } else if (userRole === "Moderator") {

      console.log({ user });
      // userRole = user.get("userRole");
      // console.log({userRole});
      //agency = user.get("agencyPointer");
      // const creator = user.get("creator");

      let propertiesQuery = new Parse.Query("Property");
      //  propertiesQuery.equalTo("agencyPointer", agency);
      propertiesQuery.equalTo("creator", user);
      let propertiesQueryResult = await propertiesQuery.find({
        useMasterKey: true,
      });
      //  console.log(propertiesQueryResult);
      return propertiesQueryResult;
    } else if (userRole === "Agent") {
      user = await req.user.fetchWithInclude(["agentPointer"], {
        useMasterKey: true,
      });
      //  console.log({ user });
      // userRole = user.get("userRole");
      //  console.log({ userRole });
      //agency = user.get("agencyPointer");
      //  console.log("{creator}");
      const creator = user.get("agentPointer").get("creator");
      //  console.log({ creator });
      let propertiesQuery = new Parse.Query("Property");
      //  propertiesQuery.equalTo("agencyPointer", agency);
      propertiesQuery.equalTo("creator", creator);
      let propertiesQueryResult = await propertiesQuery.find({
        useMasterKey: true,
      });
      //  console.log(propertiesQueryResult);
      return propertiesQueryResult;
    } else {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});
