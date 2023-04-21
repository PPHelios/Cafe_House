Parse.Cloud.define("addProperty", async (req, res) => { 

const user,userRole,agency,agencyName = null
if (req.user.get("userRole") === "Agency"){
     user = await req.user.fetchWithInclude(["agencyPointer"], { 
     useMasterKey: true, 
   }); 
    userRole = user.get("agencyPointer").get("userRole"); 
    agency = user.get("agencyPointer"); 
    agencyName = user.get("agentPointer").get("agencyName"); 
} else if {
    (["Moderator", "AdCreator"].include(req.user.get("userRole") ){
     user = await req.user.fetchWithInclude(["agentPointer"], { 
     useMasterKey: true, 
   }); 
    userRole = user.get("agentPointer").get("userRole"); 
    agency = user.get("agencyPointer"); 
    agencyName = user.get("agentPointer").get("agencyName");
} else {
    throw new Error("Unauthorized"); 
}
  
   let parseFile = null; 
   const { 
     firstName, 
     lastName, 
     firstNameAr, 
     lastNameAr, 
     email, 
     password, 
     bio, 
     bioAr, 
     phoneNumber, 
     role, 
     profilePic, 
   } = req.params; 
   // console.log(req.params); 
   // console.log({ userRole }); 
   // console.log({ agency }); 
   // console.log({ role }); 
   try { 
            
  
       const newProperty = new Parse.Object("Property"); 
       newProperty.set("adName", adName); 
       newProperty.set("adNameAr", adNameAr); 
       newProperty.set("creator", req.user); 
       newProperty.set("creatorEmail", req.user.get("email")); 
       newProperty.set("userPointer", createdUser.toPointer()); 
       
             
       if (picFiles) { 
const picCount = picFiles. length
for (let i =0 ;i<picCount ;i++){
    newProperty.set(`pic${i}`, picFiles[i]); 
}         
         createdUser.set("picUrls", picUrls); 
       } 
       if (videoFiles) { 
const videoCount = videoFiles. length
for (let i =0 ;i<videoCount ;i++){
    newProperty.set(`video${i}`, videoFiles[i]); 
}         
         createdUser.set("videoUrls", videoUrls); 
       }        let propertyACL = new Parse.ACL(); 
       propertyACL.setPublicReadAccess(true); 
       propertyACL.setWriteAccess(req.user.id, true); 
       propertyACL.setRoleWriteAccess("SuperAdmin", true); 
       propertyACL.setRoleWriteAccess("SubAdmin", true); 
       propertyACL.setReadAccess(req.user.id, true); 
       propertyACL.setRoleReadAccess("SuperAdmin", true); 
       propertyACL.setRoleReadAccess("SubAdmin", true); 
       createdUser.setACL(propertyACL); 
       const saveProperty = await newProperty.save(null, { useMasterKey: true }); 
       console.log({ saveProperty }); 
       return (saveProperty); 
     } 
  
    
   } catch (err) { 
     throw new Error(err.message); 
   }
