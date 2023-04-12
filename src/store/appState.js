import { computed, effect, signal } from "@preact/signals";
// import { create } from "zustand";
// import produce from "immer";

import Parse from "parse/dist/parse.min.js";
import { notifications } from "@mantine/notifications";
export const themeColor = signal("light");
export const residentialSaleDb = signal([
  {
    "The Address": [
      {
        title: "Amazing villa",
        location: ["mivida", "new cairo"],
        type: "villa",
        area: 210,
        rooms: 4,
        description: "A northside park that is home to the Lincoln Park Zoo",
        images: ["house1", "house2", "house3", "house4"],
        price: 2000000,
        coordinates: { lng: 31.53812, lat: 30.00387 },
      },
      {
        title: "Amazing villa 2",
        location: ["mivida", "new cairo"],
        type: "villa",
        area: 210,
        rooms: 4,
        description: "A northside park that is home to the Lincoln Park Zoo",
        images: ["house5", "house2", "house3", "house4"],
        price: 3000000,
        coordinates: { lng: 31.53705, lat: 30.00288 },
      },
      {
        title: "Amazing villa 3",
        location: ["katameia dunes", "new cairo"],
        type: "villa",
        area: 260,
        rooms: 5,
        description: "A northside park that is home to the Lincoln Park Zoo",
        images: ["house6", "house2", "house3", "house4"],
        price: 4000000,
        coordinates: { lng: 31.51857, lat: 29.99948 },
      },
      {
        title: "Amazing villa 4",
        location: ["katameia dunes", "new cairo"],
        type: "villa",
        area: 400,
        rooms: 6,
        description: "A northside park that is home to the Lincoln Park Zoo",
        images: ["house7", "house2", "house3", "house4"],
        price: 11000000,
        coordinates: { lng: 31.51738, lat: 29.99898 },
      },
      {
        title: "East Town Appartment",
        location: ["east town sodic", "new cairo"],
        type: "appartment",
        area: 150,
        rooms: 3,
        description: "A northside park that is home to the Lincoln Park Zoo",
        images: ["house8", "house2", "house3", "house4"],
        price: 3000000,
        coordinates: { lng: 31.51669, lat: 30.01159 },
      },
      {
        title: "East Town Appartment 2",
        location: ["east town sodic", "new cairo"],
        type: "appartment",
        area: 200,
        rooms: 4,
        description: "A northside park that is home to the Lincoln Park Zoo",
        images: ["house9", "house2", "house3", "house4"],
        price: 4000000,
        coordinates: { lng: 31.51515, lat: 30.01142 },
      },
    ],
  },
  {
    Remas: [
      {
        title: "Amazing villa 8",
        location: ["mivida", "new cairo"],
        type: "villa",
        area: 210,
        rooms: 4,
        description: "A northside park that is home to the Lincoln Park Zoo",
        images: ["house1", "house2", "house3", "house4"],
        price: 5000000,
        coordinates: { lng: 31.53743, lat: 30.0056 },
      },
      {
        title: "Amazing villa 7",
        location: ["mivida", "new cairo"],
        type: "villa",
        area: 240,
        rooms: 5,
        description: "A northside park that is home to the Lincoln Park Zoo",
        images: ["house5", "house2", "house3", "house4"],
        price: 6000000,
        coordinates: { lng: 31.54058, lat: 30.00441 },
      },
      {
        title: "Amazing villa 6",
        location: ["katameia dunes", "new cairo"],
        type: "villa",
        area: 300,
        rooms: 4,
        description: "A northside park that is home to the Lincoln Park Zoo",
        images: ["house6", "house2", "house3", "house4"],
        price: 10000000,
        coordinates: { lng: 31.52401, lat: 30.00251 },
      },
      {
        title: "Amazing villa 5",
        location: ["katameia dunes", "new cairo"],
        type: "villa",
        area: 500,
        rooms: 6,
        description: "A northside park that is home to the Lincoln Park Zoo",
        images: ["house7", "house2", "house3", "house4"],
        price: 13000000,
        coordinates: { lng: 31.51672, lat: 30.00266 },
      },
      {
        title: "East Town Appartment3",
        location: ["east town sodic", "new cairo"],
        type: "appartment",
        area: 240,
        rooms: 4,
        description: "A northside park that is home to the Lincoln Park Zoo",
        images: ["house8", "house2", "house3", "house4"],
        price: 4000000,
        coordinates: { lng: 31.516, lat: 30.0093 },
      },
      {
        title: "East Town Appartment 4",
        location: ["east town sodic", "new cairo"],
        type: "appartment",
        area: 200,
        rooms: 3,
        description: "A northside park that is home to the Lincoln Park Zoo",
        images: ["house9", "house2", "house3", "house4"],
        price: 3000000,
        coordinates: { lng: 31.51272, lat: 30.01151 },
      },
    ],
  },
]);
export const userData = signal({});
export const userFavorites = signal([]);

