Parse.Cloud.define("queryAgentsInAgency", async (req, res) => {
  let user = req.user;
  let agency = user.get("agencyPointer");
  let userRole = user.get("userRole");
  // const  queryAgentsInAgency = req.user
  // console.log("queryAgentsInAgency");
  // console.log(queryAgentsInAgency);
  try {
    if (userRole === "SuperAdmin" || userRole === "SubAdmin") {
      let agentsQuery = new Parse.Query("Agent");
      agentsQuery.include("userPointer");
      let agentsQueryResult = await agentsQuery.find({
        useMasterKey: true,
      });
      //  console.log(agentsQueryResult);
      return agentsQueryResult;
    } else if (userRole === "Agency" || userRole === "Admin") {
      // userRole = user.get("userRole");
      //const creator = user.get("creator");

      //  console.log({agency});
      let agentsQuery = new Parse.Query("Agent");
      agentsQuery.equalTo("agencyPointer", agency);
      agentsQuery.include("userPointer");
      let agentsQueryResult = await agentsQuery.find({
        useMasterKey: true,
      });
      //  console.log(agentsQueryResult);
      return agentsQueryResult;
    } else if (userRole === "Moderator") {
      // console.log({user});
      // userRole = user.get("userRole");
      // console.log({userRole});
      // agency = user.get("agencyPointer");
      let agentsQuery = new Parse.Query("Agent");
      // agentsQuery.equalTo("agencyPointer", agency);
      agentsQuery.equalTo("creator", user);
      agentsQuery.include("userPointer");
      let agentsQueryResult = await agentsQuery.find({ useMasterKey: true });
      //  console.log(agentsQueryResult);
      return agentsQueryResult;
    } else if (userRole === "Agent") {
      return [];
    } else {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});
