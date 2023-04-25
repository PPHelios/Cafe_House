Parse.Cloud.define("queryViewStats", async (req, res) => {
  let user = req.user;
  let agencyName = req.user.get("agencyName");
  let userRole = user.get("userRole");
  let email = req.user.get("email");
  //  console.log(req.params);
  try {
    if (userRole === "SuperAdmin" || userRole === "SubAdmin") {
      let actionsQueryResult = await actionsQuery.count({
        useMasterKey: true,
      });
      let viewsQuery = new Parse.Query("UserView");
      let viewsQueryResult = await viewsQuery.count({
        useMasterKey: true,
      });
      //console.log(agentsQueryResult);
      const queryResults = {
        views: viewsQueryResult,
        actions: actionsQueryResult,
      };
      return queryResults;
    } else if (userRole === "Agency" || userRole === "Admin") {
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
      const queryResults = {
        views: viewsQueryResult,
        actions: actionsQueryResult,
      };
      return queryResults;
    } else if (userRole === "Moderator") {
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
      const queryResults = {
        views: viewsQueryResult,
        actions: actionsQueryResult,
      };
      return queryResults;
    } else if (userRole === "Agent") {
      return [];
    } else {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});
