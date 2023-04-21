 Parse.Cloud.afterSaveFile(async (request) => {
  const { file } = request;
  const fileObject = new Parse.Object('FileObject');
  fileObject.set('fileName', file.name());
 const savedFile = await fileObject.save(null, { useMasterKey: true} );
 console.log(savedFile)
});

Parse.Cloud.afterDeleteFile(async (request) => {
  const { file } = request;
  const query = new Parse.Query('FileObject');
  query.equalTo('fileName', file.name());
  const fileObject = await query.first({ useMasterKey: true });
  await fileObject.destroy({ useMasterKey: true });
});