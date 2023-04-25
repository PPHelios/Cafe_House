  
  Parse.Cloud.define("userSignup",async (req, res) => {
    const values =req.params
    try{
  const createdUser = await Parse.User.signUp(
        values.email,
        values.password
      );
      if(createdUser){
         createdUser.set("firstName", values.firstName);
      createdUser.set("lastName", values.lastName);
      createdUser.set("email", values.email);
      let userACL= new Parse.ACL()
    //  userACL.setPublicReadAccess(true)
    //  userACL.setWriteAccess(createdUser, true)
      userACL.setRoleWriteAccess("SuperAdmin", true)
      userACL.setRoleWriteAccess("SubAdmin", true)
      createdUser.setACL(userACL);
      const saveUser = await createdUser.save(null,{sessionToken: createdUser.get("sessionToken")}); 
 return(saveUser)
      }  else{
        throw new Error("Something Went Wrong, Couldn't Sign Up")
      } 
      }catch(err){
        throw new Error(err.message);
      }
      }
  )
  
  
  Parse.Cloud.beforeSave(Parse.User, () => {
 
}, {
    fields: {
      userRole: {
        default: 'Viewer',
        constant: true
      },
    },
});
  