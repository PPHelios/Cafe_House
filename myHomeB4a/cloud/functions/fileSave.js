 Parse.Cloud.afterSaveFile(async (request) => {
  try{
  const { file } = request;
  const fileObject = new Parse.Object('FileObject');
  fileObject.set('fileName', file.name());
 const savedFile = await fileObject.save(null, { useMasterKey: true} );
 console.log(savedFile)
}catch(err){
  throw new Error(err.message);
}

});

Parse.Cloud.afterDeleteFile(async (request) => {
  try{
  const { file } = request;
  const query = new Parse.Query('FileObject');
  query.equalTo('fileName', file.name());
  const fileObject = await query.first({ useMasterKey: true });
  const delObject = await fileObject.destroy({ useMasterKey: true });
  console.log("delObject")
  console.log(delObject)
}catch(err){
  throw new Error(err.message);
}
});