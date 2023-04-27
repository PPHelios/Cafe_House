const currentUser = await Parse.User.current().fetchWithInclude(["agencyPointer"]);

 //   // revert to agency profile
    //  await Parse.User.become(sessionToken);
    //   navigate(0)