
// The example below shows you how a cloud code function looks like.
require("./functions/userSignup.js")
require("./functions/addAgency.js")
require("./functions/addAgent.js")
require("./functions/search.js")
require("./functions/queryAgentsInAgency.js")
require("./functions/queryPropertiesInAgency.js")
require("./functions/addProperty.js")
require("./functions/propertyCounters.js")
require("./functions/fileSave.js")
require("./functions/editAgent.js")
require("./functions/queryViewStats.js")
 //Parse Server 3.x
 Parse.Cloud.define("hello", (request) => {
   console.log("request")
   console.log(request.params)
 	return(request.params);
 });

/* Parse Server 2.x
* Parse.Cloud.define("hello", function(request, response){
* 	response.success("Hello world!");
* });
*/

// To see it working, you only need to call it through SDK or REST API.
// Here is how you have to call it via REST API:

/** curl -X POST \
* -H "X-Parse-Application-Id: e" \
* -H "X-Parse-REST-API-Key: e" \
* -H "Content-Type: application/json" \
* -d "{}" \
* https://parseapi.back4app.com/functions/hello
*/

// If you have set a function in another cloud code file, called "test.js" (for example)
// you need to refer it in your main.js, as you can see below:

/* require("./test.js"); */
