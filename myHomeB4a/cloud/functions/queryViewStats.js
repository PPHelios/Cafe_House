Parse.Cloud.define("queryViewStats", async (req, res) => {
  let user,
    userRole,
    agency,
    agencyName = null;
    console.log(req.params);
  try {
    
    if (req.user.get("userRole") === "Agency" || req.user.get("userRole") === "Admin") {
     
        agencyName = req.user.get("agencyPointer").get("agencyName");
        let actionsQuery = new Parse.Query("UserAction");
        actionsQuery.equalTo("agencyName", agencyName);
        let actionsQueryResult = await actionsQuery.count({
          useMasterKey: true,
        });
        let viewsQuery = new Parse.Query("UserView");
        viewsQuery.equalTo("agencyName", agencyName);
        let viewsQueryResult = await viewsQuery.count({
          useMasterKey: true,
        });
        //console.log(agentsQueryResult);
        const queryResults={
          views: viewsQueryResult,
          actions: actionsQueryResult,
         }
         return queryResults
      
    } else if (req.user.get("userRole") === "Moderator") {
         email =  req.user.get("email")
         agencyName = req.user.get("agencyPointer").get("agencyName");
         let actionsQuery = new Parse.Query("UserAction");
         actionsQuery.equalTo("creatorEmail", email);
         let actionsQueryResult = await actionsQuery.count({
           useMasterKey: true,
         });
         let viewsQuery = new Parse.Query("UserView");
         viewsQuery.equalTo("creatorEmail", email);
         let viewsQueryResult = await viewsQuery.count({
           useMasterKey: true,
         });
         //console.log(agentsQueryResult);
         const queryResults={
          views: viewsQueryResult,
          actions: actionsQueryResult,
         }
         return queryResults
       
}else if (req.user.get("userRole") === "Agent"){
return []
} else {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});