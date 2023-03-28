import { signal, computed, effect } from "@preact/signals";

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
        images:["house1","house2","house3","house4"],        
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
        images:["house5","house2","house3","house4"],
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
        images:["house6","house2","house3","house4"],
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
        images:["house7","house2","house3","house4"],
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
        images:["house8","house2","house3","house4"],
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
        images:["house9","house2","house3","house4"],
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
        images:["house1","house2","house3","house4"],
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
        images:["house5","house2","house3","house4"],
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
        images:["house6","house2","house3","house4"],
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
        images:["house7","house2","house3","house4"],
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
        images:["house8","house2","house3","house4"],
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
        images:["house9","house2","house3","house4"],
        price: 3000000,
        coordinates: { lng: 31.51272, lat: 30.01151 },
      },
    ],
  },
]);
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
  propertyminArea: "",
  propertymaxArea: "",
  propertyminPrice: "",
  propertymaxPrice: "",
});

export const filteredData = signal([]);

export const search = effect(() => {
  console.log(stateSearchValues.value);
  const searchValues = stateSearchValues.value.searchValue.map((item) =>
    item.toLowerCase()
  );
  if (searchValues.length > 0) {
    const filtered = residentialSaleDb.value.map((item) => {
      const company = Object.keys(item);
      return item[company].filter((item) =>
        searchValues.some(
          (element) =>
            item.location.map((loc) => loc.toLowerCase()).includes(element) &&
            +item.rooms >= stateSearchValues.value.propertyRooms &&
            +item.price >= stateSearchValues.value.propertyminPrice &&
            +item.price <= stateSearchValues.value.propertymaxPrice &&
            +item.area >= stateSearchValues.value.propertyminArea &&
            +item.area <= stateSearchValues.value.propertymaxArea
        )
      );
    });
    //  && +stateSearchValues.propertyRooms > 2

    const data = filtered.flat();
    console.log(data);
    filteredData.value = data;
  }
});

export const changethemeColor = () => {
  if (themeColor.value === "light") {
    themeColor.value = "dark";
  } else {
    themeColor.value = "light";
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
