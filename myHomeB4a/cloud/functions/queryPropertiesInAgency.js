Parse.Cloud.define("queryPropertiesInAgency", async (req, res) => {
  let user,
    userRole,
    agency,
    agencyName = null;
   
    console.log(req.user.get("userRole"));
  try {
    if (["Agency","Admin", "SeniorAgent"].includes(userRole)   ) {
      user =  req.user
      userRole = user.get("userRole");

     
        agency = user.get("agencyPointer");
        let propertiesQuery = new Parse.Query("Property");
        propertiesQuery.equalTo("agencyPointer", agency);
        let propertiesQueryResult = await propertiesQuery.find({
          useMasterKey: true,
        });
        console.log(propertiesQueryResult);
        return propertiesQueryResult;
      
    } else if (req.user.get("userRole") === "Moderator") {
        user =  req.user
        console.log({user});
        // userRole = user.get("userRole");
        // console.log({userRole});
        //agency = user.get("agencyPointer");
       // const creator = user.get("creator");
       
          let propertiesQuery = new Parse.Query("Property");
        //  propertiesQuery.equalTo("agencyPointer", agency);
          propertiesQuery.equalTo("creator", user);
          let propertiesQueryResult = await propertiesQuery.find({ useMasterKey: true });
          console.log(propertiesQueryResult);
          return propertiesQueryResult;
        
}else if (req.user.get("userRole") === "Agent") {
 
  user = await req.user.fetchWithInclude(["agentPointer"], {
    useMasterKey: true,
  });
  console.log({user});
  userRole = user.get("userRole");
  console.log({userRole});
  //agency = user.get("agencyPointer");
  console.log("{creator}");
  const creator = user.get("agentPointer").get("creator");
  console.log({creator});
    let propertiesQuery = new Parse.Query("Property");
  //  propertiesQuery.equalTo("agencyPointer", agency);
    propertiesQuery.equalTo("creator", creator);
    let propertiesQueryResult = await propertiesQuery.find({ useMasterKey: true });
    console.log(propertiesQueryResult);
    return propertiesQueryResult;
  
} else {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});