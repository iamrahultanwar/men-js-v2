const loadModels = (ctx) => {
  const Models = () => {
    let models = new Map();
    const modelsList = ctx.container.Locations.get("models").all();
    modelsList.forEach(function (filePath) {
      const Locations = ctx.container.Locations;
      const modelName = filePath.split("/").pop().toString().replace(".js", "");
      const json = require(Locations.get("mappings").get(modelName));
      const schemaJson = Object.assign({}, JSON.parse(JSON.stringify(json)));
      const modelSchema = require(filePath)(
        new ctx.container.Database.Schema(
          sanitizeModelData(schemaJson, ctx.container.Database),
          {
            timestamps: true,
          }
        )
      );
      console.log(modelSchema)
      models.set(
        modelName,
        new ctx.container.Database.model(modelName, modelSchema)
      );
    });
    return models;
  };

  ctx.provider("Models", function () {
    this.$get = function (container) {
      return Models();
    };
  });
};

const sanitizeModelData = (json, Database) => {
  const returnJson = { ...json };
  Object.keys(returnJson).forEach((key) => {
    if (typeof returnJson[key] === 'string') {
      returnJson[key] = { type: _typeHandler(returnJson[key], Database) }
    } else
      if (typeof returnJson[key] === "object") {
        if (Array.isArray(returnJson[key].type)) {
          returnJson[key] = _arrayTypeHandler(returnJson[key].type, Database);
        } else if (returnJson[key].type === 'id') {
          returnJson[key] = { ...returnJson[key], ..._refTypeHandler(returnJson[key], Database) };
        }
        else returnJson[key] = { ...returnJson[key], type: _typeHandler(returnJson[key].type, Database) };
      }
      else
        throw new Error(`unable to parse the mappings for --> ${returnJson[key]}`);
  });
  return returnJson;
};
module.exports = function (c) {
  loadModels(c);
};

const _typeHandler = (type, Database) => {

  switch (type) {
    case 'String': return Database.Schema.Types.String;
    case 'Boolean': return Database.Schema.Types.Boolean;
    case 'Number': return Database.Schema.Types.Number;
    case 'Date': return Database.Schema.Types.Date;
    case 'Array': return Database.Schema.Types.Array;
    case 'Mixed': return Database.Schema.Types.Mixed;
    case 'Decimal': return Database.Schema.Types.Decimal128;
    case 'Map': return Database.Schema.Types.Map;
    default: throw new Error(`Unable to determine data type of given argument : ${type}`);
  }
}

const _refTypeHandler = (dataObj, Database) => {
  //TODO all validation to check for a proper model reference
  if (dataObj.type !== 'id')
    throw new Error('type for reference types should be equal to "id"');
  else
    if (!(dataObj.ref !== null && typeof (dataObj.ref) === 'string'))
      throw new Error(`Please pass a valid model reference present in database, provided ref --> ${dataObj.ref}`);
  // add check for finding proper ref of a present model in DB
  return { type: Database.Schema.Types.ObjectId, ref: dataObj.ref }

}

const _arrayTypeHandler = (array, Database) => {
  if (array.length === 0) return { type: Database.Schema.Types.Mixed };

  else if (array.length === 1) {
    if (typeof array[0] === 'string') {
      return [{ type: TypeHandler(array[0], Database) }]
    } else
      if (typeof array[0] === "object") {
        if (Array.isArray(array[0])) {
          return _arrayTypeHandler(array[0], Database);
        } else if (array[0].type === 'id') {
          return [{ ...array[0], ..._refTypeHandler(array[0], Database) }];
        }
        else return [{ ...array[0], type: _typeHandler(array[0].type, Database) }];
      }
    return [sanitizeModelData(array[0], Database)]
    // return { type: [TypeHandler(array[0])] }
  }
}
