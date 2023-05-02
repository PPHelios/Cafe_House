import { signal } from "@preact/signals";


import Parse from "parse/dist/parse.min.js";
import { notifications } from "@mantine/notifications";
export const themeColor = signal("light");

export const userData = signal({});
export const userFavorites = signal([]);
export const viewStats = signal([]);
export const agencies = signal([]);
export const agents = signal([]);
export const properties = signal([]);
export const credits = signal(0);
export const adminSideBarState = signal(0);
export const searchOptions = signal([
  "New Cairo",
  "Mivida",
  "Katameia Dunes",
  "East Town Sodic",
]);
export const stateSearchValues = signal({
  searchValue: [],
  searchPurpose: "",
  propertyType: "",
  propertyRooms: "",
  propertyArea: "",
  propertyminPrice: "",
  propertymaxPrice: "",
});

export const filteredData = signal([]);
//console.log(filteredData);
export const sortHighToLow = () => {
  const sortedData = filteredData.value.sort(
    (a, b) => b.get("price") - a.get("price")
  );

  const clearArray = () => (filteredData.value = []);
  clearArray();
  filteredData.value = sortedData;
};
export const sortLowToHigh = () => {
  const sortedData = filteredData.value.sort(
    (a, b) => a.get("price") - b.get("price")
  );

  const clearArray = () => (filteredData.value = []);
  clearArray();
  filteredData.value = sortedData;
};
export const sortByArea = () => {
  const sortedData = filteredData.value.sort(
    (a, b) => b.get("area") - a.get("area")
  );

  const clearArray = () => (filteredData.value = []);
  clearArray();
  filteredData.value = sortedData;
};

export const search = async (values) => {
 
  if (values.searchValue.length > 0) {
    try {
     
      const mainSearch =await Parse.Cloud.run("mainSearch",values )
      
      filteredData.value = mainSearch.data;
       console.log(mainSearch);
    } catch (err) {
      notifications.show({
        title: "Error",
        message: `Error! ${err.message} 🤥`,
        color: "red",
      });
    }
  }
};



export const changethemeColor = () => {
  if (themeColor.value === "light") {
    themeColor.value = "dark";
  } else {
    themeColor.value = "light";
  }
};

export const logout = async () => {
  try {
    await Parse.User.logOut();
    userData.value = {};
    // console.log("loggedout");
    notifications.show({
      title: "Logged Out Successfully",
    });
  } catch (err) {
    notifications.show({
      title: "Error",
      message: `Error! ${err.message} 🤥`,
      color: "red",
    });
    return false;
  }
};

export const agencyCredits = async () => {
  try{
  const getCredits =await Parse.Cloud.run("agencyCredits")
  //console.log({getCredits});
  credits.value = getCredits;
  
  return getCredits;
} catch (err) {

  notifications.show({
    title: "Error",
    message: `Error! ${err.message} 🤥`,
    color: "red",
  });
  return false;
}
};
export const queryAgentsInAgency = async () => {
  //used
 // console.log(userData.value);
  if (userData.value?.id) {
    try {
      const agentsInAgency =await Parse.Cloud.run("queryAgentsInAgency")
      agents.value = agentsInAgency;
      //console.log(agentsInAgency);
      return agentsInAgency;
    } catch (err) {
  
      notifications.show({
        title: "Error",
        message: `Error! ${err.message} 🤥`,
        color: "red",
      });
      return false;
    }
  } else {
    // notifications.show({
    //   title: "No Logged In User1",
    // });
    return false;
  }
};

export const queryPropertiesInAgency = async () => {
  if (userData.value?.id) {
    try {
      const propertiesInAgency =await Parse.Cloud.run("queryPropertiesInAgency" )
      properties.value = propertiesInAgency;
      //console.log(propertiesInAgency);
      return propertiesInAgency;
    } catch (err) {
      notifications.show({
        title: "Error",
        message: `Error! ${err.message} 🤥`,
        color: "red",
      });
      return false;
    }
  } else {
    // notifications.show({
    //   title: "No Logged In User2",
    // });
    return false;
  }
};

export const queryViewStats = async () => {
  if (userData.value?.id) {
    try {
      const viewStatsResult =await Parse.Cloud.run("queryViewStats" )
     viewStats.value = viewStatsResult;
      //console.log(viewStatsResult);
      return viewStatsResult;
    } catch (err) {
      notifications.show({
        title: "Error",
        message: `Error! ${err.message} 🤥`,
        color: "red",
      });
      return false;
    }
  } else {

    return false;
  }
};

