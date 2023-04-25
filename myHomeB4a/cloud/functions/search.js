Parse.Cloud.define("mainSearch", async (req, res) => {
  const values = req.params;
  console.log({req})
  try {
    let parseQuery = new Parse.Query("Property");
    parseQuery.containedIn("locationTags", values.searchValue);
    parseQuery.contains("listingType", values.listingType);
    parseQuery.contains("propertyType", values.propertyType);
    parseQuery.greaterThan("room", values.propertyRooms - 1);
    parseQuery.greaterThan("bath", values.propertyBaths - 1);
    parseQuery.greaterThan("area", values.propertyArea - 1);
    parseQuery.greaterThan("price", +values.propertyminPrice - 1);
    parseQuery.lessThan("price", +values.propertymaxPrice + 1);
    parseQuery.include("agencyPointer").include("userPointer");
    parseQuery.include("creator");
    let queryResults = await parseQuery.find({sessionToken: req.user.attributes.sessionToken,  useMasterKey: true });
    const shuffledResults = queryResults.sort(function () {
      return Math.random() - 0.5;
    });
    return {data:shuffledResults,user:req.user};
  } catch (err) {
    throw new Error(err.message);
  }
});



// Parse.Cloud.define("fixTodoItem", async (req, res) => {
//   console.log("fixTodoItem")
//   const fixTodoItemReq = req
//   console.log({fixTodoItemReq})
//   return "hiiiiiiiiiiii"
//   })



// Parse.Cloud.afterFind('Property', async (request) => {
//   console.log("propafterfind")
//   console.log({request})
//   Parse.Cloud.run("fixTodoItem", {todoId: "jjj"})
//   });
// })

Parse.Cloud.beforeFind('Property', async (request) => {
 // const user =request?.user?.getSessionToken()
  console.log(request)
})