export const agents = signal([]);
export const properties = signal([]);
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
  //console.log(values);
  if (values.searchValue.length > 0) {
    try {
      let parseQuery = new Parse.Query("Property");
      parseQuery.containedIn("locationTags", values.searchValue);
      parseQuery.contains("listingType", values.listingType);
      parseQuery.contains("propertyType", values.propertyType);
      parseQuery.greaterThan("room", values.propertyRooms - 1);
      parseQuery.greaterThan("bath", values.propertyBaths - 1);
      parseQuery.greaterThan("area", values.propertyArea - 1);
      parseQuery.greaterThan("price", +values.propertyminPrice - 1);
      parseQuery.lessThan("price", +values.propertymaxPrice + 1);
      parseQuery.include("agencyPointer");
      parseQuery.include("agentPointer");
      let queryResults = await parseQuery.find();
      const shuffledResults = queryResults.sort(function () {
        return Math.random() - 0.5;
      });
      filteredData.value = shuffledResults;
      // console.log(shuffledResults);
    } catch (err) {
      notifications.show({
        title: "Error",
        message: `Error! ${err.message} 🤥`,
        color: "red",
      });
    }
  }
};

// export const search = effect(() => {
//   // console.log(stateSearchValues.value);
//   const searchValues = stateSearchValues.value.searchValue.map((item) =>
//     item.toLowerCase()
//   );
//   if (searchValues.length > 0) {
//     const filtered = residentialSaleDb.value.map((item) => {
//       const company = Object.keys(item);
//       return item[company].filter((item) =>
//         searchValues.some(
//           (element) =>
//             item.location.map((loc) => loc.toLowerCase()).includes(element) &&
//             +item.rooms >= stateSearchValues.value.propertyRooms &&
//             +item.price >= stateSearchValues.value.propertyminPrice &&
//             +item.price <= stateSearchValues.value.propertymaxPrice &&
//             +item.area >= stateSearchValues.value.propertyminArea &&
//             +item.area <= stateSearchValues.value.propertymaxArea
//         )
//       );
//     });
//  && +stateSearchValues.propertyRooms > 2

//     const data = filtered.flat();
//     console.log(data);
//     filteredData.value = data;
//   }
// });

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
export const queryAgentsInAgency = async () => {
  //used
 // console.log(userData.value);
  if (userData.value?.get("agencyPointer")) {
    try {
      let agencyQuery = new Parse.Query("Agent");
      agencyQuery.equalTo(
        "agencyPointer",
        userData.value?.get("agencyPointer")
      );
      let agencyQueryResult = await agencyQuery.find();

      console.log(agencyQueryResult);
      return agencyQueryResult;
    } catch (err) {
      notifications.show({
        title: "Error",
        message: `Error! ${err.message} 🤥`,
        color: "red",
      });
      return false;
    }
  } else {
    notifications.show({
      title: "No Logged In User",
    });
    return false;
  }
};

export const queryAllProperties = async () => {
  if (userData.value?.get("agencyPointer")) {
  const role = userData.value.get("role");
  const pointer =
    role === "agent"
      ? userData.value?.get("agentPointer")
      : role === "agency"
      ? userData.value.get("agencyPointer")
      : null;
  //used
 
    try {
      let propertyQuery = new Parse.Query("Property");
      propertyQuery.equalTo("agentPointer", pointer);
      let propertyQueryResult = await propertyQuery.find();
      // console.log(propertyQueryResult);
      properties.value = propertyQueryResult;
      return propertyQueryResult;
    } catch (err) {
      // console.log(err.message);
      notifications.show({
        title: "Error",
        message: `Error! ${err.message} 🤥`,
        color: "red",
      });
      throw new Error("Couldn't Fetch Properties");
    }
  } else {
    notifications.show({
      title: "No Logged In User",
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
