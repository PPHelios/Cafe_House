Parse.Cloud.define("queryAgentsInAgency", async (req, res) => {
  let user,
    userRole,
    agency,
    agencyName = null;
  try {
    
    if (req.user.get("userRole") === "Agency" || req.user.get("userRole") === "Admin") {
      // user =  req.user
      // userRole = user.get("userRole");
      //const creator = user.get("creator");
     
        agency = user.get("agencyPointer");
        let agentsQuery = new Parse.Query("Agent");
        agentsQuery.equalTo("agencyPointer", agency);
        agentsQuery.include("userPointer")
        let agentsQueryResult = await agentsQuery.find({
          useMasterKey: true,
        });
        console.log(agentsQueryResult);
        return agentsQueryResult;
      
    } else if (req.user.get("userRole") === "Moderator") {
         user =  req.user
        // console.log({user});
        // userRole = user.get("userRole");
        // console.log({userRole});
        // agency = user.get("agencyPointer");
          let agentsQuery = new Parse.Query("Agent");
         // agentsQuery.equalTo("agencyPointer", agency);
          agentsQuery.equalTo("creator", user);
          agentsQuery.include("userPointer")
          let agentsQueryResult = await agentsQuery.find({ useMasterKey: true });
          console.log(agentsQueryResult);
          return agentsQueryResult;
}else if (req.user.get("userRole") === "Agent"){
return []
} else {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});