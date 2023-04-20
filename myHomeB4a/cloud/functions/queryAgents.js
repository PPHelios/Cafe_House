 Parse.Cloud.define("queryAgents", async(req, res)=>{
    
    const agency = req.user.get("Agent").agency
    const internalRole = req.user.get("Agent").internalRole
const creator = req.user.get("Agent").creator
const creatorEmail = req.user.get("email")
try{
    if (internalRole === "Agency" || internalRole  === "Moderator"){
      const agentsQuery = new Parse.Query("Agent")
      agentsQuery.equalTo("agency", agency);
      
      const findAgents = agentsQuery.find( {useMasterKey:true})
      res.send(findAgents)
      
    }  else if (internalRole === "adCreator"){
      const agentsQuery = new Parse.Query("Agent")
      agentsQuery.equalTo("agency", agency);
      agentsQuery.equalTo("creator", req.user);
      const findAgents = agentsQuery.find( {useMasterKey:true})
      res.send(findAgents)
      
    } else {
      throw new Error("Unauthorized")
    }
    } catch(err){
      throw new Error(err.message)
    }
    
})