export const queryAgencies = async () => {
  if (userData.value?.id) {
    try {
      const queryAgencies =await Parse.Cloud.run("queryAgencies" )
      agencies.value = queryAgencies;
      //console.log(queryAgencies);
      return queryAgencies;
    } catch (err) {
      notifications.show({
        title: "Error",
        message: `Error! ${err.message} 🤥`,
        color: "red",
      });
      return false;
    }
  } else {

    return false;
  }
};
export const queryAgency = async (agencyName) => {
  //used
  // console.log(agencyName);
  try {
    let agencyQuery = new Parse.Query("Agency");
    agencyQuery.equalTo("agencyName", agencyName);
    let agencyQueryResult = await agencyQuery.first();

    // console.log(agencyQueryResult);
    return agencyQueryResult;
  } catch (err) {
    notifications.show({
      title: "Error",
      message: `Error! ${err.message} 🤥`,
      color: "red",
    });
    return false;
  }
};
export const getUserData = async (userId) => {
  try {
    const userData =await Parse.Cloud.run("getUserData")
    console.log(userData);
    return userData;
  } catch (err) {
    notifications.show({
      title: "Error",
      message: `Error! ${err.message} 🤥`,
      color: "red",
    });
    return false;
  }
};

export const getUserFavorites = async () => {
  try {
    // Since the signUp method returns a Promise, we need to call it using await
    let newFavoriteQuery = new Parse.Query("Favorite");

    newFavoriteQuery.equalTo("userPointer", Parse.User.current());
    newFavoriteQuery.include("propertyPointer");

    const favorites = await newFavoriteQuery.find();
    //console.log(favorites);
    userFavorites.value = favorites;
    return true;
  } catch (error) {
    // signUp can fail if any parameter is blank or failed an uniqueness check on the server
    notifications.show({
      title: "Error",
      message: `Error! ${error.message} 🤥`,
      color: "red",
    });
    return false;
  }
};

export const addToFavorites = async (property) => {
  const favoritesBeforeFilter = userFavorites.value;
  try {
    // Since the signUp method returns a Promise, we need to call it using await
    let newFavorite = new Parse.Object("Favorite");
    newFavorite.set("propertyPointer", property.toPointer());
    newFavorite.set("userPointer", userData.value);

    const addFavorite = await newFavorite.save();
    // console.log({addFavorite});
    // console.log(userFavorites.value);
    userFavorites.value.push(addFavorite);
    notifications.show({
      title: "Added To Favorites Successfully",
    });
    return true;
  } catch (error) {
    // signUp can fail if any parameter is blank or failed an uniqueness check on the server
    userFavorites.value = favoritesBeforeFilter;
    notifications.show({
      title: "Error",
      message: `Error! ${error.message} 🤥`,
      color: "red",
    });
    return false;
  }
};
export const removeFromFavorites = async (property) => {
  const favoritesBeforeFilter = userFavorites.value;
  try {
    // Since the signUp method returns a Promise, we need to call it using await
    let favoriteQuery = new Parse.Query("Favorite");
    favoriteQuery.equalTo("propertyPointer", property.toPointer());
    favoriteQuery.equalTo("userPointer", userData.value);

    const findFavorite = await favoriteQuery.first();
    // console.log({findFavorite});
    const deleteFavorite = await findFavorite.destroy();
    // console.log({deleteFavorite});
    const filteredFavorites = userFavorites.value.filter(
      (fav) => fav.id !== deleteFavorite.id
    );
    userFavorites.value = filteredFavorites;
    console.log(userFavorites.value);
    notifications.show({
      title: "Removed From Favorites Successfully",
    });
    return true;
  } catch (error) {
    userFavorites.value = favoritesBeforeFilter;
    // signUp can fail if any parameter is blank or failed an uniqueness check on the server
    notifications.show({
      title: "Error",
      message: `Error! ${error.message} 🤥`,
      color: "red",
    });
    return false;
  }
};


// import { deepSignal } from "@deepsignal/preact";
// export const appState = {
//   themeColor: deepSignal({ color: "light" }),
//   changethemeColor() {
//    // console.log()
//     if (this.themeColor.color.value === "light") {
//       this.themeColor.color.value = "dark";
//     } else {
//       this.themeColor.color.value = "light";
//     }
//   },
// };

// const completed = computed(() => {
//   return todos.value.filter((todo) => todo.completed).length;
// });
