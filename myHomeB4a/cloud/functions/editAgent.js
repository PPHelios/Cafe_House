Parse.Cloud.define("editAgent", async (req, res) => {
  console.log(req.params);
  try {
    const { userRole, agentStatus, agentId } = req.params;

    const agentToEditQuery = new Parse.Query(Parse.User);
    const agentToEdit = await agentToEditQuery.get(agentId, {
      useMasterKey: true,
    });
    agentToEdit.set("userRole", userRole);
    agentToEdit.set("agentStatus", agentStatus);
    const updateAgent = await agentToEdit.save(null, { useMasterKey: true });
    console.log({updateAgent});
    return updateAgent
  } catch (err) {
    throw new Error(err.message);
  }
},{
  
});
