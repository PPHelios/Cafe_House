Parse.Cloud.define("addPropertyView",async (req, res) => {
  const property= req.params.id
 // console.log(req.params)
  try{
   let agencyQuery = new Parse.Query("Property");
  
   let agencyQueryResult = await  agencyQuery.get(property, {
        useMasterKey: true,
      });
    console.log(agencyQueryResult)
  //  await agencyQuery.first({
  //    useMasterKey: true,
  //  });
   agencyQueryResult.increment("userViews")
   return await agencyQueryResult.save(null, {
     useMasterKey: true,
   }
   )
  }catch(err){
    return err.message
  }
})

Parse.Cloud.define("addPropertyAction",async (req, res) => {
  const property= req.params.id
 // console.log(req.params)
  try{
   let agencyQuery = new Parse.Query("Property");
  
   let agencyQueryResult = await  agencyQuery.get(property, {
        useMasterKey: true,
      });
    console.log(agencyQueryResult)
  //  await agencyQuery.first({
  //    useMasterKey: true,
  //  });
   agencyQueryResult.increment("userActions")
   return await agencyQueryResult.save(null, {
     useMasterKey: true,
   }
   )
  }catch(err){
    return err.message
  }
})