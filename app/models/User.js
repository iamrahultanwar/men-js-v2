module.exports = (schema) => {
  schema.pre("save", function (next) {
    // do stuff
    console.log("Schema Saved");
    next();
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

  // Always attach `populate()` to `find()` calls
  schema.pre("find", function () {
    this.populate("todos");
  });

  return schema;
};
