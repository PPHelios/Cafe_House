Parse.Cloud.define("addPropertyView", async (req, res) => {
  console.log(req.params);
  const propertyId = req.params.id;
  const agency =req.params.agency
  const creatorEmail =req.params.creator
 //  console.log(req.params)
  try {

    let agencyQuery = new Parse.Query("Property");
    let agencyQueryResult = await agencyQuery.get(propertyId, {
      useMasterKey: true,
    });
    //console.log(agencyQueryResult);
    //  await agencyQuery.first({
    //    useMasterKey: true,
    //  });
    agencyQueryResult.increment("userViews");
   await agencyQueryResult.save(null, {
      useMasterKey: true,
    });
    const newUserView = new Parse.Object("UserView")
    newUserView.set("propertyId",propertyId)
    newUserView.set("user",req.user)
    newUserView.set("agencyName",agency)
    newUserView.set("creatorEmail",creatorEmail)
    await newUserView.save(null, {
      useMasterKey: true,
    });
 return true
  } catch (err) {
    return err.message;
  }
});

Parse.Cloud.define("addPropertyAction", async (req, res) => {
 // console.log(req.params);
  const propertyId = req.params.id;
  const agency =req.params.agency
  const creatorEmail =req.params.creator
  // console.log(req.params)
  try {
    let agencyQuery = new Parse.Query("Property");

    let agencyQueryResult = await agencyQuery.get(propertyId, {
      useMasterKey: true,
    });
    console.log(agencyQueryResult);
    //  await agencyQuery.first({
    //    useMasterKey: true,
    //  });
    agencyQueryResult.increment("userActions");
     await agencyQueryResult.save(null, {
      useMasterKey: true,
    });
    const newUserAction = new Parse.Object("UserAction")
    newUserAction.set("user",req.user)
    newUserAction.set("propertyId",propertyId)
    newUserAction.set("agencyName",agency)
    newUserAction.set("creatorEmail",creatorEmail)
    await newUserAction.save(null, {
      useMasterKey: true,
    });
    return true
  } catch (err) {
    throw new Error(err.message);
  }
});
