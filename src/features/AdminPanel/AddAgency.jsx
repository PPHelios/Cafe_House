import { useState } from "preact/hooks";
import Parse from "parse/dist/parse.min.js";

export default function AddAgency() {
  // State variables
  // const [person, setPerson] = useState(null);

  async function addnewAgency() {}

  async function fetchPerson() {
    // create your Parse Query using the Person Class you've created
    const query = new Parse.Query("Person");
    // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
    query.equalTo("name", "");
    // run the query
    const Person = await query.find();
    // access the Parse Object attributes

    console.log("person id: ", Person);
    // setPerson(Person);
  }

  return (
    <div>
      <button onClick={AddAgency}>Add Person</button>
      <button onClick={fetchPerson}>Fetch Person</button>
    </div>
  );
}
