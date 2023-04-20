 Parse.Cloud.afterSaveFile(async (request) => {
  const { file } = request;
  const fileObject = new Parse.Object('FileObject');
  fileObject.set('fileName', file.name());
 const savedFile = await fileObject.save(null, { useMasterKey: true} );
 console.log(savedFile)
});