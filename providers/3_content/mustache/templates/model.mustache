module.exports = (schema) => {
  schema.pre("save", function (next) {
    // do stuff
    console.log("Schema Saved");
    next();
  });

  // `true` means this is a parallel middleware. You **must** specify `true`
  // as the second parameter if you want to use parallel middleware.
  schema.pre("save", true, function (next, done) {
    // calling next kicks off the next middleware in parallel
    next();
    setTimeout(done, 100);
  });

  schema.post("init", function (doc) {
    console.log("%s has been initialized from the db", doc._id);
  });
  schema.post("validate", function (doc) {
    console.log("%s has been validated (but not saved yet)", doc._id);
  });
  schema.post("save", function (doc) {
    console.log("%s has been saved", doc._id);
  });
  schema.post("remove", function (doc) {
    console.log("%s has been removed", doc._id);
  });
  return schema;
};
