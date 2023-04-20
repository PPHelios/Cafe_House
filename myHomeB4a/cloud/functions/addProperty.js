parse.Cloud.define("createProperty", async(req, res)=>{
    const {adName,adNameAr,description} = req.params;
    const agency = req.user.get("profile").agency
    const internalRole = req.user.get("profile").internalRole
const creator = req.user
const creatorEmail = req.user.get("email")
try{
    if (internalRole === "Agency" || internalRole  === "Moderator" ||internalRole  === "AdCreator"){
      const newProperty = new Parse.Object("Property")
      newProperty.set("adName", adName);
      
      
      newProperty.set("creator", creator);
      newProperty.set("creatorEmail", creatorEmail);
      
      const saveProperty = newProperty.save(null, {useMasterKey:true})
      res.send(saveAgent)
      
    }  else {
      throw new Error("Unauthorized")
    }
    } catch(err){
      throw new Error(err.message)
    }
    
})