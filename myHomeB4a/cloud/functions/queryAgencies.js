Parse.Cloud.define("queryAgencies", async (req, res) => {
  let user = req.user;
  let userRole = user.get("userRole");

  try {
    if (userRole === "SuperAdmin" || userRole === "SubAdmin") {
      let agencyQuery = new Parse.Query("Agency");
      agencyQuery.include("userPointer");
      let agencyQueryResult = await agencyQuery.find({
        useMasterKey: true,
      });
      //  console.log(agencyQueryResult);
      return agencyQueryResult;
    } else {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});
