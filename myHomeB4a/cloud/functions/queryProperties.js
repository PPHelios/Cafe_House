 Parse.Cloud.define("queryProperties", async(req, res)=>{
    
    const agency = req.user.get("profile").agency
    const internalRole = req.user.get("profile").internalRole
const creator = req.user.get("Agent").creator
const creatorEmail = req.user.get("email")
try{
    if (internalRole === "Agency" || internalRole  === "Moderator" || internalRole  === "SeniorAgent"){
      const propertiesQuery = new Parse.Query("Property")
      propertiesQuery.equalTo("agency", agency);
      
      const findProperties = propertiesQuery.find( {useMasterKey:true})
      res.send(findProperties)
      
    } else if (internalRole === "AdCreator"){
      const propertiesQuery = new Parse.Query("Property")
      propertiesQuery.equalTo("agency", agency)
      propertiesQuery.equalTo("creator", req.user);
      
      const findProperties = propertiesQuery.find( {useMasterKey:true})
      res.send(findProperties)
      
      } else if (internalRole === "Agent"){
      const propertiesQuery = new Parse.Query("Property")
      propertiesQuery.equalTo("agency", agency);
      propertiesQuery.equalTo("creator", creator);
      const findProperties = propertiesQuery.find({useMasterKey:true})
      res.send(findProperties)
      
    } else {
      throw new Error("Unauthorized")
    }
    } catch(err){
      throw new Error(err.message)
    }
    
})