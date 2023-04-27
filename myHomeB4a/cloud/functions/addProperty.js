Parse.Cloud.define("addProperty", async (req, res) => {
  let user,
    userRole,
    agency,
    agencyName = null;
   if (["Agency","Admin", "Moderator"].includes(req.user.get("userRole"))) {
    user =  req.user
    userRole = user.get("userRole");
    agency = user.get("agencyPointer");
    agencyName = user.get("agencyName");
  } else {
    throw new Error("Unauthorized");
  }

  const {
    adName,
    adNameAr,
    description,
    descriptionAr,
    propertyCode,
    propertyType,
    listingType,
    price,
    area,
    room,
    bath,
    picUrls,
    videoUrls,
    picFiles,
    videoFiles,
    isFeatured,
    adStatus,
    locationTags,
    location
  } = req.params;
  console.log(req.params);
  // console.log({ userRole });
  // console.log({ agency });
  // console.log({ role });
  try {
    const newProperty = new Parse.Object("Property");
    newProperty.set("adName", adName);
    newProperty.set("adNameAr", adNameAr);
    newProperty.set("description", description);
    newProperty.set("descriptionAr", descriptionAr);
    newProperty.set("propertyCode", propertyCode);
    newProperty.set("propertyType", propertyType);
    newProperty.set("listingType", listingType);
    newProperty.set("price", price);
    newProperty.set("area", area);
    newProperty.set("room", room);
    newProperty.set("bath", bath);
    newProperty.set("picUrls", picUrls);
    newProperty.set("videoUrls", videoUrls);
    newProperty.set("isFeatured", isFeatured);
    newProperty.set("adStatus", adStatus);
    newProperty.set("locationTags", locationTags);
    newProperty.set("location",  new Parse.GeoPoint(
      location.onDrag.lat,
      location.onDrag.lng
    ));
    newProperty.set("creator", req.user.toPointer());
    newProperty.set("creatorEmail", req.user.get("email"));
    newProperty.set("agentPointer", req.user.toPointer());
    newProperty.set("agencyPointer", agency.toPointer());
console.log({picFiles})
    if (picFiles && picFiles.length>0) {
      console.log("pico")
      const picCount = picFiles.length;
      for (let i = 0; i < picCount; i++) {
        newProperty.set(`pic${i}`, picFiles[i]);
      }
      newProperty.set("picUrls", picUrls);
    }

    if (videoFiles) {
      const videoCount = videoFiles.length;
      for (let i = 0; i < videoCount; i++) {
        newProperty.set(`video${i}`, videoFiles[i]);
      }
      newProperty.set("videoUrls", videoUrls);
    }

    let propertyACL = new Parse.ACL();
  //  propertyACL.setPublicReadAccess(true);
    propertyACL.setRoleWriteAccess("SuperAdmin", true);
    propertyACL.setRoleWriteAccess("SubAdmin", true);
    propertyACL.setRoleReadAccess("SuperAdmin", true);
    propertyACL.setRoleReadAccess("SubAdmin", true);
    newProperty.setACL(propertyACL);
    const saveProperty = await newProperty.save(null, { useMasterKey: true });
    console.log({ saveProperty });
    agency.increment(numberOfAds)
    await agency.save(null, {
      useMasterKey: true,
    });
    return saveProperty;
  } catch (err) {

    throw new Error(err.message);
  }
});

Parse.Cloud.afterSave("Property", (req) => {
  const afterSaveProperty = req
 console.log({afterSaveProperty});
});