import { signal, computed, effect } from "@preact/signals";
import Parse from "parse/dist/parse.min.js";
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
export const searchOptions = signal([
  "New Cairo",
  "Mivida",
  "Katameia Dunes",
  "East Town Sodic",
]);
export const stateSearchValues = signal({
  searchValue: [],
  searchPurpose: "Buy",
  propertyType: "",
  propertyRooms: "",
  propertyarea: "",
  propertyminPrice: "",
  propertymaxPrice: "",
});

export const filteredData = signal([]);

export const search = async (values) => {
  console.log(values);
  if (values.searchValue.length > 0) {
 
    try {
      let parseQuery = new Parse.Query("Property");
      // parseQuery.contains('locationTags', values.locationTags);
      parseQuery.contains("listingType", values.listingType);
      parseQuery.contains("propertyType", values.propertyType);
        parseQuery.greaterThan('room', values.propertyRooms - 1);
        parseQuery.greaterThan('bath', values.propertyBaths - 1);
        parseQuery.greaterThan('area', values.propertyarea - 1);
      
       parseQuery.greaterThan('price', +values.propertyminPrice-1);
       parseQuery.lessThan('price', +values.propertymaxPrice+1);
      let queryResults = await parseQuery.find();
      console.log(queryResults);
    } catch (err) {
      console.log(err.message);
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
  try{
    await Parse.User.logOut();
  userData.value = {};
  console.log("loggedout");
  console.log(userData.value);
  }catch (err) {
    console.log(err.message);
  }
  
};

export const queryAgency = async (agencyName) => {
  console.log(agencyName);
  try{

 
  let agencyQuery = new Parse.Query("Agency");
  agencyQuery.equalTo("agencyName", agencyName);
  let agencyQueryResult = await agencyQuery.first();

  console.log(agencyQueryResult);
  return agencyQueryResult;
  }catch (err) {
    console.log(err.message);
  }
};
export const queryAgentsInAgency = async () => {
  try{
  let agencyQuery = new Parse.Query("Agency");
  agencyQuery.equalTo("name", userData.value.attributes.name);
  let agencyQueryResult = await agencyQuery.first();
  const parseQuery = new Parse.Query("Agents");

  parseQuery.equalTo("agency", agencyQueryResult);
  let queryResults = await parseQuery.find();
  console.log(queryResults);
  return queryResults;
  }catch (err) {
    console.log(err.message);
  }
};
export const queryAgentAgency = async () => {
  try{

  const agentQuery = new Parse.Query("Agents");
  agentQuery.equalTo("email", userData.value.attributes.email);
  let searchRes = await agentQuery.find();
  const agencyName = await searchRes[0].get("agency").get("name");
  console.log(agencyName);
  return agencyName;
  }catch (err) {
    console.log(err.message);
  }
};
export const queryAgent = async () => {
  try{
  let agentQuery = new Parse.Query("Agents");
  agentQuery.equalTo("name", userData.value.attributes.agent);
  let agentQueryResult = await agentQuery.first();
  console.log(`agent: ${agentQueryResult}`);
  return agentQueryResult;
  }catch (err) {
    console.log(err.message);
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
